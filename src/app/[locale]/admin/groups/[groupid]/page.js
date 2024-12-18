'use client'

import { useParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { getStudentsByGroupId, fetchGroups } from '@/utils/index';
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { useLocale } from 'next-intl'; 

const GroupPage = () => {
  const { groupid } = useParams();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const parsedGroupId = groupid ? parseInt(groupid) : null;
  const group = useMemo(() => fetchGroups().find(group => group.id === parsedGroupId), [parsedGroupId]);
  const locale = useLocale();

  useEffect(() => {
    if (parsedGroupId && group) {
      const studentsList = getStudentsByGroupId(parsedGroupId);
      setStudents(studentsList);
    } else if (parsedGroupId) {
      setStudents([]);
    }
  }, [parsedGroupId, group]);

  const filteredStudents = students.filter((student) =>
    student.toLowerCase().includes(searchTerm.toLowerCase())
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {group ? (
        <>
          <h1 className="text-3xl font-semibold text-blue-600 text-center">{group.group_name}</h1>
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-600">Étudiants inscrits</h2>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <FaSearch className="text-gray-600" />
              <input
                type="text"
                placeholder="Rechercher un étudiant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-full sm:w-2/5"
              />
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full table-auto border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border text-sm font-medium text-gray-700">Nom de l'étudiant</th>
                  <th className="px-4 py-2 border text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.length > 0 ? (
                  currentStudents.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border text-gray-700">{student}</td>
                      <td className="px-4 py-2 border text-center">
                        <Link href={`/${locale}/admin/groups/${group.id}`} className="text-blue-500 hover:text-blue-700">
                          Détails
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="px-4 py-2 text-center text-red-500">
                      Aucun étudiant inscrit dans ce groupe.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
              <FaChevronLeft />
            </button>
            <span className="text-gray-700">
              Page {currentPage} sur {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
            >
              <FaChevronRight />
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-red-500 font-semibold text-xl mt-8">Le groupe n'a pas été trouvé.</p>
      )}
    </div>
  );
};

export default GroupPage;
