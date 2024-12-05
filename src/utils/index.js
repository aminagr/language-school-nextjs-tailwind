// src/utils/index.js

export const fetchLevelsData = () => [
  { id: 1, name: 'Niveau 1' },
  { id: 2, name: 'Niveau 2' },
  { id: 3, name: 'Niveau 3' },
  { id: 4, name: 'Niveau 4' },
];

export const fetchRoomsData = () => [
  { id: 1, name: 'Salle A' },
  { id: 2, name: 'Salle B' },
  { id: 3, name: 'Salle C' },
  { id: 4, name: 'Salle D' },
];

export const fetchSessionsData = () => [
  {
    id: 1,
    session_name: 'Session Fevrier 2024',
    start_date: '2024-02-01',
    end_date: '2024-02-28',
    registration_start_date: '2023-12-01',
    registration_end_date: '2023-12-20',
  },
  {
    id: 2,
    session_name: 'Session Novembre 2024',
    start_date: '2024-11-01',
    end_date: '2024-11-30',
    registration_start_date: '2023-12-15',
    registration_end_date: '2024-01-15',
  },
  {
    id: 3,
    session_name: 'Session Fevrier 2025',
    start_date: '2025-02-01',
    end_date: '2025-06-30',
    registration_start_date: '2023-01-15',
    registration_end_date: '2024-01-30',
  },
];

export const fetchGroups = () => {
  const levels = fetchLevelsData();
  const rooms = fetchRoomsData();
  const sessions = fetchSessionsData();

  return [
    {
      id: 1,
      group_name: 'Groupe A',
      level: levels.find(level => level.id === 1)?.name,
      sessions_per_week: 2,
      sessions: [
        { day: 'Lundi', start_time: '08:00', end_time: '10:00', room_name: rooms.find(room => room.id === 1)?.name },
        { day: 'Mardi', start_time: '12:00', end_time: '14:00', room_name: rooms.find(room => room.id === 3)?.name },
      ],
      session_name: sessions.find(session => session.id === 3)?.session_name,
    },
    {
      id: 2,
      group_name: 'Groupe B',
      level: levels.find(level => level.id === 2)?.name,
      sessions_per_week: 1,
      sessions: [
        { day: 'Jeudi', start_time: '14:00', end_time: '16:00', room_name: rooms.find(room => room.id === 2)?.name },
      ],
      session_name: sessions.find(session => session.id === 3)?.session_name,
    },
    {
      id: 3,
      group_name: 'Groupe C',
      level: levels.find(level => level.id === 1)?.name,
      sessions_per_week: 1,
      sessions: [
        { day: 'Mercredi', start_time: '08:00', end_time: '10:00', room_name: rooms.find(room => room.id === 1)?.name },
      ],
      session_name: sessions.find(session => session.id === 3)?.session_name,
    },
    {
      id: 4,
      group_name: 'Groupe D',
      level: levels.find(level => level.id === 2)?.name,
      sessions_per_week: 1,
      sessions: [
        { day: 'Lundi', start_time: '08:00', end_time: '10:00', room_name: rooms.find(room => room.id === 2)?.name },
      ],
      session_name: sessions.find(session => session.id === 3)?.session_name,
    },
  ];
};
