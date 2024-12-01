'use client';
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaSync } from "react-icons/fa"; 
import Link from 'next/link';  // Import Link from next/link


const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(""); 

  return (
    <div className="w-full md:w-3/4">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8 text-center">
        Créer un compte
      </h1>
      <form className="auth-form space-y-4 md:space-y-6">
        <div className="relative">
          <FaUser className="absolute left-2 top-3 text-white" />
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
            placeholder="Nom"
          />
        </div>
        <div className="relative">
          <FaEnvelope className="absolute left-2 top-3 text-white" />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
            placeholder="Email"
          />
        </div>
        <div className="relative">
          <FaLock className="absolute left-2 top-3 text-white" />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
            placeholder="Mot de passe"
          />
        </div>
        <div className="relative">
          <FaLock className="absolute left-2 top-3 text-white" />
          <input
            type="password"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="peer h-10 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-white pl-10 focus:outline-none focus:border-white"
            placeholder="Confirmer le mot de passe"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

        <button className="w-full py-2 bg-white text-indigo-600 text-lg font-bold uppercase rounded-full hover:bg-gray-200">
          {isLoading ? <FaSync className="animate-spin mx-auto" /> : "Inscription"} 
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
