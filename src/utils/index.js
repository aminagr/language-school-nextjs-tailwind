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
  { id: 5, name: 'Salle E' },
  { id: 6, name: 'Salle F' },
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
    {
      id: 5,
      group_name: 'Groupe E',
      level: levels.find(level => level.id === 4)?.name,
      sessions_per_week: 1,
      sessions: [
        { day: 'Lundi', start_time: '10:00', end_time: '12:00', room_name: rooms.find(room => room.id === 2)?.name },
      ],
      session_name: sessions.find(session => session.id === 3)?.session_name,
    },
    {
      id: 6,
      group_name: 'Groupe F',
      level: levels.find(level => level.id === 3)?.name,
      sessions_per_week: 1,
      sessions: [
        { day: 'Lundi', start_time: '14:00', end_time: '16:00', room_name: rooms.find(room => room.id === 1)?.name },
      ],
      session_name: sessions.find(session => session.id === 3)?.session_name,
    },
    {
      id: 7,
      group_name: 'Groupe l',
      level: levels.find(level => level.id === 1)?.name,
      sessions_per_week: 1,
      sessions: [
        { day: 'Lundi', start_time: '16:00', end_time: '18:00', room_name: rooms.find(room => room.id === 3)?.name },
      ],
      session_name: sessions.find(session => session.id === 3)?.session_name,
    },
    {
      id: 8,
      group_name: 'Groupe M',
      level: levels.find(level => level.id === 1)?.name,
      sessions_per_week: 1,
      sessions: [
        { day: 'Lundi', start_time: '16:00', end_time: '18:00', room_name: rooms.find(room => room.id === 4)?.name },
      ],
      session_name: sessions.find(session => session.id === 3)?.session_name,
    },
    {
      id: 9,
      group_name: 'Groupe N',
      level: levels.find(level => level.id === 2)?.name,
      sessions_per_week: 1,
      sessions: [
        { day: 'Lundi', start_time: '16:00', end_time: '18:00', room_name: rooms.find(room => room.id === 5)?.name },
      ],
      session_name: sessions.find(session => session.id === 3)?.session_name,
    },
    {
      id: 10,
      group_name: 'Groupe O',
      level: levels.find(level => level.id === 2)?.name,
      sessions_per_week: 1,
      sessions: [
        { day: 'Mardi', start_time: '16:00', end_time: '18:00', room_name: rooms.find(room => room.id === 6)?.name },
      ],
      session_name: sessions.find(session => session.id === 2)?.session_name,
    },
  ];
};

export const fetchStudentsData = () => {
  return [
    {
      id: 1,
      matricule: '12345',
      nom: 'Dupont',
      prenom: 'Jean',
      date_naissance: '1998-01-01',
      lieu_naissance: 'Alger',
      adresse: '10 rue de l\'Université, Alger',
      telephone: '0551234567',
      mail: 'jean.dupont@example.com',
      type: 'Externe'
    },
    {
      id: 2,
      matricule: '12346',
      nom: 'Benali',
      prenom: 'Sophie',
      date_naissance: '1999-03-15',
      lieu_naissance: 'Oran',
      adresse: '12 rue des Roses, Oran',
      telephone: '0559876543',
      mail: 'sophie.benali@example.com',
      type: 'Etudiant'
    },
   
  ];
};


export const fetchRegistrations = () => {
  const students = fetchStudentsData();
  const groups = fetchGroups();
  const sessions = fetchSessionsData();
  const levels = fetchLevelsData();

  const registrations = [
    {
      id: 1,
      matricule: students[0].matricule,
      nom_prenom: `${students[0].nom} ${students[0].prenom}`,
      session: sessions[1].session_name,
      niveau: levels[1].name,
      groupe: groups[9].group_name,
      date: '2023-01-20',
      confirme: true
    },
    {
      id: 2,
      matricule: students[0].matricule,
      nom_prenom: `${students[0].nom} ${students[0].prenom}`,
      session: sessions[2].session_name,
      niveau: levels[2].name,
      groupe: groups[5].group_name,
      date: '2023-01-20',
      confirme: false
    },
    {
      id: 3,
      matricule: students[1].matricule,
      nom_prenom: `${students[1].nom} ${students[1].prenom}`,
      session: sessions[2].session_name,
      niveau: levels[0].name,
      groupe: groups[0].group_name,
      date: '2023-01-20',
      confirme: false
    }
  ];

  return registrations;
};





export const getStudentsByGroupId = (groupId) => {
  const registrations = fetchRegistrations();
  const students = fetchStudentsData();
  const groups = fetchGroups();

  const group = groups.find((g) => g.id === groupId);
  if (!group) {
    return [];
  }

  const groupRegistrations = registrations.filter((reg) => reg.groupe === group.group_name);

  const studentDetails = groupRegistrations.map((reg) => {
    const student = students.find((student) => student.matricule === reg.matricule);
    return {
      nom: student.nom,
      prenom: student.prenom,
      matricule: student.matricule,
      confirme: reg.confirme,  // Ajout de l'état de confirmation
    };
  });

  return studentDetails;
};
