import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AddRoomModal from '@/components/admin/AddRoomModal';
import EditRoomModal from '@/components/admin/EditRoomModal';
import DeleteRoomModal from '@/components/admin/DeleteRoomModal';
import { fetchRoomsData } from '@/utils'; 

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editData, setEditData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteRoomName, setDeleteRoomName] = useState('');
  const [deleteRoomId, setDeleteRoomId] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 20; 

  useEffect(() => {
    
    const fetchedRooms = fetchRoomsData();
    setRooms(fetchedRooms);
  }, []);

  const handleAddRoom = (newRoom) => {
    const addedRoom = { id: Date.now(), ...newRoom };
    setRooms([...rooms, addedRoom]);
    setIsAddModalOpen(false);
  };

  const handleUpdateRoom = (updatedRoom) => {
    const updated = rooms.map((room) =>
      room.id === updatedRoom.id ? updatedRoom : room
    );
    setRooms(updated);
    setIsEditModalOpen(false);
  };

  const handleDeleteRoom = (id) => {
    setRooms(rooms.filter((room) => room.id !== id)); 
    setIsDeleteModalOpen(false); 
  };

  const handleOpenDeleteModal = (room) => {
    setDeleteRoomName(room.name);
    setDeleteRoomId(room.id); 
    setIsDeleteModalOpen(true);
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    room.id.toString().includes(searchTerm) 
  );
  

  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);
  const currentRooms = filteredRooms.slice(
    (currentPage - 1) * roomsPerPage,
    currentPage * roomsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Rechercher une salle..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); 
            }}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center space-x-2"
          >
            <FaPlus />
            <span>Ajouter une salle</span>
          </button>
        </div>
      </div>

      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border-b text-left">ID</th>
            <th className="px-4 py-2 border-b text-left">Nom de la salle</th>
            <th className="px-4 py-2 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRooms.map((room) => (
            <tr key={room.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{room.id}</td>
              <td className="px-4 py-2 border-b">{room.name}</td>
              <td className="px-4 py-2 border-b flex space-x-2">
                <button
                  onClick={() => {
                    setEditData(room);
                    setIsEditModalOpen(true);
                  }}
                  className="p-2 text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleOpenDeleteModal(room)}
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
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>

      {isEditModalOpen && (
        <EditRoomModal
          roomData={editData}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateRoom}
        />
      )}
      {isAddModalOpen && (
        <AddRoomModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddRoom}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteRoomModal
          roomName={deleteRoomName}
          roomId={deleteRoomId} 
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => handleDeleteRoom(deleteRoomId)}
        />
      )}
    </div>
  );
};

export default Rooms;
