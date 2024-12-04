"use client";

import { getStudentData } from "@/utils/api";
import { FaUserEdit, FaLock, FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import EditInfoModal from "@/components/dashboard/EditInfoModal";
import EditPasswordModal from "@/components/dashboard/EditPasswordModal";

const MyAccount = () => {
  const studentData = getStudentData();
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center py-12 px-6">
      {/* Header */}
      <div className="bg-indigo-600 text-white py-8 px-6 rounded-lg shadow-lg w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-2">
          Bienvenue, {studentData.firstName}
        </h1>
       
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-lg mt-8 p-8 w-full max-w-4xl">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg mb-6 md:mb-0 md:mr-6">
            <FaUserAlt className="text-5xl text-white" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {studentData.firstName} {studentData.lastName}
            </h2>
            <p className="text-gray-500">{studentData.email}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <InfoItem label="Nom" value={studentData.lastName} />
          <InfoItem label="Prénom" value={studentData.firstName} />
          <InfoItem label="Date de naissance" value={studentData.birthDate} />
          <InfoItem label="Lieu de naissance" value={studentData.birthPlace} />
          <InfoItem label="Adresse" value={studentData.address} />
          <InfoItem label="Téléphone" value={studentData.phone} />
          <InfoItem label="Type d'utilisateur" value={studentData.userType} />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <ActionButton
            label="Modifier les Infos"
            icon={FaUserEdit}
            color="bg-indigo-500"
            hoverColor="bg-indigo-600"
            onClick={() => setIsEditingInfo(true)}
          />
          <ActionButton
            label="Changer le mot de passe"
            icon={FaLock}
            color="bg-red-500"
            hoverColor="bg-red-600"
            onClick={() => setIsEditingPassword(true)}
          />
        </div>
      </div>

      {/* Modals */}
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

// Helper Component for Info
const InfoItem = ({ label, value }) => (
  <div>
    <span className="text-sm text-gray-500">{label} :</span>
    <p className="text-gray-800 font-medium">{value}</p>
  </div>
);

// Helper Component for Buttons
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
