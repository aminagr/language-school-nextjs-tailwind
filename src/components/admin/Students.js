import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaChevronLeft, FaChevronRight,FaEye } from 'react-icons/fa';
import AddStudentModal from '@/components/admin/AddStudentModal';
import EditStudentModal from '@/components/admin/EditStudentModal';
import DeleteStudentModal from '@/components/admin/DeleteStudentModal';
import { fetchStudentsData } from '@/utils'; 
import { useLocale } from 'next-intl'; 
import Link from 'next/link';
const Students = () => {
  const locale = useLocale();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editData, setEditData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteStudentName, setDeleteStudentName] = useState('');
  const [deleteStudentId, setDeleteStudentId] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 30; 

  useEffect(() => {
    const fetchedStudents = fetchStudentsData();
    setStudents(fetchedStudents);
  }, []);

  const handleAddStudent = (newStudent) => {
    const addedStudent = { id: Date.now(), ...newStudent };
    setStudents([...students, addedStudent]);
    setIsAddModalOpen(false);
  };

  const handleUpdateStudent = (updatedStudent) => {
    const updated = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updated);
    setIsEditModalOpen(false);
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id)); 
    setIsDeleteModalOpen(false); 
  };

  const handleOpenDeleteModal = (student) => {
    setDeleteStudentName(student.nom);
    setDeleteStudentId(student.id); 
    setIsDeleteModalOpen(true);
  };

  const filteredStudents = students.filter((student) =>
    Object.values(student).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col pb-2 md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full">
          <input
            type="text"
            placeholder="Rechercher un étudiant..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border border-gray-300 rounded-md w-full md:w-auto"
          />
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2  bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center space-x-2"
          >
            <FaPlus />
            <span>Ajouter un étudiant</span>
          </button>
        </div>
      </div>
<div className='overflow-x-auto'>
<table className="min-w-full table-auto border-collapse">
  <thead className="bg-gray-100">
    <tr>
      <th className="px-4 py-2 border-b text-left">Matricule</th>
      <th className="px-4 py-2 border-b text-left">Nom</th>
      <th className="px-4 py-2 border-b text-left">Prénom</th>
      <th className="px-4 py-2 border-b text-left">Date de naissance</th>
      <th className="px-4 py-2 border-b text-left">Téléphone</th>
      <th className="px-4 py-2 border-b text-left">Mail</th>
      <th className="px-4 py-2 border-b text-left">Type</th>
      <th className="px-4 py-2 border-b text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    {currentStudents.map((student) => (
      <tr key={student.id} className="hover:bg-gray-50">
        <td className="px-4 py-2 border-b">{student.matricule}</td>
        <td className="px-4 py-2 border-b">{student.nom}</td>
        <td className="px-4 py-2 border-b">{student.prenom}</td>
        <td className="px-4 py-2 border-b">{student.date_naissance}</td>
        <td className="px-4 py-2 border-b">{student.telephone}</td>
        <td className="px-4 py-2 border-b">{student.mail}</td>
        <td className="px-4 py-2 border-b">{student.type}</td>
        <td className="px-4 py-2 border-b flex space-x-2">
          <button
            onClick={() => {
              setEditData(student);
              setIsEditModalOpen(true);
            }}
            className="p-2 text-blue-500 hover:text-blue-700"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleOpenDeleteModal(student)}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </button>
       <Link href={`/${locale}/admin/students/${student.id}`} passHref>
            <button className="p-2 text-green-500 hover:text-green-700">
              <FaEye />
            </button>
          </Link>
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
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
        



      </div>

      {isEditModalOpen && (
        <EditStudentModal
          studentData={editData}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateStudent}
        />
      )}
      {isAddModalOpen && (
        <AddStudentModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddStudent}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteStudentModal
          studentName={deleteStudentName}
          studentId={deleteStudentId} 
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => handleDeleteStudent(deleteStudentId)}
        />
      )}
    </div>
  );
};

export default Students;
