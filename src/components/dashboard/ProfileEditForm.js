"use client";
import { useState } from "react";

const ProfileEditForm = ({ studentData }) => {
  const [formData, setFormData] = useState({
    firstName: studentData.firstName,
    lastName: studentData.lastName,
    email: studentData.email,
    function: studentData.function,
    specialty: studentData.specialty,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to update student profile (e.g., API call)
    console.log("Profile updated", formData);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Modifier votre Profil</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-center">
          <label className="text-lg">Prénom :</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="py-2 px-4 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="text-lg">Nom :</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="py-2 px-4 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="text-lg">Email :</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="py-2 px-4 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="text-lg">Fonction :</label>
          <input
            type="text"
            name="function"
            value={formData.function}
            onChange={handleChange}
            className="py-2 px-4 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="text-lg">Spécialité :</label>
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="py-2 px-4 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all"
        >
          Mettre à jour le profil
        </button>
      </form>
    </div>
  );
};

export default ProfileEditForm;
