import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { fetchStudentsData, fetchSessionsData, fetchLevelsData, fetchGroups } from '@/utils';

const AddRegistrationModal = ({ onClose, onSave }) => {
  const [matricule, setMatricule] = useState('');
  const [session, setSession] = useState('');
  const [level, setLevel] = useState('');
  const [group, setGroup] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [state, setState] = useState('non confirmé');
  const [students, setStudents] = useState([]);
  const [sessionsData, setSessionsData] = useState([]);
  const [levelsData, setLevelsData] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const studentsData = await fetchStudentsData();
      const sessions = await fetchSessionsData();
      const levels = await fetchLevelsData();
      const groups = await fetchGroups();

      setStudents(studentsData);
      setSessionsData(sessions);
      setLevelsData(levels);
      setGroupsData(groups);

      setSession(sessions[sessions.length - 1]?.session_name || '');
      setLevel(levels[0]?.id || '');
    };

    fetchData();
  }, []);

  // Mettre à jour les groupes filtrés à chaque changement de niveau ou session
  useEffect(() => {
    if (level && session) {
      const filtered = groupsData.filter(
        (grp) => grp.level === levelsData.find((lvl) => lvl.id === parseInt(level))?.name &&
                 grp.session_name === session
      );
      setFilteredGroups(filtered);
    } else {
      setFilteredGroups([]);
    }
  }, [level, session, groupsData, levelsData]);

  const handleSave = () => {
    if (matricule && session && level && group) {
      const newRegistration = {
        matricule,
        session,
        level,
        group,
        date,
        state,
      };
      onSave(newRegistration);
      onClose();
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  const handleMatriculeChange = (e) => {
    setMatricule(e.target.value);
    setShowDropdown(e.target.value !== ''); // Affiche la liste uniquement si le champ n'est pas vide
  };

  const handleMatriculeSelect = (selectedMatricule) => {
    setMatricule(selectedMatricule);
    setShowDropdown(false); // Ferme la liste après sélection
  };

  const filteredMatricules = students.filter((student) =>
    student.matricule.toLowerCase().includes(matricule.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Ajouter une inscription</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        {/* Champ de matricule avec auto-complétion */}
        <div className="mb-4 relative">
          <input
            type="text"
            value={matricule}
            onChange={handleMatriculeChange}
            placeholder="Matricule"
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
          {showDropdown && (
            <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {filteredMatricules.length > 0 ? (
                filteredMatricules.map((student) => (
                  <div
                    key={student.matricule}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMatriculeSelect(student.matricule)}
                  >
                    {student.matricule} - {student.nom_prenom}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">Aucun matricule correspondant</div>
              )}
            </div>
          )}
        </div>

        {/* Session */}
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

        {/* Niveau */}
        <div className="mb-4">
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          >
            <option value="">Sélectionner un niveau</option>
            {levelsData.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>
                {lvl.name}
              </option>
            ))}
          </select>
        </div>

        {/* Groupe */}
        <div className="mb-4">
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          >
            <option value="">Sélectionner un groupe</option>
            {filteredGroups.length > 0 ? (
              filteredGroups.map((grp) => (
                <option key={grp.id} value={grp.id}>
                  {grp.group_name}
                </option>
              ))
            ) : (
              <option value="">Aucun groupe trouvé</option>
            )}
          </select>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-sm">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>

        {/* État */}
        <div className="mb-4">
          <label className="block text-sm">État</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          >
            <option value="non confirmé">Non confirmé</option>
            <option value="confirmé">Confirmé</option>
          </select>
        </div>

        {/* Boutons */}
        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <FaCheck className="mr-2" />
            Enregistrer
          </button>
          <button
            onClick={onClose}
            className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            <FaTimes className="mr-2" />
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRegistrationModal;
