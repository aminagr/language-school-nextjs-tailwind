"use client";
"use client";

import { useState, useEffect } from "react";
import { fetchSessionsData, fetchStudentById } from  "@/utils"; 
import Link from "next/link";
import { useLocale } from "next-intl";
import { FaSpinner } from "react-icons/fa"; 
import Schedule from "@/components/dashboard/Schedule"; 

const DashboardPage = () => {
  const [sessionData, setSessionData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const locale = useLocale();
  
  useEffect(() => {
    const fetchData = async () => {
    
      const sessions = fetchSessionsData();
      const student = fetchStudentById(1); 
      setSessionData(sessions);
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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white p-6 shadow-md">
        <h1 className="text-3xl font-extrabold text-center">Bienvenue, {studentData.nom} {studentData.prenom}!</h1> 
      </header>

      <div className="py-12 px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link href={`/${locale}/dashboard/register`} className="bg-white hover:bg-gray-50 text-gray-800 rounded-xl p-6 flex flex-col justify-between h-full border border-gray-300 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-xl font-semibold mb-4">Inscriptions</h2>
          <p className="text-lg mb-4">Gérez vos inscriptions à des sessions et groupes de formation.</p>
          {sessionData.some(session => {
            const today = new Date();
            const startDate = new Date(session.registration_start_date);
            const endDate = new Date(session.registration_end_date);
            return today >= startDate && today <= endDate;
          }) ? (
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg mt-4 font-semibold hover:bg-indigo-700 transition-colors duration-300">
              S'inscrire à une session
            </button>
          ) : (
            <p className="text-sm text-red-300 mt-4">Les inscriptions sont fermées actuellement.</p>
          )}
        </Link>

        <Link href={`/${locale}/dashboard/my-account`} className="bg-white hover:bg-gray-50 text-gray-800 rounded-xl p-6 flex flex-col justify-between h-full border border-gray-300 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-xl font-semibold mb-4">Mes Informations</h2>
          <p className="text-lg mb-4">Accédez et modifiez vos informations personnelles.</p>
          <div className="text-center mt-4">
            <span className="bg-gray-800 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300">
              Voir mes infos
            </span>
          </div>
        </Link>
      </div>

      <div className="py-12 px-6 sm:px-12">
        <Schedule />
      </div>
    </div>
  );
};

export default DashboardPage;
