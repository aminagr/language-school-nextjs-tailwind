'use client'; 
import { useState, useEffect } from 'react';
import { fetchGroups, fetchSessionsData } from '@/utils';

export default function Schedule() {
  const [activeTab, setActiveTab] = useState('lundi');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [scheduleData, setScheduleData] = useState([]);
  const [levels, setLevels] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const groups = fetchGroups();
    const latestSession = getLatestSession();
    const filteredGroups = filterGroupsBySession(groups, latestSession.session_name);
    const formattedSchedule = formatScheduleData(filteredGroups);
    setScheduleData(formattedSchedule);

    const uniqueLevels = [...new Set(groups.map((group) => group.level))].sort();

    setLevels(uniqueLevels);


    const uniqueDays = [...new Set(groups.flatMap(group => group.sessions.map(session => session.day.toLowerCase())))];
    setDays(uniqueDays);
  }, []);

  const getLatestSession = () => {
    const sessions = fetchSessionsData();
    return sessions.sort((a, b) => new Date(b.start_date) - new Date(a.start_date))[0];
  };

  const filterGroupsBySession = (groups, sessionName) => {
    return groups.filter((group) => group.session_name === sessionName);
  };

  const formatScheduleData = (groups) => {
    const formattedData = [];
    groups.forEach((group) => {
      group.sessions.forEach((session) => {
        const { day, start_time, end_time, room_name } = session;
        formattedData.push({
          nom_jour: day.toLowerCase(),
          creneau_horaire: `${start_time} - ${end_time}`,
          nom_salle: room_name,
          nom_niveau: group.level,
          nom_groupe: group.group_name,
        });
      });
    });
    return formattedData;
  };

  const filteredScheduleData = selectedLevel
    ? scheduleData.filter((item) => item.nom_niveau === selectedLevel)
    : scheduleData;

  const groupedData = filteredScheduleData.reduce((acc, item) => {
    const { nom_jour, creneau_horaire, nom_salle, nom_niveau, nom_groupe } = item;

    if (!acc[nom_jour]) acc[nom_jour] = [];

    let scheduleRow = acc[nom_jour].find((row) => row.creneau_horaire === creneau_horaire);
    if (!scheduleRow) {
      scheduleRow = { creneau_horaire, salles: {} };
      acc[nom_jour].push(scheduleRow);
    }

    if (!scheduleRow.salles[nom_salle]) {
      scheduleRow.salles[nom_salle] = [];
    }

    scheduleRow.salles[nom_salle].push({ groupe: nom_groupe, niveau: nom_niveau });

    return acc;
  }, {});

  const allRoomsForActiveTab = Array.from(
    new Set(
      groupedData[activeTab]?.flatMap((schedule) => Object.keys(schedule.salles)) || []
    )
  );

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-8 md:px-10 lg:px-32 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Emploi du Temps</h2>

        <div className="flex flex-wrap justify-center mb-6 space-x-2 sm:space-x-4">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveTab(day)}
              className={`w-full sm:w-auto px-6 py-2 text-lg font-medium ${activeTab === day ? 'bg-custom-blue text-white' : 'bg-gray-200 text-gray-600'} rounded-lg transition duration-300 mb-2 sm:mb-0`}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-6">
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white text-gray-700"
          >
            <option value="">Tous les niveaux</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-lg font-semibold text-gray-700">Horaire</th>
                {allRoomsForActiveTab.map((room) => (
                  <th key={room} className="px-4 py-2 border-b text-lg font-semibold text-gray-700">{room}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groupedData[activeTab]?.map((schedule) => (
                <tr key={schedule.creneau_horaire}>
                  <td className="px-4 py-2 border-b text-gray-600">{schedule.creneau_horaire}</td>
                  {allRoomsForActiveTab.map((room) => (
                    <td key={room} className="px-4 py-2 border-b text-gray-600">
                      {schedule.salles[room]?.map((group, idx) => (
                        <div key={idx}>{group.groupe} ({group.niveau})</div>
                      )) || '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
