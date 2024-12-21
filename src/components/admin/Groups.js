import React, { useState, useEffect } from 'react';    
import { FaPlus, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AddGroupModal from '@/components/admin/AddGroupModal';
import EditGroupModal from '@/components/admin/EditGroupModal';
import DeleteGroupModal from '@/components/admin/DeleteGroupModal';
import { fetchGroups, fetchSessionsData, fetchLevelsData } from '@/utils/index'; 
import Link from 'next/link';
import { useLocale } from 'next-intl'; 



const Groups = () => {
  const locale = useLocale();
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSession, setSelectedSession] = useState(''); 
  const [selectedLevel, setSelectedLevel] = useState(''); 
  const itemsPerPage = 30;


  useEffect(() => {
    const fetchedGroups = fetchGroups(); 
    setGroups(fetchedGroups);

    const sessions = fetchSessionsData();
    if (sessions.length > 0) {
      setSelectedSession(sessions[sessions.length - 1].session_name); 
    }
  }, []);

  const handleAddGroup = (newGroup) => {
    const addedGroup = { id: Date.now(), ...newGroup };
    setGroups([...groups, addedGroup]);
    setIsAddModalOpen(false);
  };

  const handleUpdateGroup = (updatedGroup) => {
    const updated = groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    );
    setGroups(updated);
    setIsEditModalOpen(false);
  };

  const handleDeleteGroup = (id) => {
    setGroups(groups.filter((group) => group.id !== id));
    setDeleteData(null);
  };


const filteredGroups = groups.filter((group) => {
  const matchesGroupName = group.group_name.toLowerCase().includes(searchTerm.toLowerCase());
  
  const matchesSession = group.sessions.some((session) =>
    session.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.start_time.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.end_time.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.room_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    (selectedSession ? group.session_name === selectedSession : true) &&
    (selectedLevel ? group.level === selectedLevel : true) &&
    (matchesGroupName || matchesSession)
  );
});


  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
  const currentGroups = filteredGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSessionChange = (e) => {
    setSelectedSession(e.target.value);  
    setCurrentPage(1);  
  };

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);  
    setCurrentPage(1);  
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Rechercher un groupe..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        className="p-2 border border-gray-300 rounded-lg w-full sm:w-2/5"
        />
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <select
            value={selectedSession}
            onChange={handleSessionChange}
             className="p-2 border border-gray-300 rounded-lg w-full sm:w-full"
          >
            <option value="">Toutes les sessions</option>
            {fetchSessionsData().map((session) => (
              <option key={session.id} value={session.session_name}>
                {session.session_name}
              </option>
            ))}
          </select>
          <select
            value={selectedLevel}
            onChange={handleLevelChange}
            className="p-2 border border-gray-300 rounded-lg w-full sm:w-full"
          >
            <option value="">Tous les niveaux</option>
            {fetchLevelsData().map((level) => (
              <option key={level.id} value={level.name}>
                {level.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <FaPlus className="mr-2" />
          Ajouter un groupe
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nom du groupe</th>
              <th className="px-4 py-2 border">Nom de la session</th>
              <th className="px-4 py-2 border">Niveau</th>
              <th className="px-4 py-2 border">Séances par semaine</th>
              <th className="px-4 py-2 border">Séances</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentGroups.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{group.id}</td>
                <td className="px-4 py-2 border">
              
                <Link href={`/${locale}/admin/groups/${group.id}`} className="text-blue-500 hover:text-blue-700">
                    {group.group_name}
                  </Link>
                </td>
                <td className="px-4 py-2 border">{group.session_name}</td>
                <td className="px-4 py-2 border">{group.level}</td>
                <td className="px-4 py-2 border">{group.sessions_per_week}</td>
                <td className="px-4 py-2 border">
                  {group.sessions.map((session, index) => (
                    <div key={index}>
                      <p>{session.day} - {session.start_time} à {session.end_time} - {session.room_name}</p>
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2 border flex space-x-2">
                  <button
                    onClick={() => {
                      setEditData(group);
                      setIsEditModalOpen(true);
                    }}
                    className="p-2 text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                <button
                onClick={() => {
                  setDeleteData(group);
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
        <AddGroupModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddGroup}
        />
      )}
      {isEditModalOpen && editData && (
        <EditGroupModal
          group={editData}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateGroup}
        />
      )}
    {isDeleteModalOpen && deleteData && (
  <DeleteGroupModal
    groupName={deleteData.group_name}  
    onClose={() => setIsDeleteModalOpen(false)}
    onDelete={() => handleDeleteGroup(deleteData.id)}  
  />
)}
    </div>
  );
};

export default Groups;
