"use client";

import { useState, useEffect } from "react";
import { fetchSessionsData } from "@/utils"; 
import SessionRegistration from "@/components/dashboard/SessionRegistration";
import { FaSpinner } from "react-icons/fa"; 

const RegisterPage = () => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const sessions = fetchSessionsData(); 
      setSessionData(sessions);
    };

    fetchData();
  }, []);

  if (!sessionData) return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <FaSpinner className="animate-spin text-gray-600" size={50} />
    </div>
  );


  const openSession = sessionData.find((session) => {
    const today = new Date();
    const registrationStartDate = new Date(session.registration_start_date);
    const registrationEndDate = new Date(session.registration_end_date);
    return today >= registrationStartDate && today <= registrationEndDate;
  });

  if (!openSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6 sm:px-12">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
          <h1 className="text-2xl font-bold mb-4 text-center">Les inscriptions sont actuellement fermées.</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6 sm:px-12">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Inscription à une session</h1>
        <h2 className="text-xl font-semibold mb-4 text-center">{openSession.session_name}</h2>
        <SessionRegistration groups={openSession.groups} />
      </div>
    </div>
  );
};

export default RegisterPage;
