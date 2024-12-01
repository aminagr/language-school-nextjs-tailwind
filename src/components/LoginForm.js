'use client';

import { useState } from "react";
import { useLocale } from "next-intl";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import Link from 'next/link';

const LoginForm = () => {
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="w-3/4">
      <h1 className="text-4xl font-bold text-custom-blue mb-8 text-center">Bienvenue !</h1>
      <form className="login-form space-y-4">
        <div className="relative">
          <FaEnvelope className="absolute left-2 top-3 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer h-12 w-full bg-transparent border-b-2 border-gray-400 text-black placeholder-gray-500 pl-10 focus:outline-none focus:border-white"
            placeholder="Email"
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-2 top-3 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer h-12 w-full bg-transparent border-b-2 border-gray-400 text-black placeholder-gray-500 pl-10 focus:outline-none focus:border-white"
            placeholder="Mot de passe"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-3 text-gray-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="w-4 h-4 text-indigo-600 bg-gray-800 border-gray-500 rounded focus:ring-indigo-500 focus:ring-2"
          />
          <label className="ml-2 text-gray-700 text-sm">Se rappeler de moi</label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          className="w-full py-2 bg-custom-blue text-white text-lg font-bold uppercase rounded-full hover:bg-custom-blue-dark"
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Connexion"}
        </button>
      </form>

      <Link href={`/${locale}/forgot-password`} className="block text-center text-sm text-gray-700 mt-4 hover:underline">
        Mot de passe oublié ?
      </Link>
    </div>
  );
};

export default LoginForm;
