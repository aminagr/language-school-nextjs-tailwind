import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaCheck } from 'react-icons/fa';
import { fetchRegistrations, fetchSessionsData, fetchLevelsData } from '@/utils';
import AddRegistrationModal from './AddRegistrationModal';
import EditRegistrationModal from './EditRegistrationModal';
import DeleteRegistrationModal from './DeleteRegistrationModal';

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [levels, setLevels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const itemsPerPage = 10;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingRegistration, setEditingRegistration] = useState(null);
  const [deletingRegistration, setDeletingRegistration] = useState(null);

  useEffect(() => {
 
    const loadInitialData = async () => {
      const fetchedRegistrations = await fetchRegistrations();
      setRegistrations(fetchedRegistrations);

      const fetchedSessions = await fetchSessionsData();
      setSessions(fetchedSessions);
      setSelectedSession(fetchedSessions[fetchedSessions.length - 1]?.session_name || '');

      const fetchedLevels = await fetchLevelsData();
      setLevels(fetchedLevels);
    };

    loadInitialData();
  }, []);

  const handleAddRegistration = (newRegistration) => {
    setRegistrations((prevRegistrations) => {
      const updatedRegistrations = [
        ...prevRegistrations,
        { id: Date.now(), ...newRegistration },
      ];
      return updatedRegistrations;
    });
    setCurrentPage(1);
    setIsAddModalOpen(false);
  };

  const handleEditRegistration = (registration) => {
    setEditingRegistration(registration);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedRegistration = (updatedRegistration) => {
    setRegistrations((prevRegistrations) =>
      prevRegistrations.map((reg) =>
        reg.id === updatedRegistration.id ? updatedRegistration : reg
      )
    );
    setIsEditModalOpen(false);
  };

  const handleOpenDeleteModal = (registration) => {
    setDeletingRegistration(registration);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteRegistration = () => {
    setRegistrations((prevRegistrations) =>
      prevRegistrations.filter((reg) => reg.id !== deletingRegistration.id)
    );
    setIsDeleteModalOpen(false);
    setDeletingRegistration(null);
  };

  const handleConfirmRegistration = (registration) => {
    setRegistrations((prevRegistrations) =>
      prevRegistrations.map((reg) =>
        reg.id === registration.id ? { ...reg, confirme: true } : reg
      )
    );
  };

  const filteredRegistrations = registrations.filter((registration) => {
    const matchesSearch =
      registration.nom_prenom?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchesSession = selectedSession ? registration.session === selectedSession : true;
    const matchesLevel = selectedLevel ? registration.niveau === selectedLevel : true;
    const matchesState = selectedState ? (selectedState === 'confirmé' ? registration.confirme === true : registration.confirme === false) : true;
    return matchesSearch && matchesSession && matchesLevel && matchesState;
  });

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
        <input
          type="text"
          placeholder="Rechercher un étudiant..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="p-2 border border-gray-300 rounded-lg mb-4 sm:mb-0 sm:w-1/3"
        />

        <select
          value={selectedSession}
          onChange={(e) => setSelectedSession(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg mb-4 sm:mb-0 sm:w-1/6"
        >
          <option value="">Toutes les sessions</option>
          {sessions.map((session) => (
            <option key={session.id} value={session.session_name}>
              {session.session_name}
            </option>
          ))}
        </select>

        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg mb-4 sm:mb-0 sm:w-1/6"
        >
          <option value="">Tous les niveaux</option>
          {levels.map((level) => (
            <option key={level.id} value={level.name}>
              {level.name}
            </option>
          ))}
        </select>

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg mb-4 sm:mb-0 sm:w-1/6"
        >
          <option value="">Tous les états</option>
          <option value="confirmé">Confirmé</option>
          <option value="non confirmé">Non confirmé</option>
        </select>

        <button
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-4 sm:mb-0"
          onClick={() => setIsAddModalOpen(true)}
        >
          <FaPlus className="mr-2" />
          Ajouter une inscription
        </button>
      </div>

      <div className="overflow-x-auto">
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
              <th className="px-4 py-2 border">État</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRegistrations.map((registration) => (
              <tr key={registration.id}>
                <td className="px-4 py-2 border">{registration.id}</td>
                <td className="px-4 py-2 border">{registration.matricule}</td>
                <td className="px-4 py-2 border">{registration.nom_prenom}</td>
                <td className="px-4 py-2 border">{registration.session}</td>
                <td className="px-4 py-2 border">{registration.niveau}</td>
                <td className="px-4 py-2 border">{registration.groupe}</td>
                <td className="px-4 py-2 border">{registration.date}</td>
                <td className="px-4 py-2 border">
                  {registration.confirme ? 'Confirmé' : 'Non confirmé'}
                </td>
                <td className="px-4 py-2 border flex items-center">
                  <button
                    onClick={() => handleEditRegistration(registration)}
                    className="mr-2 text-yellow-500 hover:text-yellow-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(registration)}
                    className="mr-2 text-red-500 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                  {registration.confirme === false && (
                    <button
                      onClick={() => handleConfirmRegistration(registration)}
                      className="text-green-500 hover:text-green-600"
                    >
                      <FaCheck />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <button onClick={handlePrevPage} className="px-4 py-2 bg-gray-300 rounded-lg">
          <FaChevronLeft />
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button onClick={handleNextPage} className="px-4 py-2 bg-gray-300 rounded-lg">
          <FaChevronRight />
        </button>
      </div>

      {isAddModalOpen && <AddRegistrationModal onClose={() => setIsAddModalOpen(false)} onSave={handleAddRegistration} />}
      {isEditModalOpen && (
        <EditRegistrationModal
          registration={editingRegistration}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedRegistration}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteRegistrationModal
          registration={deletingRegistration}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeleteRegistration}
        />
      )}
    </div>
  );
};

export default Registrations;
