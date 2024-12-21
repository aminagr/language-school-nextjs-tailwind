import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { fetchStudentsData, fetchSessionsData, fetchLevelsData, fetchGroups } from '@/utils';

const EditRegistrationModal = ({ registration, onClose, onSave }) => {
  const [matricule, setMatricule] = useState(registration.matricule || '');
  const [session, setSession] = useState(registration.session || '');
  const [niveau, setNiveau] = useState('');
  const [groupe, setGroupe] = useState('');
  const [date, setDate] = useState(registration.date || new Date().toISOString().slice(0, 10));
  const [confirme, setConfirme] = useState(registration.confirme || false);  // Change ici: 'confirme' au lieu de 'etat'
  const [students, setStudents] = useState([]);
  const [sessionsData, setSessionsData] = useState([]);
  const [levelsData, setLevelsData] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, sessions, levels, groups] = await Promise.all([
          fetchStudentsData(),
          fetchSessionsData(),
          fetchLevelsData(),
          fetchGroups(),
        ]);

        setStudents(studentsData);
        setSessionsData(sessions);
        setLevelsData(levels);
        setGroupsData(groups);

        
        if (registration.niveau && registration.groupe) {
          const initialLevel = levels.find((lvl) => lvl.name === registration.niveau);
          const initialGroup = groups.find((grp) => grp.group_name === registration.groupe);

          if (initialLevel) setNiveau(initialLevel.id);
          if (initialGroup) setGroupe(initialGroup.id);

          const filtered = groups.filter(
            (grp) =>
              grp.level === registration.niveau &&
              grp.session_name === registration.session
          );
          setFilteredGroups(filtered);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [registration]);

  useEffect(() => {
    if (niveau && session) {
      const levelName = levelsData.find((lvl) => lvl.id === parseInt(niveau))?.name;
      const filtered = groupsData.filter(
        (grp) => grp.level === levelName && grp.session_name === session
      );
      setFilteredGroups(filtered);
    } else {
      setFilteredGroups([]);
    }
  }, [niveau, session, groupsData, levelsData]);

  const handleSave = () => {
    if (matricule && session && niveau && groupe) {
      const niveauName = levelsData.find((lvl) => lvl.id === parseInt(niveau))?.name;
      const groupeName = filteredGroups.find((grp) => grp.id === parseInt(groupe))?.group_name;
      const student = students.find((stu) => stu.matricule === matricule);
      const fullName = `${student?.nom} ${student?.prenom}`;

      const updatedRegistration = {
        ...registration,
        matricule,
        session,
        niveau: niveauName,
        groupe: groupeName,
        nom_prenom: fullName,
        date,
        confirme,  // Change ici: 'confirme' au lieu de 'etat'
      };

      onSave(updatedRegistration);
      onClose();
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Modifier l'inscription</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={matricule}
            onChange={(e) => setMatricule(e.target.value)}
            placeholder="Matricule"
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>

        <div className="mb-4">
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          >
            <option value="">Sélectionner une session</option>
            {sessionsData.map((session) => (
              <option key={session.id} value={session.session_name}>
                {session.session_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <select
            value={niveau}
            onChange={(e) => setNiveau(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          >
            <option value="">Sélectionner un niveau</option>
            {levelsData.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <select
            value={groupe}
            onChange={(e) => setGroupe(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          >
            <option value="">Sélectionner un groupe</option>
            {filteredGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.group_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>

        <div className="mb-4">
          <select
            value={confirme ? 'confirmé' : 'non confirmé'}  
            onChange={(e) => setConfirme(e.target.value === 'confirmé')}  
            className="p-2 border border-gray-300 rounded-lg w-full"
          >
            <option value="confirmé">Confirmé</option>
            <option value="non confirmé">Non confirmé</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Enregistrer
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRegistrationModal;
