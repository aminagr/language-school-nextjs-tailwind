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
    {
      id: 3,
      matricule: '12347',
      nom: 'Tahar',
      prenom: 'Ali',
      date_naissance: '2000-05-21',
      lieu_naissance: 'Constantine',
      adresse: '15 avenue des Martyrs, Constantine',
      telephone: '0551234590',
      mail: 'ali.tahar@example.com',
      type: 'Etudiant'
    },
    {
      id: 4,
      matricule: '12348',
      nom: 'Boudjemaa',
      prenom: 'Khaled',
      date_naissance: '1997-09-10',
      lieu_naissance: 'Blida',
      adresse: '28 rue de la Liberté, Blida',
      telephone: '0551234591',
      mail: 'khaled.boudjemaa@example.com',
      type: 'Externe'
    },
    {
      id: 5,
      matricule: '12349',
      nom: 'Mokhtar',
      prenom: 'Sara',
      date_naissance: '2001-02-19',
      lieu_naissance: 'Tlemcen',
      adresse: '32 rue de la Paix, Tlemcen',
      telephone: '0551234592',
      mail: 'sara.mokhtar@example.com',
      type: 'Etudiant'
    },
    {
      id: 6,
      matricule: '12350',
      nom: 'Charef',
      prenom: 'Mouad',
      date_naissance: '2000-07-30',
      lieu_naissance: 'Setif',
      adresse: '10 rue de l\'Avenir, Setif',
      telephone: '0551234593',
      mail: 'mouad.charef@example.com',
      type: 'Fonctionnaire'
    },
    {
      id: 7,
      matricule: '12351',
      nom: 'Aissa',
      prenom: 'Lina',
      date_naissance: '1998-11-11',
      lieu_naissance: 'Alger',
      adresse: '45 rue des Fleurs, Alger',
      telephone: '0551234594',
      mail: 'lina.aissa@example.com',
      type: 'Etudiant'
    },
    {
      id: 8,
      matricule: '12352',
      nom: 'Brahimi',
      prenom: 'Yassine',
      date_naissance: '1997-08-23',
      lieu_naissance: 'Oran',
      adresse: '18 rue des Pins, Oran',
      telephone: '0551234595',
      mail: 'yassine.brahimi@example.com',
      type: 'Fonctionnaire'
    },
    {
      id: 9,
      matricule: '12353',
      nom: 'Zerhouni',
      prenom: 'Amira',
      date_naissance: '1999-12-12',
      lieu_naissance: 'Alger',
      adresse: '21 rue de la République, Alger',
      telephone: '0551234596',
      mail: 'amira.zerhouni@example.com',
      type: 'Etudiant'
    },
    {
      id: 10,
      matricule: '12354',
      nom: 'Khelifi',
      prenom: 'Ranya',
      date_naissance: '2000-03-17',
      lieu_naissance: 'Tizi Ouzou',
      adresse: '58 rue des Alpes, Tizi Ouzou',
      telephone: '0551234597',
      mail: 'ranya.khelifi@example.com',
      type: 'Externe'
    },
    {
      id: 10,
      matricule: '299999',
      nom: 'Amina',
      prenom: 'Ameur',
      date_naissance: '2000-03-17',
      lieu_naissance: 'Alger',
      adresse: '58 rue du football, Alger',
      telephone: '0551234597',
      mail: 'amina.ameur@example.com',
      type: 'Externe'
    }
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
    },
    {
      id: 4,
      matricule: students[2].matricule,
      nom_prenom: `${students[2].nom} ${students[2].prenom}`,
      session: sessions[2].session_name,
      niveau: levels[0].name,
      groupe: groups[1].group_name,
      date: '2023-01-20',
      confirme: true
    },
    {
      id: 5,
      matricule: students[3].matricule,
      nom_prenom: `${students[3].nom} ${students[3].prenom}`,
      session: sessions[1].session_name,
      niveau: levels[1].name,
      groupe: groups[3].group_name,
      date: '2023-01-20',
      confirme: false
    },
    {
      id: 6,
      matricule: students[4].matricule,
      nom_prenom: `${students[4].nom} ${students[4].prenom}`,
      session: sessions[1].session_name,
      niveau: levels[1].name,
      groupe: groups[4].group_name,
      date: '2023-01-20',
      confirme: true
    },
    {
      id: 7,
      matricule: students[5].matricule,
      nom_prenom: `${students[5].nom} ${students[5].prenom}`,
      session: sessions[0].session_name,
      niveau: levels[0].name,
      groupe: groups[6].group_name,
      date: '2023-01-20',
      confirme: true
    },
    {
      id: 8,
      matricule: students[6].matricule,
      nom_prenom: `${students[6].nom} ${students[6].prenom}`,
      session: sessions[2].session_name,
      niveau: levels[2].name,
      groupe: groups[2].group_name,
      date: '2023-01-20',
      confirme: false
    },
    {
      id: 9,
      matricule: students[7].matricule,
      nom_prenom: `${students[7].nom} ${students[7].prenom}`,
      session: sessions[0].session_name,
      niveau: levels[1].name,
      groupe: groups[7].group_name,
      date: '2023-01-20',
      confirme: true
    },
    {
      id: 10,
      matricule: students[8].matricule,
      nom_prenom: `${students[8].nom} ${students[8].prenom}`,
      session: sessions[1].session_name,
      niveau: levels[2].name,
      groupe: groups[8].group_name,
      date: '2023-01-20',
      confirme: true
    },
    {
      id: 11,
      matricule: students[8].matricule,
      nom_prenom: `${students[8].nom} ${students[8].prenom}`,
      session: sessions[0].session_name,
      niveau: levels[1].name,
      groupe: groups[0].group_name,
      date: '2023-01-20',
      confirme: true
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
      confirme: reg.confirme,  
    };
  });

  return studentDetails;
};


export const getTotalRooms = () => {
  const rooms = fetchRoomsData();
  return rooms.length;
};



// Total number of students
export const getTotalStudents = () => {
  const students = fetchStudentsData();
  return students.length;
};

// Number of confirmed registrations
export const getConfirmedRegistrations = () => {
  const registrations = fetchRegistrations();
  return registrations.filter(reg => reg.confirme).length;
};

// Number of unconfirmed registrations
export const getUnconfirmedRegistrations = () => {
  const registrations = fetchRegistrations();
  return registrations.filter(reg => !reg.confirme).length;
};

// Total number of groups
export const getTotalGroups = () => {
  const groups = fetchGroups();
  return groups.length;
};

// Total number of sessions
export const getTotalSessions = () => {
  const sessions = fetchSessionsData();
  return sessions.length;
};

// Number of sessions that are ongoing
export const getOngoingSessions = () => {
  const sessions = fetchSessionsData();
  const today = new Date().toISOString().split('T')[0];
  return sessions.filter(session => session.start_date <= today && session.end_date >= today).length;
};

// Number of sessions that have ended
export const getEndedSessions = () => {
  const sessions = fetchSessionsData();
  const today = new Date().toISOString().split('T')[0];
  return sessions.filter(session => session.end_date < today).length;
};

// Number of sessions that have not started yet
export const getUpcomingSessions = () => {
  const sessions = fetchSessionsData();
  const today = new Date().toISOString().split('T')[0];
  return sessions.filter(session => session.start_date > today).length;
};

// Total number of levels
export const getTotalLevels = () => {
  const levels = fetchLevelsData();
  return levels.length;
};



// Average number of students per group
export const getAvgStudentsPerGroup = () => {
  const groups = fetchGroups();
  const totalStudents = groups.reduce((sum, group) => sum + getStudentsByGroupId(group.id).length, 0);
  return totalStudents / groups.length;
};

// Number of groups by level
export const getGroupsByLevel = () => {
  const groups = fetchGroups();
  const levels = fetchLevelsData();
  const groupsByLevel = levels.map(level => ({
    levelName: level.name,
    groupCount: groups.filter(group => group.level === level.name).length,
  }));
  return groupsByLevel;
};



// Number of students per session
export const getStudentsPerSession = () => {
  const sessions = fetchSessionsData();
  return sessions.map(session => {
    const registrationsInSession = fetchRegistrations().filter(reg => reg.session === session.session_name);
    return {
      sessionName: session.session_name,
      studentCount: registrationsInSession.length,
    };
  });
};



// Confirmed registrations per session
export const getConfirmedRegistrationsPerSession = () => {
  const sessions = fetchSessionsData();
  return sessions.map(session => {
    const confirmedRegs = fetchRegistrations().filter(reg => reg.session === session.session_name && reg.confirme);
    return {
      sessionName: session.session_name,
      confirmedCount: confirmedRegs.length,
    };
  });
};

// Unconfirmed registrations per session
export const getUnconfirmedRegistrationsPerSession = () => {
  const sessions = fetchSessionsData();
  return sessions.map(session => {
    const unconfirmedRegs = fetchRegistrations().filter(reg => reg.session === session.session_name && !reg.confirme);
    return {
      sessionName: session.session_name,
      unconfirmedCount: unconfirmedRegs.length,
    };
  });
};


export const getStudentAgeDistribution = () => {
  const students = fetchStudentsData();
  const currentYear = new Date().getFullYear();
  const ageDistribution = students.reduce((acc, student) => {
    const birthYear = new Date(student.date_naissance).getFullYear();
    const age = currentYear - birthYear;
    acc[age] = (acc[age] || 0) + 1;
    return acc;
  }, {});
  return ageDistribution;
};

export const getTopActiveStudents = () => {
  const registrations = fetchRegistrations();
  const students = fetchStudentsData();

  const studentSessionCount = registrations.reduce((acc, reg) => {
    acc[reg.matricule] = (acc[reg.matricule] || 0) + 1;
    return acc;
  }, {});

  const sortedStudents = students.map(student => ({
    ...student,
    sessionCount: studentSessionCount[student.matricule] || 0
  })).sort((a, b) => b.sessionCount - a.sessionCount);

  return sortedStudents.slice(0, 3);
};


// Average age of students
export const getAvgAgeOfStudents = () => {
  const students = fetchStudentsData();
  const currentYear = new Date().getFullYear();
  const totalAge = students.reduce((sum, student) => sum + (currentYear - new Date(student.date_naissance).getFullYear()), 0);
  return totalAge / students.length;
};

// Most frequent group
export const getMostFrequentGroup = () => {
  const groups = fetchGroups();
  const groupNames = groups.map(group => group.group_name);
  const groupCount = groupNames.reduce((acc, groupName) => {
    acc[groupName] = (acc[groupName] || 0) + 1;
    return acc;
  }, {});
  const mostFrequentGroup = Object.entries(groupCount).reduce((max, [groupName, count]) => count > max.count ? { groupName, count } : max, { groupName: '', count: 0 });
  return mostFrequentGroup;
};

// Most popular session
export const getMostPopularSession = () => {
  const sessions = fetchSessionsData();
  const sessionNames = sessions.map(session => session.session_name);
  const sessionCount = sessionNames.reduce((acc, sessionName) => {
    acc[sessionName] = (acc[sessionName] || 0) + 1;
    return acc;
  }, {});
  const mostPopularSession = Object.entries(sessionCount).reduce((max, [sessionName, count]) => count > max.count ? { sessionName, count } : max, { sessionName: '', count: 0 });
  return mostPopularSession;
};

export const getStudentsPerGroupChartData = () => {
  const groups = fetchGroups();
  return groups.map(group => ({
    group_name: group.group_name,
    students_count: getStudentsByGroupId(group.id).length,
  }));
};
export const getRegistrationsStatusChartData = () => {
  const confirmed = getConfirmedRegistrations();
  const unconfirmed = getUnconfirmedRegistrations();
  return [
    { status: 'Confirmed', count: confirmed },
    { status: 'Unconfirmed', count: unconfirmed },
  ];
};
export const getGroupsByLevelChartData = () => {
  const groupsByLevel = getGroupsByLevel();
  return groupsByLevel.map(item => ({
    level_name: item.levelName,
    groups_count: item.groupCount,
  }));
};

export const getEnrollmentOverTimeChartData = () => {
  const registrations = fetchRegistrations();
  const data = registrations.reduce((acc, reg) => {
    const date = reg.date.split('T')[0]; // Get the date part
    acc[date] = (acc[date] || 0) + 1; // Count registrations per date
    return acc;
  }, {});

  return Object.entries(data).map(([date, count]) => ({
    date,
    count,
  }));
};
