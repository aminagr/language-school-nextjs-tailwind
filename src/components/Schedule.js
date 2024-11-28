'use client';
import { useState } from "react";

export default function Schedule() {
  const [activeTab, setActiveTab] = useState("lundi");


  const scheduleData = [
    { nom_jour: "lundi", creneau_horaire: "08:00 - 10:00", nom_salle: "Salle 1", nom_niveau: "Niveau 1", nom_groupe: "Groupe 1" },
    { nom_jour: "lundi", creneau_horaire: "08:00 - 10:00", nom_salle: "Salle 2", nom_niveau: "Niveau 2", nom_groupe: "Groupe 1" },
    { nom_jour: "lundi", creneau_horaire: "08:00 - 10:00", nom_salle: "Salle 3", nom_niveau: "Niveau 3", nom_groupe: "Groupe 1" },
    { nom_jour: "lundi", creneau_horaire: "10:00 - 12:00", nom_salle: "Salle 1", nom_niveau: "Niveau 1", nom_groupe: "Groupe 2" },
    { nom_jour: "lundi", creneau_horaire: "10:00 - 12:00", nom_salle: "Salle 2", nom_niveau: "Niveau 2", nom_groupe: "Groupe 2" },
    { nom_jour: "mardi", creneau_horaire: "08:00 - 10:00", nom_salle: "Salle 2", nom_niveau: "Niveau 1", nom_groupe: "Groupe 3" },
    { nom_jour: "mardi", creneau_horaire: "10:00 - 12:00", nom_salle: "Salle 3", nom_niveau: "Niveau 3", nom_groupe: "Groupe 2" },
    { nom_jour: "mercredi", creneau_horaire: "08:00 - 10:00", nom_salle: "Salle 1", nom_niveau: "Niveau 1", nom_groupe: "Groupe F" },
    { nom_jour: "mercredi", creneau_horaire: "10:00 - 12:00", nom_salle: "Salle 3", nom_niveau: "Niveau 3", nom_groupe: "Groupe 2" },

  ];

  const groupedData = scheduleData.reduce((acc, item) => {
    const { nom_jour, creneau_horaire, nom_salle, nom_niveau, nom_groupe } = item;

    if (!acc[nom_jour]) acc[nom_jour] = [];

    let scheduleRow = acc[nom_jour].find(row => row.creneau_horaire === creneau_horaire);
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

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-8 md:px-10 lg:px-32 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Emploi du Temps</h2>

        <div className="flex justify-center mb-6">
          <div className="flex space-x-4">
            {["lundi", "mardi", "mercredi", "jeudi", "samedi"].map((day) => (
              <button
                key={day}
                onClick={() => setActiveTab(day)}
                className={`px-6 py-2 text-lg font-medium ${activeTab === day ? "bg-custom-blue text-white" : "bg-gray-200 text-gray-600"} rounded-lg transition duration-300`}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-lg font-semibold text-gray-700">Horaire</th>
                {["Salle 1", "Salle 2", "Salle 3"].map((salle, index) => (
                  <th key={index} className="px-4 py-2 border-b text-lg font-semibold text-gray-700">{salle}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groupedData[activeTab]?.map((schedule, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b text-gray-600">{schedule.creneau_horaire}</td>
                  {["Salle 1", "Salle 2", "Salle 3"].map((salle, index) => (
                    <td key={index} className="px-4 py-2 border-b text-gray-600">
                      {schedule.salles[salle]?.map((group, idx) => (
                        <div key={idx}>
                          {group.groupe} ({group.niveau})
                        </div>
                      ))}
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
