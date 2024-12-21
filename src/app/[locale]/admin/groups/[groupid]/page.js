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
  const [confirmationFilter, setConfirmationFilter] = useState('confirmed');
  const itemsPerPage = 10;

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

  // Recherche par nom, prénom et matricule
  const filteredStudents = students
    .filter((student) => 
      `${student.nom} ${student.prenom} ${student.matricule}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((student) => 
      confirmationFilter === 'all' || (confirmationFilter === 'confirmed' && student.confirme) || (confirmationFilter === 'unconfirmed' && !student.confirme)
    );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
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
  

    const confirmedStudents = filteredStudents.filter(student => student.confirme);
  
    doc.text(`Liste des étudiants confirmés - ${groupName}`, 14, 10);
  
    const tableData = confirmedStudents.map((student) => [
      student.nom,
      student.prenom,
      student.matricule,
    ]);
  
    // Create table
    doc.autoTable({
      head: [['Nom', 'Prénom', 'Matricule']],
      body: tableData,
      startY: 20,
    });
  
    doc.save(`${groupName}.pdf`);
  };
  
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {group ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
          <h1 className="text-4xl font-bold text-center text-blue-700">{group.group_name}</h1>
          <h2 className="text-lg text-center text-gray-500 mt-2">Liste des étudiants</h2>

          {/* Champ de recherche et filtrage */}
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
          </div>

          {/* Tableau des étudiants */}
          <table className="w-full table-auto mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Prénom</th>
                <th className="px-4 py-2">Matricule</th>
                <th className="px-4 py-2">État d'inscription</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.matricule} className="border-b">
                  <td className="px-4 py-2">{student.nom}</td>
                  <td className="px-4 py-2">{student.prenom}</td>
                  <td className="px-4 py-2">{student.matricule}</td>
                  <td className="px-4 py-2">
                    {student.confirme ? 'Confirmé' : 'Non Confirmé'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Boutons */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
            <div className="flex gap-4">
              {/* Bouton imprimer */}
              <button
                onClick={generatePDF}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
              >
                <FaPrint />
                Imprimer
              </button>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={handlePrevPage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                <FaChevronLeft />
              </button>
              <span className="text-lg">{`${currentPage} / ${totalPages}`}</span>
              <button
                onClick={handleNextPage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Groupe non trouvé</p>
      )}
    </div>
  );
};

export default GroupPage;
