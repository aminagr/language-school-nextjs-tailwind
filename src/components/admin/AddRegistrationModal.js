import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { fetchStudentsData, fetchSessionsData, fetchLevelsData, fetchGroups } from '@/utils';

const AddRegistrationModal = ({ onClose, onSave }) => {
  const [matricule, setMatricule] = useState('');
  const [session, setSession] = useState('');
  const [niveau, setNiveau] = useState('');
  const [groupe, setGroupe] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [confirme, setConfirme] = useState(false); 
  const [students, setStudents] = useState([]);
  const [sessionsData, setSessionsData] = useState([]);
  const [levelsData, setLevelsData] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [filteredMatricules, setFilteredMatricules] = useState([]);

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
      setNiveau(levels[0]?.id || '');
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (niveau && session) {
      const filtered = groupsData.filter(
        (grp) =>
          grp.level === levelsData.find((lvl) => lvl.id === parseInt(niveau))?.name &&
          grp.session_name === session
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

      const newRegistration = {
        matricule,
        session,
        niveau: niveauName,
        groupe: groupeName,
        nom_prenom: fullName,
        date,
        confirme, 
      };

      onSave(newRegistration);
      onClose();
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  const handleMatriculeChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setMatricule(e.target.value);
  
  
    const filtered = students.filter((student) => 
      student.matricule.toLowerCase().includes(searchTerm) ||
      student.nom.toLowerCase().includes(searchTerm) ||
      student.prenom.toLowerCase().includes(searchTerm)
    );
  
    setFilteredMatricules(filtered);
  };
  

  const handleMatriculeSelect = (selectedMatricule) => {
    setMatricule(selectedMatricule);
    setFilteredMatricules([]);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Ajouter une inscription</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

  
        <div className="mb-4 relative">
          <input
            type="text"
            value={matricule}
            onChange={handleMatriculeChange}
            placeholder="Matricule"
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
          {matricule && filteredMatricules.length > 0 && (
            <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {filteredMatricules.map((student) => (
                <div
                  key={student.matricule}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleMatriculeSelect(student.matricule)}
                >
                  {student.matricule} - {student.nom} {student.prenom}
                </div>
              ))}
            </div>
          )}
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
            {levelsData.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>
                {lvl.name}
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
            {filteredGroups.map((grp) => (
              <option key={grp.id} value={grp.id}>
                {grp.group_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>

     
        <div className="mb-4">
          <label className="block text-sm">État</label>
          <select
            value={confirme ? 'confirmé' : 'non confirmé'}
            onChange={(e) => setConfirme(e.target.value === 'confirmé')}
            className="p-2 border border-gray-300 rounded-lg w-full"
          >
            <option value="non confirmé">Non confirmé</option>
            <option value="confirmé">Confirmé</option>
          </select>
        </div>

        <div className="flex justify-between">
  <button
    onClick={handleSave}
    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
  >
    <FaCheck className="mr-2" />
    Enregistrer
  </button>
  <button
    onClick={onClose}
    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex items-center"
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
