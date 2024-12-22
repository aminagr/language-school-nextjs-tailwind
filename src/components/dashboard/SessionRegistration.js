"use client";

import { useState, useEffect } from "react";
import { fetchLevelsData, fetchGroupsForLatestSession, fetchLatestSession } from "@/utils";

const SessionRegistration = () => {
  const [levels, setLevels] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [latestSession, setLatestSession] = useState(null);

  useEffect(() => {

    const levelsData = fetchLevelsData();
    const latestSessionData = fetchLatestSession();
    const groupsData = fetchGroupsForLatestSession();

    setLevels(levelsData);
    setGroups(groupsData);
    setLatestSession(latestSessionData);
  }, []);

  const availableGroups = selectedLevel
    ? groups.filter(group => group.level === levels.find(level => level.id === selectedLevel)?.name)
    : [];

  return (
    <div className="p-6 max-w-full sm:max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-center text-2xl font-semibold text-gray-800 mb-4">
        Inscription à la {latestSession?.session_name}
      </h1>

      <p className="text-center text-lg text-gray-600 mb-6">
        Choisissez votre niveau.
      </p>

  
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {levels.map(level => (
          <button
            key={level.id}
            className={`px-6 py-3 rounded-lg transition-colors duration-300 ${
              selectedLevel === level.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400`}
            onClick={() => setSelectedLevel(level.id)}
          >
            {level.name}
          </button>
        ))}
      </div>


      {selectedLevel && availableGroups.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-center mb-4">Choisissez votre groupe :</h2>
          <div className="space-y-4">
            {availableGroups.map((group, index) => (
              <label
                key={index}
                className="block p-3 border rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="group"
                  value={group.group_name}
                  onChange={() => setSelectedGroup(group.group_name)}
                  checked={selectedGroup === group.group_name}
                  className="mr-3"
                />
                <span className="text-lg font-medium">
                  {group.group_name} -{" "}
                  {group.sessions.map(
                    session =>
                      `${session.day} ${session.start_time}-${session.end_time}`
                  ).join(", ")}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}


      {selectedLevel && availableGroups.length === 0 && (
        <div className="text-center mt-6">
          <p className="text-red-600 text-lg">Aucun groupe disponible pour ce niveau.</p>
        </div>
      )}


      {selectedGroup && (
        <div className="mt-6 flex justify-center">
          <button className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-400 transition duration-300">
            S'inscrire
          </button>
        </div>
      )}
    </div>
  );
};

export default SessionRegistration;
