"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaUser,
  FaClipboardList,
  FaBell,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { useLocale } from "next-intl";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const locale = useLocale();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleConfirmLogout = () => {
    console.log("User logged out (placeholder).");
    setShowConfirmation(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {!isOpen && (
        <button onClick={toggleSidebar} className="md:hidden fixed top-4 left-4 z-30">
          <FaBars className="text-indigo-600 text-3xl" />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 md:bg-transparent transition-all z-10"
          onClick={toggleSidebar}
        />
      )}

      <div
        id="sidebar"
        className={`h-screen w-64 bg-indigo-700 text-white p-6 transition-transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative absolute top-0 left-0 z-20 md:block`}
      >
        <div className="flex justify-center items-center mb-10">
          <Link href={`/${locale}/dashboard`} className="flex items-center text-3xl font-semibold text-white hover:bg-indigo-600 p-2 rounded-lg">
            <FaTachometerAlt className="mr-3" />
            Dashboard
          </Link>
        </div>

        <ul className="space-y-6">
          <li>
            <Link
              href={`/${locale}/dashboard/my-account`}
              className="flex items-center py-2 px-4 rounded-lg hover:bg-indigo-600 transition-all"
            >
              <FaUser className="mr-3 text-xl" />
              <span className="text-lg">Mon profil</span>
            </Link>
          </li>
          <li>
            <Link
              href={`/${locale}/dashboard/sessions`}
              className="flex items-center py-2 px-4 rounded-lg hover:bg-indigo-600 transition-all"
            >
              <FaClipboardList className="mr-3 text-xl" />
              <span className="text-lg">Sessions</span>
            </Link>
          </li>
          
          
        </ul>

        <div className="my-8 border-t border-gray-600"></div>

        <ul>
          <li>
            <button
              onClick={handleLogoutClick}
              className="flex items-center py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
            >
              <FaSignOutAlt className="mr-3 text-xl" />
              <span className="text-lg">Se déconnecter</span>
            </button>
          </li>
        </ul>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl mb-4">Êtes-vous sûr de vouloir vous déconnecter ?</h3>
            <button
              onClick={handleConfirmLogout}
              className="bg-red-600 text-white py-2 px-4 rounded-lg mr-2"
            >
              Oui
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg"
            >
              Non
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
