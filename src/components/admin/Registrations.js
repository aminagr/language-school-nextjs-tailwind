import React, { useState, useEffect } from 'react';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
} from 'react-icons/fa';
import { fetchRegistrations, fetchSessionsData, fetchLevelsData } from '@/utils';
import AddRegistrationModal from './AddRegistrationModal'; // Assurez-vous d'importer la modal

const Registrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [levels, setLevels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Etat pour la modal
  const itemsPerPage = 10;

  useEffect(() => {
    const loadInitialData = async () => {
      const fetchedRegistrations = await fetchRegistrations();
      setRegistrations(fetchedRegistrations);

      const fetchedSessions = await fetchSessionsData();
      setSessions(fetchedSessions);
      setSelectedSession(
        fetchedSessions[fetchedSessions.length - 1]?.session_name || ''
      );

      const fetchedLevels = await fetchLevelsData();
      setLevels(fetchedLevels);
    };

    loadInitialData();
  }, []);

  const handleAddRegistration = () => {
    setIsModalOpen(true); // Ouvrir la modal
  };

  const handleSaveRegistration = async (newRegistration) => {
    // Save new registration
    setRegistrations((prev) => [...prev, newRegistration]);

    // Optionally fetch updated registrations
    const updatedRegistrations = await fetchRegistrations();
    setRegistrations(updatedRegistrations);

    // Close the modal
    setIsModalOpen(false);
  };

  const handleEditRegistration = (registration) => {
    alert(`Éditer l'inscription: ${registration.id}`);
  };

  const handleDeleteRegistration = (registration) => {
    alert(`Supprimer l'inscription: ${registration.id}`);
  };

  const handleConfirmRegistration = (registration) => {
    setRegistrations((prevRegistrations) =>
      prevRegistrations.map((reg) =>
        reg.id === registration.id ? { ...reg, etat: 'confirmé' } : reg
      )
    );
  };

  const filteredRegistrations = registrations.filter((registration) => {
    const matchesSearch =
      registration.nom_prenom?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchesSession = selectedSession
      ? registration.session === selectedSession
      : true;
    const matchesLevel = selectedLevel ? registration.niveau === selectedLevel : true;
    return matchesSearch && matchesSession && matchesLevel;
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
      {/* Contenu de la page */}
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

        <button
          onClick={handleAddRegistration}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-4 sm:mb-0"
        >
          <FaPlus className="mr-2" />
          Ajouter une inscription
        </button>
      </div>

      {/* Affichage de la table */}
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
                <td className="px-4 py-2 border">{registration.etat}</td>
                <td className="px-4 py-2 border flex items-center">
                  <button
                    onClick={() => handleEditRegistration(registration)}
                    className="mr-2 text-yellow-500 hover:text-yellow-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteRegistration(registration)}
                    className="mr-2 text-red-500 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                  {registration.etat !== 'confirmé' && (
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

      {/* Navigation */}
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

      {/* Affichage de la modal */}
      {isModalOpen && (
        <AddRegistrationModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveRegistration}
        />
      )}
    </div>
  );
};

export default Registrations;
