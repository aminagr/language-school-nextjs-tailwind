import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AddSessionModal from '@/components/admin/AddSessionModal';
import EditSessionModal from '@/components/admin/EditSessionModal';
import DeleteSessionModal from '@/components/admin/DeleteSessionModal';
import { fetchSessionsData } from '@/utils';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchedSessions = fetchSessionsData(); 
    setSessions(fetchedSessions);
  }, []);

  const handleAddSession = (newSession) => {
    const addedSession = { id: Date.now(), ...newSession };
    setSessions([...sessions, addedSession]);
    setIsAddModalOpen(false);
  };

  const handleUpdateSession = (updatedSession) => {
    const updated = sessions.map((session) =>
      session.id === updatedSession.id ? updatedSession : session
    );
    setSessions(updated);
    setIsEditModalOpen(false);
  };

  const handleDeleteSession = (id) => {
    setSessions(sessions.filter((session) => session.id !== id));
    setDeleteData(null); 
  };

  const filteredSessions = sessions.filter((session) =>
    session.session_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const currentSessions = filteredSessions.slice(
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
  <div className="flex flex-col pb-2 md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
    <input
      type="text"
      placeholder="Rechercher une session..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
      }}
      className="p-2 border border-gray-300 rounded-lg w-full md:w-1/3"
    />
    <button
      onClick={() => setIsAddModalOpen(true)}
      className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full md:w-auto"
    >
      <FaPlus className="mr-2" />
      Ajouter une session
    </button>
  </div>



      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nom de la session</th>
              <th className="px-4 py-2 border">Date de début</th>
              <th className="px-4 py-2 border">Date de fin</th>
              <th className="px-4 py-2 border">Début des inscriptions</th>
              <th className="px-4 py-2 border">Fin des inscriptions</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSessions.map((session) => (
              <tr key={session.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{session.id}</td>
                <td className="px-4 py-2 border">{session.session_name}</td>
                <td className="px-4 py-2 border">{session.start_date}</td>
                <td className="px-4 py-2 border">{session.end_date}</td>
                <td className="px-4 py-2 border">{session.registration_start_date}</td>
                <td className="px-4 py-2 border">{session.registration_end_date}</td>
                <td className="px-4 py-2 border flex space-x-2">
                  <button
                    onClick={() => {
                      setEditData(session);
                      setIsEditModalOpen(true);
                    }}
                    className="p-2 text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setDeleteData(session);
                      setIsDeleteModalOpen(true);
                    }}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
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

      {isAddModalOpen && (
        <AddSessionModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddSession}
        />
      )}
      {isEditModalOpen && (
        <EditSessionModal
          data={editData}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateSession}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteSessionModal
          sessionName={deleteData.session_name} 
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => handleDeleteSession(deleteData.id)} 
        />
      )}
    </div>
  );
};

export default Sessions;
