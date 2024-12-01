'use client';

import { useLocale } from "next-intl";
import Link from 'next/link';

const ResetPasswordPage = () => {
  const locale = useLocale();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-center">
          Réinitialiser votre mot de passe
        </h1>
        <form className="space-y-6">
          <div className="relative">
            <input
              type="password"
              className="peer h-12 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              placeholder="Nouveau mot de passe"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              className="peer h-12 w-full bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              placeholder="Confirmer le mot de passe"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white text-lg font-medium uppercase rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Réinitialiser le mot de passe
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link href={`/${locale}/connexion`}>
            <button className="w-full py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700">
              Retour à la connexion
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
