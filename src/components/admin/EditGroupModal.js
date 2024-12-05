import React, { useState, useEffect } from 'react';
import { fetchSessionsData, fetchLevelsData, fetchRoomsData } from '@/utils/index';
import { FaTimes, FaSave } from 'react-icons/fa';

const EditGroupModal = ({ group, onClose, onSave }) => {
  const [groupData, setGroupData] = useState({ ...group });
  const [sessions, setSessions] = useState([]);
  const [levels, setLevels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setLevels(fetchLevelsData());
    setRooms(fetchRoomsData());
    setSessions(fetchSessionsData());
  }, []);

  const handleSessionChange = (e, index, field) => {
    const updatedSessions = [...groupData.sessions];
    updatedSessions[index][field] = e.target.value;
    setGroupData({ ...groupData, sessions: updatedSessions });
  };

  const handleDaysChange = (e, index) => {
    const updatedSessions = [...groupData.sessions];
    updatedSessions[index].day = e.target.value;  
    setGroupData({ ...groupData, sessions: updatedSessions });
  };
  

  const handleSessionsCountChange = (e) => {
    const value = e.target.value;
    const newSessionsCount = parseInt(value);
  
    if (isNaN(newSessionsCount) || newSessionsCount <= 0) {
      setErrors({
        ...errors,
        sessions_per_week: "Le nombre de séances doit être un nombre valide et positif.",
      });
      return;
    }
  
    const updatedSessions = [...groupData.sessions];
    if (newSessionsCount > groupData.sessions.length) {
      while (updatedSessions.length < newSessionsCount) {
        updatedSessions.push({
          day: 'Lundi',        // Valeur par défaut
          start_time: '08:00',      // Valeur par défaut
          end_time: '10:00',        // Valeur par défaut
          room_name: 'Salle 1', // Valeur par défaut
        });
      }
    } else if (newSessionsCount < groupData.sessions.length) {
      updatedSessions.length = newSessionsCount;
    }
  
    setGroupData({
      ...groupData,
      sessions_per_week: newSessionsCount,
      sessions: updatedSessions,
    });
  
    setErrors({
      ...errors,
      sessions_per_week: '',
    });
  };
  

  const validateForm = () => {
    const newErrors = {};
    if (!groupData.group_name) newErrors.group_name = "Le nom du groupe est requis.";
    if (!groupData.session_name) newErrors.session_name = "La session est requise.";
    if (!groupData.level) newErrors.level = "Le niveau est requis.";
    if (isNaN(groupData.sessions_per_week) || groupData.sessions_per_week <= 0) {
      newErrors.sessions_per_week = "Le nombre de séances par semaine doit être un nombre valide et positif.";
    }

    groupData.sessions.forEach((session, index) => {
      if (!session.day) newErrors[`session_day_${index}`] = "Le jour est requis.";
      if (!session.start_time) newErrors[`session_start_time_${index}`] = "L'heure de début est requise.";
      if (!session.end_time) newErrors[`session_end_time_${index}`] = "L'heure de fin est requise.";
      if (!session.room_name) newErrors[`session_room_${index}`] = "La salle est requise.";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(groupData);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full overflow-y-auto max-h-[80vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Modifier le groupe {groupData.group_name}</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <label className="block text-gray-700">Nom du groupe</label>
          <input
            type="text"
            value={groupData.group_name}
            onChange={(e) => setGroupData({ ...groupData, group_name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.group_name && <p className="text-red-500 text-sm">{errors.group_name}</p>}

          <label className="block text-gray-700">Session</label>
          <select
            value={groupData.session_name}
            onChange={(e) => setGroupData({ ...groupData, session_name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sessions.map((session) => (
              <option key={session.id} value={session.session_name}>
                {session.session_name}
              </option>
            ))}
          </select>
          {errors.session_name && <p className="text-red-500 text-sm">{errors.session_name}</p>}

          <label className="block text-gray-700">Niveau</label>
          <select
            value={groupData.level}
            onChange={(e) => setGroupData({ ...groupData, level: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {levels.map((level) => (
              <option key={level.id} value={level.name}>
                {level.name}
              </option>
            ))}
          </select>
          {errors.level && <p className="text-red-500 text-sm">{errors.level}</p>}

          <label className="block text-gray-700">Séances par semaine</label>
          <input
            type="number"
            value={groupData.sessions_per_week}
            onChange={handleSessionsCountChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.sessions_per_week && <p className="text-red-500 text-sm">{errors.sessions_per_week}</p>}

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Séances</h3>
            {groupData.sessions.map((session, index) => (
              <div key={index} className="space-y-4">
                <label className="block text-gray-700">Jour</label>
                <select
  value={session.day}
  onChange={(e) => handleDaysChange(e, index)}
  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day) => (
    <option key={day} value={day}>
      {day}
    </option>
  ))}
</select>

                {errors[`session_day_${index}`] && <p className="text-red-500 text-sm">{errors[`session_day_${index}`]}</p>}

                <label className="block text-gray-700">Heure de début</label>
                <input
                  type="time"
                  value={session.start_time}
                  onChange={(e) => handleSessionChange(e, index, 'start_time')}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors[`session_start_time_${index}`] && <p className="text-red-500 text-sm">{errors[`session_start_time_${index}`]}</p>}

                <label className="block text-gray-700">Heure de fin</label>
                <input
                  type="time"
                  value={session.end_time}
                  onChange={(e) => handleSessionChange(e, index, 'end_time')}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors[`session_end_time_${index}`] && <p className="text-red-500 text-sm">{errors[`session_end_time_${index}`]}</p>}

                <label className="block text-gray-700">Salle</label>
                <select
                  value={session.room_name}
                  onChange={(e) => handleSessionChange(e, index, 'room_name')}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {rooms.map((room) => (
                    <option key={room.id} value={room.name}>
                      {room.name}
                    </option>
                  ))}
                </select>
                {errors[`session_room_${index}`] && <p className="text-red-500 text-sm">{errors[`session_room_${index}`]}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 focus:outline-none"
          >
            <FaSave />
            <span>Enregistrer</span>
          </button>
          <button
        onClick={onClose}
            className="bg-red-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 focus:outline-none"
          >
            <FaTimes />
            <span>Quitter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGroupModal;
