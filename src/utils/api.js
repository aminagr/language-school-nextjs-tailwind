// src/utils/api.js

// Données fictives pour les sessions disponibles
export const getSessions = () => {
    return [
      { id: 1, title: "Session 1: Introduction au Kirghiz", date: "2024-12-05", description: "Apprenez les bases du kirghiz dans cette session." },
      { id: 2, title: "Session 2: Conversation avancée", date: "2024-12-10", description: "Améliorez vos compétences en conversation avec des exercices pratiques." },
      { id: 3, title: "Session 3: Grammaire du kirghiz", date: "2024-12-15", description: "Plongez dans la grammaire avancée du kirghiz avec notre expert." }
    ];
  };
  
  // Données fictives pour les sessions passées
  export const getPastSessions = () => {
    return [
      { id: 1, title: "Session 1: Introduction au Kirghiz", date: "2024-11-15", description: "Premiers pas en Kirghiz." },
      { id: 2, title: "Session 2: Conversation de base", date: "2024-11-20", description: "Initiation à la conversation en kirghiz." }
    ];
  };
  
  // Données fictives pour les informations de l'utilisateur
  export const getStudentData = () => {
    return {
      id: 1,
  
      lastName: "Ramos",
      firstName: "Federico",
      birthDate: "1995-06-15",
      birthPlace: "Alger, Algérie",
      address: "123, Rue de la Liberté, Alger, Algérie",
      email: "ramos.federico@example.com",
      phone: "0661234567",
      userType: "Etudiant", 
      registeredSessions: [1, 2],
      notifications: [
        {
          title: "Nouveau Groupe Ouvert !",
          message: "Un nouveau groupe pour le niveau débutant a été ouvert. Inscrivez-vous vite !",
        },
        {
          title: "Rappel : Dernier Jour d'Inscription",
          message: "Les inscriptions se clôturent demain pour le niveau intermédiaire.",
        }, ],
    };
  };



  const pastSessionsData = [
    {
      name: "Session 1 - Débutant",
      date: "2024-05-15",
      group: "Groupe A",
    },
    {
      name: "Session 2 - Intermédiaire",
      date: "2024-06-20",
      group: "Groupe B",
    },
    {
      name: "Session 3 - Avancé",
      date: "2024-08-12",
      group: "Groupe C",
    },
  ];



  
  export const getSessionData = () => {
    const currentDate = new Date();
    const startDate = new Date("2024-12-01");
    const endDate = new Date("2024-12-10");
  
    const groups = {
      1: [
        { name: "Niveau 1 - Groupe 1", time: "Samedi 10h-12h", students: 28 },
        { name: "Niveau 1 - Groupe 2", time: "Lundi 8h-10h", students: 25 },
      ],
      2: [
        { name: "Niveau 2 - Groupe 1", time: "Vendredi 15h-17h", students: 30 },
        { name: "Niveau 2 - Groupe 2", time: "Mardi 18h-20h", students: 25 },
      ],
      3: [
        { name: "Niveau 3 - Groupe 1", time: "Jeudi 14h-16h", students: 18 },
        { name: "Niveau 3 - Groupe 2", time: "Mercredi 9h-11h", students: 0 },
      ],
    };
  
    return {
      startDate,
      endDate,
      groups,
      isRegistrationOpen: currentDate >= startDate && currentDate <= endDate,
    };
  };
  export const getNotifications = () => {
    return [
      {
        id: 1,
        title: "Nouvelle session ouverte",
        message: "Une nouvelle session pour le cours de développement web est maintenant ouverte. Inscrivez-vous dès maintenant!",
        isRead: false,
      },
      {
        id: 2,
        title: "Mise à jour de votre profil",
        message: "Votre profil a été mis à jour avec succès. N'oubliez pas de vérifier vos informations.",
        isRead: true,
      },
      {
        id: 3,
        title: "Rappel de paiement",
        message: "Il vous reste 2 jours pour effectuer le paiement pour la session en cours.",
        isRead: false,
      },
    ];
  };
  