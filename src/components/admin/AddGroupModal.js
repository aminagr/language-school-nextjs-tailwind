import React, { useState, useEffect } from 'react';
import { fetchLevelsData, fetchRoomsData, fetchSessionsData } from '@/utils';

const AddGroupModal = ({ onSave, onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [level, setLevel] = useState('');
  const [sessionsPerWeek, setSessionsPerWeek] = useState(1);
  const [sessions, setSessions] = useState([]);
  const [sessionName, setSessionName] = useState('');

  const levels = fetchLevelsData();
  const rooms = fetchRoomsData();
  const sessionsData = fetchSessionsData();

  useEffect(() => {
    const newSessions = Array.from({ length: sessionsPerWeek }, () => ({
      day: 'Lundi',
      start_time: '08:00',
      end_time: '10:00',
      room: '1', 
    }));
    setSessions(newSessions);
  }, [sessionsPerWeek]);

  useEffect(() => {
    if (levels.length > 0) {
      setLevel(levels[0].id); 
    }

    if (sessionsData.length > 0) {
      setSessionName(sessionsData[0].session_name); 
    }
  }, [levels, sessionsData]);

  const handleSessionChange = (index, field, value) => {
    const updatedSessions = [...sessions];
    updatedSessions[index][field] = value;
    setSessions(updatedSessions);
  };

  const handleSubmit = () => {
    if (!groupName || !level || sessions.length === 0 || !sessionName) return;
  
    const selectedLevel = levels.find(lvl => lvl.id === parseInt(level));
    const selectedSession = sessionsData.find(session => session.session_name === sessionName);
  
    const formattedSessions = sessions.map(session => ({
      ...session,
      room_name: rooms.find(room => room.id === parseInt(session.room))?.name, 
    }));
  
    onSave({
      group_name: groupName,
      level: selectedLevel ? selectedLevel.name : '',
      sessions_per_week: sessionsPerWeek,
      sessions: formattedSessions, 
      session_name: selectedSession ? selectedSession.session_name : '',
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl mb-4">Ajouter un groupe</h2>
        <input
          type="text"
          placeholder="Nom du groupe"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full"
        />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full"
        >
          <option value="">Sélectionner un niveau</option>
          {levels.map((lvl) => (
            <option key={lvl.id} value={lvl.id}>{lvl.name}</option>
          ))}
        </select>
        <select
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg mb-4 w-full"
        >
          <option value="">Sélectionner une session</option>
          {sessionsData.map((session) => (
            <option key={session.id} value={session.session_name}>
              {session.session_name}
            </option>
          ))}
        </select>
        <div>
          <label className="block mb-2">Nombre de séances par semaine :</label>
          <input
            type="number"
            min="1"
            value={sessionsPerWeek}
            onChange={(e) => setSessionsPerWeek(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>
        <div className="mt-4">
          {sessions.map((session, index) => (
            <div key={index} className="mt-4">
              <select
                value={session.day}
                onChange={(e) => handleSessionChange(index, 'day', e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-full"
              >
                <option value="">Jour</option>
                {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <div className="flex space-x-2 mt-2">
                <input
                  type="time"
                  value={session.start_time}
                  onChange={(e) => handleSessionChange(index, 'start_time', e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="time"
                  value={session.end_time}
                  onChange={(e) => handleSessionChange(index, 'end_time', e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <select
                value={session.room}
                onChange={(e) => handleSessionChange(index, 'room', e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-full mt-2"
              >
                <option value="">Sélectionner une salle</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>{room.name}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGroupModal;
