import React from 'react';

const DeleteLevelModal = ({ isOpen, onClose, onConfirm, levelName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Confirmer la suppression</h2>
        <p className="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer le niveau <strong>{levelName}</strong> ?
          Cette action est irréversible.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLevelModal;
