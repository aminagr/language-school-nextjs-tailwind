"use client";
import { FaCalendarCheck } from "react-icons/fa";

const PastSessions = ({ pastSessions }) => {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Sessions Passées</h2>

      {pastSessions.length > 0 ? (
        <ul className="space-y-4">
          {pastSessions.map((session) => (
            <li key={session.id} className="border-b py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FaCalendarCheck className="mr-3 text-blue-600" />
                  <span className="text-lg font-medium">{session.name}</span>
                </div>
                <span className="text-gray-600">
                  {session.startDate} - {session.endDate}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-lg text-gray-600">
          Aucune session passée.
        </div>
      )}
    </div>
  );
};

export default PastSessions;
