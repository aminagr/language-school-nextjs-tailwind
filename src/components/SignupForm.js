"use client";

import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaSync,
} from "react-icons/fa";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    birthDate: "",
    birthPlace: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
    userType: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    const {
      lastName,
      firstName,
      birthDate,
      birthPlace,
      address,
      email,
      phone,
      password,
      passwordConfirmation,
      userType,
    } = formData;

    if (
      !lastName ||
      !firstName ||
      !birthDate ||
      !birthPlace ||
      !address ||
      !email ||
      !phone ||
      !password ||
      !passwordConfirmation ||
      !userType
    ) {
      setError("Tous les champs sont obligatoires.");
      return false;
    }

    if (!emailRegex.test(email)) {
      setError("Veuillez entrer une adresse email valide.");
      return false;
    }

    if (!phoneRegex.test(phone)) {
      setError("Veuillez entrer un numéro de téléphone valide (10 chiffres).");
      return false;
    }

    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Inscription réussie !");
      setFormData({
        lastName: "",
        firstName: "",
        birthDate: "",
        birthPlace: "",
        address: "",
        email: "",
        phone: "",
        password: "",
        passwordConfirmation: "",
        userType: "",
      });
    }, 2000);
  };

  return (
    <div className="w-full md:w-3/4 overflow-x-scroll">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8 text-center">
        Créer un compte
      </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        {[
          { name: "lastName", label: "Nom", icon: FaUser },
          { name: "firstName", label: "Prénom", icon: FaUser },
          { name: "birthDate", label: "Date de naissance", icon: FaCalendarAlt, type: "date" },
          { name: "birthPlace", label: "Lieu de naissance", icon: FaMapMarkerAlt },
          { name: "address", label: "Adresse", icon: FaMapMarkerAlt },
          { name: "email", label: "Email", icon: FaEnvelope, type: "email" },
          { name: "phone", label: "Téléphone", icon: FaPhone, type: "tel" },
        ].map(({ name, label, icon: Icon, type = "text" }) => (
          <div key={name}>
            <label htmlFor={name} className="text-white text-sm font-medium block mb-1">
              {label}
            </label>
            <div className="relative">
              <Icon className="absolute left-2 top-3 text-white" />
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray pl-10 focus:outline-none focus:border-white"
                placeholder={label}
              />
            </div>
          </div>
        ))}

        <div>
          <span className="text-white text-sm font-medium block mb-2">
            Vous êtes :
          </span>
          <div className="flex space-x-4">
            {["Étudiant", "Fonctionnaire", "Externe"].map((type) => (
              <label key={type} className="flex items-center space-x-2 text-white">
                <input
                  type="radio"
                  name="userType"
                  value={type}
                  checked={formData.userType === type}
                  onChange={handleChange}
                  className="accent-indigo-600"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {[{ name: "password", label: "Mot de passe", icon: FaLock },
          { name: "passwordConfirmation", label: "Confirmer le mot de passe", icon: FaLock }].map(({ name, label, icon: Icon }) => (
          <div key={name}>
            <label htmlFor={name} className="text-white text-sm font-medium block mb-1">
              {label}
            </label>
            <div className="relative">
              <Icon className="absolute left-2 top-3 text-white" />
              <input
                type="password"
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
                placeholder={label}
              />
            </div>
          </div>
        ))}

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-white text-indigo-600 text-lg font-bold uppercase rounded-full hover:bg-gray-200"
        >
          {isLoading ? <FaSync className="animate-spin mx-auto" /> : "Inscription"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
