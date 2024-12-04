import React, { useState } from 'react';
import { FaTimes, FaSave } from 'react-icons/fa'; 

const AddRoomModal = ({ onClose, onSave }) => {
  const [roomName, setRoomName] = useState('');

  const handleChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoom = { name: roomName };
    onSave(newRoom);
    setRoomName('');
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          <FaTimes className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ajouter une salle</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="roomName" className="block text-gray-700 font-medium mb-2">Nom de la salle</label>
          <input
            type="text"
            id="roomName"
            name="name"
            value={roomName}
            onChange={handleChange}
            placeholder="Nom de la salle"
            required
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none flex items-center justify-center">
            <FaSave className="h-5 w-5 mr-2" />
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoomModal;
