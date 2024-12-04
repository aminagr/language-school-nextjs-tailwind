import React, { useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";

const EditLevelModal = ({ data, onClose, onSave }) => {
  const [levelName, setLevelName] = useState(data?.name || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (levelName.trim()) {
      onSave({ ...data, name: levelName });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <FaTimes className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Modifier le niveau</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom du niveau"
            value={levelName}
            onChange={(e) => setLevelName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-2"
            >
              <FaSave />
              <span>Modifier</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLevelModal;
