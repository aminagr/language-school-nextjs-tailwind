import React from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';

const DeleteRoomModal = ({ roomName, roomId, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(roomId); 
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          <FaTimes className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Supprimer la salle</h2>
        <p className="text-gray-700 mb-4">
          Êtes-vous sûr de vouloir supprimer la salle <span className="font-bold">{roomName}</span> ?
        </p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="w-1/2 bg-gray-300 text-gray-800 p-3 rounded-lg hover:bg-gray-400 focus:outline-none"
          >
            Annuler
          </button>
          <button
            onClick={handleDelete} 
            className="w-1/2 bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 focus:outline-none flex items-center justify-center"
          >
            <FaTrash className="h-5 w-5 mr-2" />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoomModal;
