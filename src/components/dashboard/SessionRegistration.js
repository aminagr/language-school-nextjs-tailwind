"use client";

import { useState } from "react";

const SessionRegistration = ({ groups }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [waitlist, setWaitlist] = useState(false);

  const checkGroupAvailability = (group) => {
    return group.students < 30; 
  };

  const handleWaitlist = () => {
    setWaitlist(true);
  };


  const availableGroups = selectedLevel
    ? groups[selectedLevel].filter(checkGroupAvailability)
    : [];

  return (
    <div className="p-6 max-w-full sm:max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <p className="text-center text-xl text-gray-700 mb-6">Les inscriptions sont ouvertes. Choisissez votre niveau :</p>


      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {["Débutant", "Intermédiaire", "Avancé"].map((level, index) => (
          <button
            key={index}
            className={`px-6 py-3 rounded-lg transition-colors duration-300 ${
              selectedLevel === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-blue-400`}
            onClick={() => setSelectedLevel(index + 1)}
          >
            {level}
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
                  value={group.name}
                  onChange={() => setSelectedGroup(group.name)}
                  checked={selectedGroup === group.name}
                  className="mr-3"
                />
                <span className="text-lg font-medium">{group.name} - {group.time}</span>
              </label>
            ))}
          </div>
        </div>
      )}

   
      {selectedLevel && availableGroups.length === 0 && !waitlist && (
        <div className="text-center mt-6">
          <p className="text-red-600 text-lg">
            Aucun groupe n'est disponible. Voulez-vous être ajouté à la liste d'attente ?
          </p>
          <button
            onClick={handleWaitlist}
            className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition duration-300"
          >
            Ajouter à la liste d'attente
          </button>
        </div>
      )}

     
      {selectedGroup && !waitlist && (
        <div className="mt-6 flex justify-center">
          <button className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-400 transition duration-300">
            S'inscrire
          </button>
        </div>
      )}


      {waitlist && (
        <div className="text-center mt-6">
          <p className="text-green-600 text-lg">
            Vous avez été ajouté à la liste d'attente pour ce niveau. Vous serez notifié par mail si un nouveau groupe est créé.
          </p>
        </div>
      )}
    </div>
  );
};

export default SessionRegistration;
