'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { getStudentsByGroupId, fetchGroups } from '@/utils/index';
import { FaChevronLeft, FaChevronRight, FaSearch, FaPrint } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import "jspdf-autotable"; 
import Link from 'next/link';
import { useLocale } from 'next-intl';

const GroupPage = () => {
  const { groupid } = useParams();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmationFilter, setConfirmationFilter] = useState('all');
  const itemsPerPage = 30;

  const parsedGroupId = groupid ? parseInt(groupid) : null;
  const group = useMemo(
    () => fetchGroups().find((group) => group.id === parsedGroupId),
    [parsedGroupId]
  );
  const locale = useLocale();

  useEffect(() => {
    if (parsedGroupId && group) {
      const studentsList = getStudentsByGroupId(parsedGroupId);
      setStudents(studentsList);
    } else if (parsedGroupId) {
      setStudents([]);
    }
  }, [parsedGroupId, group]);

  const filteredStudents = students
    .filter((student) => 
      `${student.nom} ${student.prenom} ${student.matricule}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((student) => 
      confirmationFilter === 'all' || (confirmationFilter === 'confirmed' && student.confirme) || (confirmationFilter === 'unconfirmed' && !student.confirme)
    );


  const filteredCount = filteredStudents.length;

  const totalPages = Math.ceil(filteredCount / itemsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const groupName = group ? group.group_name : 'Group';
    const groupLevel = group ? group.level : 'Niveau';
    const sessionName = group ? group.session_name : 'Session';
    
    doc.text(`${sessionName}`, 14, 10);
    doc.text(`${groupLevel}`, 14, 15);
    doc.text(`${groupName}`, 14, 20);
    const confirmedStudents = filteredStudents.filter(student => student.confirme);

    const tableData = confirmedStudents.map((student) => [
      student.matricule,  `${student.nom} ${student.prenom}`
    ]);

    doc.autoTable({
      head: [['Matricule','Nom et Prénom']],
      body: tableData,
      startY: 40,
    });

    const fileName = `${sessionName} - ${groupLevel} - ${groupName}.pdf`; 
    doc.save(fileName);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {group ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
          <h1 className="text-4xl font-bold text-center text-blue-700">{group.group_name}</h1>
          <h2 className="text-lg text-center text-gray-500 mt-2">{group.level}</h2>
          <h2 className="text-lg text-center text-gray-500 mt-2">{group.session_name}</h2>
    

        
          <div className="text-center text-lg font-medium text-gray-500 mt-2">
            {confirmationFilter === 'all' && `Nombre total d'étudiants : ${filteredCount}`}
            {confirmationFilter === 'confirmed' && `Nombre d'étudiants confirmés : ${filteredCount}`}
            {confirmationFilter === 'unconfirmed' && `Nombre d'étudiants non confirmés : ${filteredCount}`}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-6 mb-4 gap-4">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Rechercher par nom, prénom ou matricule..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full"
              />
            </div>
            <div className="md:w-1/3">
              <select
                value={confirmationFilter}
                onChange={(e) => setConfirmationFilter(e.target.value)}
                className="p-2 border rounded-md w-full"
              >
                <option value="all">Tous</option>
                <option value="confirmed">Confirmés</option>
                <option value="unconfirmed">Non Confirmés</option>
              </select>
            </div>
            <button
              onClick={generatePDF}
              className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
            >
              <FaPrint />
              Imprimer
            </button>
          </div>

          {/* Table with Horizontal Scroll */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Matricule</th>
                  <th className="px-4 py-2">Nom et Prénom</th>
                  <th className="px-4 py-2">État d'inscription</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr key={student.matricule} className="border-b">
                    <td className="px-4 py-2">{student.matricule}</td>
                    <td className="px-4 py-2">
                      <Link href={`/${locale}/admin/students/${student.id}`} className="text-blue-600 hover:underline">
                        {`${student.nom} ${student.prenom}`}
                      </Link>
                    </td>
                    <td className="px-4 py-2">
                      {student.confirme ? 'Confirmé' : 'Non Confirmé'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>
            <span>
              Page {currentPage} sur {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      ) : (
        <p>Groupe non trouvé</p>
      )}
    </div>
  );
};

export default GroupPage;
