"use client";
import { useState, useEffect } from "react";
import { fetchStudentById, fetchSessionsData } from "@/utils";
import SessionRegistration from "@/components/dashboard/SessionRegistration";
import { FaSpinner, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const SessionsPage = () => {
  const [studentData, setStudentData] = useState(null);
  const [sessionsData, setSessionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registrationOpen, setRegistrationOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
    
      const student = await fetchStudentById(1);
      setStudentData(student);

    
      const sessions = await fetchSessionsData();
      setSessionsData(sessions);


      const now = new Date();
      const isRegistrationOpen = sessions.some(
        (session) =>
          new Date(session.registration_start_date) <= now &&
          now <= new Date(session.registration_end_date)
      );
      setRegistrationOpen(isRegistrationOpen);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <FaSpinner className="animate-spin text-gray-600 text-4xl" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Section: Inscription à une session */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" /> Inscription à une Session
        </h1>
        {registrationOpen ? (
          <SessionRegistration />
        ) : (
          <p className="text-gray-500 italic">
            Aucune session n'est actuellement disponible pour l'inscription.
          </p>
        )}
      </div>

      {/* Section: Sessions passées */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaCheckCircle className="text-green-500" /> Mes Sessions Passées
        </h2>

        {studentData && studentData.groups.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-white">
                  <th className="border border-gray-300 px-4 py-2">Session</th>
                  <th className="border border-gray-300 px-4 py-2">Niveau</th>
                  <th className="border border-gray-300 px-4 py-2">Groupe</th>
                  <th className="border border-gray-300 px-4 py-2">État</th>
                </tr>
              </thead>
              <tbody>
                {studentData.groups.map((group, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{group.session_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{group.level_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{group.group_name}</td>
                    <td className="border border-gray-300 px-4 py-2 flex items-center gap-2">
                      {group.confirmed ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : (
                        <FaTimesCircle className="text-red-500" />
                      )}
                      {group.confirmed ? "Confirmé" : "Non confirmé"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 italic">Aucune donnée disponible pour cet étudiant.</p>
        )}
      </div>
    </div>
  );
};

export default SessionsPage;
