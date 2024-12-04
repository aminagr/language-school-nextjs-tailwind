"use client";

import { useState, useEffect } from "react";
import { getSessionData, getStudentData } from "@/utils/api";
import Link from "next/link";
import { useLocale } from "next-intl";
import { FaSpinner } from "react-icons/fa"; // Import du spinner de react-icons

const DashboardPage = () => {
  const [sessionData, setSessionData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const locale = useLocale();
  
  useEffect(() => {
    const fetchData = async () => {
      const session = await getSessionData();
      const student = await getStudentData();
      setSessionData(session);
      setStudentData(student);
    };

    fetchData();
  }, []);

  if (!sessionData || !studentData) return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <FaSpinner className="animate-spin text-gray-600" size={50} />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-100 text-indigo-600 p-6 shadow-md">
        <h1 className="text-2xl font-bold text-center">Bienvenue sur votre Dashboard</h1>
      </header>

      <div className="py-12 px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href={`/${locale}/dashboard/register`} className="bg-white hover:bg-gray-50 text-gray-800 rounded-lg p-6 flex flex-col justify-between h-full border border-gray-300">
          <h2 className="text-xl font-semibold mb-4">Inscriptions</h2>
          <p className="text-lg mb-4">Gérez vos inscriptions à des sessions et groupes de formation.</p>
          {sessionData.isRegistrationOpen ? (
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg mt-4 font-semibold hover:bg-gray-700">
              S'inscrire à une session
            </button>
          ) : (
            <p className="text-sm text-red-300 mt-4">Les inscriptions sont fermées actuellement.</p>
          )}
        </Link>

        <Link
  href={`/${locale}/dashboard/notifications`}
  className="bg-white hover:bg-gray-50 text-gray-800 rounded-lg p-6 flex flex-col justify-between h-full border border-gray-300"
>
  <h2 className="text-xl font-semibold mb-4">Notifications</h2>
  <p className="text-lg mb-4">Consultez toutes vos notifications récentes.</p>
  <div className="text-center mt-4">
    <span className="bg-gray-800 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300">
      Voir toutes les notifications
    </span>
  </div>
</Link>

<Link
  href={`/${locale}/dashboard/my-account`}
  className="bg-white hover:bg-gray-50 text-gray-800 rounded-lg p-6 flex flex-col justify-between h-full border border-gray-300"
>
  <h2 className="text-xl font-semibold mb-4">Mes Informations</h2>
  <p className="text-lg mb-4">Accédez et modifiez vos informations personnelles.</p>
  <div className="text-center mt-4">
    <span className="bg-gray-800 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300">
      Voir mes infos
    </span>
  </div>
</Link>

      </div>
    </div>
  );
};

export default DashboardPage;
