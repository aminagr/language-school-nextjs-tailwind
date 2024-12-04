
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AddLevelModal from '@/components/admin/AddLevelModal';
import EditLevelModal from '@/components/admin/EditLevelModal';
import DeleteLevelModal from '@/components/admin/DeleteLevelModal';
import { fetchLevelsData } from '@/utils/index'; 

const Levels = () => {
  const [levels, setLevels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editData, setEditData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [levelToDelete, setLevelToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
   
    const fetchedLevels = fetchLevelsData();
    setLevels(fetchedLevels);
  }, []);

  const handleAddLevel = (newLevel) => {
    const addedLevel = { id: Date.now(), ...newLevel };
    setLevels([...levels, addedLevel]);
    setIsAddModalOpen(false);
  };

  const handleUpdateLevel = (updatedLevel) => {
    const updated = levels.map((level) =>
      level.id === updatedLevel.id ? updatedLevel : level
    );
    setLevels(updated);
    setIsEditModalOpen(false);
  };

  const confirmDeleteLevel = () => {
    setLevels(levels.filter((level) => level.id !== levelToDelete.id));
    setIsDeleteModalOpen(false);
    setLevelToDelete(null);
  };

  const openDeleteModal = (level) => {
    setLevelToDelete(level);
    setIsDeleteModalOpen(true);
  };

  const filteredLevels = levels.filter((level) =>
    level.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLevels.length / itemsPerPage);
  const currentLevels = filteredLevels.slice(
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
          placeholder="Rechercher un niveau..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); 
          }}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <FaPlus className="mr-2" />
          Ajouter un niveau
        </button>
      </div>

      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Nom du niveau</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentLevels.map((level) => (
            <tr key={level.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{level.id}</td>
              <td className="px-4 py-2 border">{level.name}</td>
              <td className="px-4 py-2 border flex space-x-2">
                <button
                  onClick={() => {
                    setEditData(level);
                    setIsEditModalOpen(true);
                  }}
                  className="p-2 text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => openDeleteModal(level)}
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

      {isAddModalOpen && (
        <AddLevelModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddLevel}
        />
      )}
      {isEditModalOpen && (
        <EditLevelModal
          data={editData}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateLevel}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteLevelModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDeleteLevel}
          levelName={levelToDelete?.name}
        />
      )}
    </div>
  );
};

export default Levels;
