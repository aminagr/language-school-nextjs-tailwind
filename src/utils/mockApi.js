// mockApi.js
export const getLevels = async () => {
    return [
      { id: 1, nom: 'Niveau 1' },
      { id: 2, nom: 'Niveau 2' },
      { id: 3, nom: 'Niveau 3' },
    ];
  };
  
  export const addLevel = async (newLevel) => {
    return { id: Date.now(), nom: newLevel.nom };
  };
  
  export const updateLevel = async (updatedLevel) => {
    return { ...updatedLevel };
  };
  
  export const deleteLevel = async (id) => {
    return { id };
  };
  
  // Mock API pour Rooms
  export const getRooms = async () => {
    return [
      { id: 1, name: 'Salle A' },
      { id: 2, name: 'Salle B' },
      { id: 3, name: 'Salle C' },
    ];
  };
  
  export const addRoom = async (newRoom) => {
    return { id: Date.now(), name: newRoom.name };
  };
  
  export const updateRoom = async (updatedRoom) => {
    return { ...updatedRoom };
  };
  
  export const deleteRoom = async (id) => {
    return { id };
  };
  
  // Mock API pour Sessions
  export const getSessions = async () => {
    return [
      {
        id: 1,
        session_name: 'Session 1',
        start_date: '2024-01-01',
        end_date: '2024-01-30',
        registration_start_date: '2023-12-01',
      },
      {
        id: 2,
        session_name: 'Session 2',
        start_date: '2024-02-01',
        end_date: '2024-02-28',
        registration_start_date: '2023-12-15',
      },
      {
        id: 3,
        session_name: 'Session 3',
        start_date: '2024-03-01',
        end_date: '2024-03-30',
        registration_start_date: '2024-01-01',
      },
    ];
  };
  
  export const addSession = async (newSession) => {
    return { id: Date.now(), ...newSession };
  };
  
  export const updateSession = async (updatedSession) => {
    return { ...updatedSession };
  };
  
  export const deleteSession = async (id) => {
    return { id };
  };
  