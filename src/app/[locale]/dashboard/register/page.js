// src/app/register/page.js
"use client";
import { useState, useEffect } from "react";
import { getSessionData } from "@/utils/api";
import SessionRegistration from "@/components/dashboard/SessionRegistration";

const RegisterPage = () => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const data = getSessionData();
    setSessionData(data);
  }, []);

  if (!sessionData) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6 sm:px-12">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Inscription à une session</h1>
        {!sessionData.isRegistrationOpen ? (
          <p className="text-center text-lg text-red-600">Aucune session n'est actuellement disponible.</p>
        ) : (
          <SessionRegistration groups={sessionData.groups} />
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
