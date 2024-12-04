import React from 'react';

const DeleteSessionModal = ({ onClose, onDelete, sessionName }) => {
  const handleDelete = () => {
    onDelete();  
    onClose();   
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Supprimer la session</h2>
        <p className="mb-4">
          Êtes-vous sûr de vouloir supprimer la session <strong>{sessionName}</strong> ?
        </p>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSessionModal;
