import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Simulated data fetch (replace with actual API call)
  useEffect(() => {
    const fetchedRegistrations = [
      { id: 1, matricule: '12345', name: 'John Doe', session: '2024 Fall', level: 'Beginner', group: 'A1', date: '2024-12-01' },
      { id: 2, matricule: '12346', name: 'Jane Smith', session: '2024 Fall', level: 'Intermediate', group: 'B1', date: '2024-12-02' },
      // Add more sample data here
    ];
    setRegistrations(fetchedRegistrations);
  }, []);

  const handleAddRegistration = () => {
    // Logic for adding a new registration
    alert('Add Registration');
  };

  const handleEditRegistration = (registration) => {
    // Logic for editing a registration
    alert(`Edit Registration: ${registration.id}`);
  };

  const handleDeleteRegistration = (registration) => {
    // Logic for deleting a registration
    alert(`Delete Registration: ${registration.id}`);
  };

  const filteredRegistrations = registrations.filter((registration) =>
    registration.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);
  const currentRegistrations = filteredRegistrations.slice(
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
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Rechercher un étudiant..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page when searching
          }}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleAddRegistration}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <FaPlus className="mr-2" />
          Ajouter une inscription
        </button>
      </div>

      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Matricule</th>
            <th className="px-4 py-2 border">Nom et Prénom</th>
            <th className="px-4 py-2 border">Session</th>
            <th className="px-4 py-2 border">Niveau</th>
            <th className="px-4 py-2 border">Groupe</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRegistrations.map((registration) => (
            <tr key={registration.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{registration.id}</td>
              <td className="px-4 py-2 border">{registration.matricule}</td>
              <td className="px-4 py-2 border">{registration.name}</td>
              <td className="px-4 py-2 border">{registration.session}</td>
              <td className="px-4 py-2 border">{registration.level}</td>
              <td className="px-4 py-2 border">{registration.group}</td>
              <td className="px-4 py-2 border">{registration.date}</td>
              <td className="px-4 py-2 border flex space-x-2">
                <button
                  onClick={() => handleEditRegistration(registration)}
                  className="p-2 text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteRegistration(registration)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
  );
};

export default Registrations;
