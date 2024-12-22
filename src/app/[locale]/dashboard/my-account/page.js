"use client";

import { fetchStudentById } from "@/utils/index";  // Remplacer l'importation
import { FaUserEdit, FaLock, FaUserAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import EditInfoModal from "@/components/dashboard/EditInfoModal";
import EditPasswordModal from "@/components/dashboard/EditPasswordModal";

const MyAccount = () => {
  const [studentData, setStudentData] = useState(null);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStudentData = async () => {
      try {
        const data = await fetchStudentById(1);  // Remplacer l'ID selon le besoin
        setStudentData(data);
      } catch (error) {
        setError("Une erreur s'est produite lors du chargement des données.");
      } finally {
        setIsLoading(false);
      }
    };

    getStudentData();
  }, []);  // L'effet s'exécute une fois après le premier rendu

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center py-12 px-6">
      <div className="bg-white shadow-lg rounded-lg mt-8 p-8 w-full max-w-4xl">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg mb-6 md:mb-0 md:mr-6">
            <FaUserAlt className="text-5xl text-white" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {studentData.prenom} {studentData.nom}
            </h2>
            <p className="text-gray-500">{studentData.mail}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <InfoItem label="Nom" value={studentData.nom} />
          <InfoItem label="Prénom" value={studentData.prenom} />
          <InfoItem label="Date de naissance" value={studentData.date_naissance} />
          <InfoItem label="Lieu de naissance" value={studentData.lieu_naissance} />
          <InfoItem label="Adresse" value={studentData.adresse} />
          <InfoItem label="Téléphone" value={studentData.telephone} />
          <InfoItem label="Type d'utilisateur" value={studentData.type} />
        </div>

        <div className="flex flex-col md:flex-row justify-center mt-8 gap-6 md:gap-8">
          <ActionButton
            label="Modifier les Infos"
            icon={FaUserEdit}
            color="bg-indigo-600"
            hoverColor="bg-indigo-700"
            onClick={() => setIsEditingInfo(true)}
            className="w-full md:w-auto flex items-center justify-center py-3 px-6 rounded-lg text-white shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          />
          <ActionButton
            label="Changer le mot de passe"
            icon={FaLock}
            color="bg-red-600"
            hoverColor="bg-red-700"
            onClick={() => setIsEditingPassword(true)}
            className="w-full md:w-auto flex items-center justify-center py-3 px-6 rounded-lg text-white shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          />
        </div>
      </div>

      {isEditingInfo && (
        <EditInfoModal
          onClose={() => setIsEditingInfo(false)}
          studentData={studentData}
        />
      )}
      {isEditingPassword && (
        <EditPasswordModal onClose={() => setIsEditingPassword(false)} />
      )}
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <span className="text-sm text-gray-500">{label} :</span>
    <p className="text-gray-800 font-medium">{value}</p>
  </div>
);

const ActionButton = ({ label, icon: Icon, color, hoverColor, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center px-4 py-3 w-full sm:w-auto text-white rounded-lg ${color} hover:${hoverColor} transition duration-200`}
  >
    <Icon className="mr-2" />
    {label}
  </button>
);

export default MyAccount;
