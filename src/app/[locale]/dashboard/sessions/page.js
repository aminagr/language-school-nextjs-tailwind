"use client";

import { useState, useEffect } from "react";
import { getSessionData, getPastSessions, getStudentData } from "@/utils/api";
import SessionRegistration from "@/components/dashboard/SessionRegistration";
import { FaSpinner } from "react-icons/fa";

const SessionsPage = () => {
  const [sessionData, setSessionData] = useState(null);
  const [pastSessions, setPastSessions] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setSessionData(getSessionData());
      setPastSessions(getPastSessions());
      setStudentData(getStudentData());
      setIsLoading(false);
    }, 1000); // Simulation d'une attente de 1 seconde
  }, []);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <FaSpinner className="text-red-500 animate-spin text-4xl" />
      </div>
    );

  const userRegisteredSessions = studentData?.registeredSessions || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        {/* Section Inscription */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-red-600 text-center">Inscription à une session</h1>
          {!sessionData.isRegistrationOpen ? (
            <p className="text-center text-lg text-gray-700">
              Aucune session n'est actuellement disponible.
            </p>
          ) : (
            <SessionRegistration groups={sessionData.groups} />
          )}
        </div>

        {/* Section Sessions Passées */}
        {pastSessions.length > 0 && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-red-600 text-center">Sessions Passées</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Session</th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Date</th>
                    <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {pastSessions.map((session) => {
                    if (userRegisteredSessions.includes(session.id)) {
                      return (
                        <tr
                          key={session.id}
                          className="border-b transition-all hover:bg-gray-100"
                        >
                          <td className="py-3 px-6 text-sm text-gray-700">{session.title}</td>
                          <td className="py-3 px-6 text-sm text-gray-700">{session.date}</td>
                          <td className="py-3 px-6 text-sm text-gray-700">{session.description}</td>
                        </tr>
                      );
                    }
                    return null;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionsPage;
