"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { FaUser, FaHome, FaInfoCircle, FaPhoneAlt, FaSignInAlt } from "react-icons/fa";

export default function Navbar() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => (pathname === path ? "text-custom-blue" : "text-gray-700");

  const closeMenu = () => {
    if (window.innerWidth <= 1024) {  
      setMenuOpen(false);
    }
  };

  return (
    <nav className="relative bg-transparent py-6 z-20">
      <div className="absolute inset-0 bg-white"></div>

      <div className="relative container mx-auto px-6 lg:px-32 flex justify-between items-center text-gray-700">
        <div className="text-2xl font-extrabold">
          <Link href={`/${locale}/`} className="text-custom-red">
            <span className="text-custom-blue">My </span>
            <span className="text-custom-red">Russian</span>
          </Link>
        </div>

        <div className="hidden md:flex gap-8">
          <Link
            href={`/${locale}/`}
            className={`text-lg hover:text-custom-blue transition ${isActive("/")}`}
          >
            Accueil
          </Link>

          <Link
            href={`/${locale}/about`}
            className={`text-lg hover:text-custom-blue transition ${isActive("/about")}`}
          >
            A propos
          </Link>

          <Link
            href={`/${locale}/contact`}
            className={`text-lg hover:text-custom-blue transition ${isActive("/contact")}`}
          >
            Contact
          </Link>

          <Link
            href={`/${locale}/inscription`}
            className={`text-lg hover:text-custom-blue transition ${isActive("/inscription")}`}
          >
            Inscription
          </Link>

          <Link
            href={`/${locale}/connexion`}
            className={`text-lg hover:text-custom-blue transition ${isActive("/connexion")}`}
          >
            Connexion
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!isMenuOpen)}
          className="md:hidden text-2xl text-custom-blue"
        >
          {isMenuOpen ? "×" : "☰"}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white flex flex-col items-center py-4 md:hidden">
          <Link
            href={`/${locale}/`}
            className={`text-xl text-black py-2 hover:text-custom-blue transition ${isActive("/")}`}
            onClick={closeMenu}
          >
            <FaHome className="inline-block mr-2" /> Accueil
          </Link>

          <Link
            href={`/${locale}/about`}
            className={`text-xl text-black py-2 hover:text-custom-blue transition ${isActive("/about")}`}
            onClick={closeMenu}
          >
            <FaInfoCircle className="inline-block mr-2" /> A propos
          </Link>

          <Link
            href={`/${locale}/contact`}
            className={`text-xl text-black py-2 hover:text-custom-blue transition ${isActive("/contact")}`}
            onClick={closeMenu}
          >
            <FaPhoneAlt className="inline-block mr-2" /> Contact
          </Link>

          <Link
            href={`/${locale}/inscription`}
            className={`text-xl text-black py-2 hover:text-custom-blue transition ${isActive("/inscription")}`}
            onClick={closeMenu}
          >
            <FaUser className="inline-block mr-2" /> Inscription
          </Link>

          <Link
            href={`/${locale}/connexion`}
            className={`text-xl text-black py-2 hover:text-custom-blue transition ${isActive("/connexion")}`}
            onClick={closeMenu}
          >
            <FaSignInAlt className="inline-block mr-2" /> Connexion
          </Link>
        </div>
      )}
    </nav>
  );
}
