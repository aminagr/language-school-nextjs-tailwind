'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { FaUser, FaBook, FaChalkboardTeacher, FaTrophy } from 'react-icons/fa'; 

export default function Stats() {
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline
      .fromTo(
        ".stat-item",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.3 }
      );
  }, []);

  return (
    <div className="relative bg-gray-100 text-gray-800 py-16">
      <div className="absolute inset-0 opacity-50 bg-gray-100"></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-10 lg:px-32 flex flex-col items-center text-center gap-12">
        <h2 className="text-3xl font-extrabold text-custom-red">
          L'école en chiffres
        </h2>
        <p className="text-lg md:text-xl text-gray-700">
          Découvrez les statistiques qui rendent notre école unique et dynamique.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
     
          <div className="stat-item bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <FaUser className="text-4xl text-custom-blue mb-4" />
            <h3 className="text-3xl font-semibold text-custom-blue">2000+</h3>
            <p className="text-lg text-gray-600">Étudiants</p>
          </div>


          <div className="stat-item bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <FaBook className="text-4xl text-custom-blue mb-4" />
            <h3 className="text-3xl font-semibold text-custom-blue">50+</h3>
            <p className="text-lg text-gray-600">Cours proposés</p>
          </div>


          <div className="stat-item bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <FaChalkboardTeacher className="text-4xl text-custom-blue mb-4" />
            <h3 className="text-3xl font-semibold text-custom-blue">30+</h3>
            <p className="text-lg text-gray-600">Professeurs</p>
          </div>


          <div className="stat-item bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <FaTrophy className="text-4xl text-custom-blue mb-4" />
            <h3 className="text-3xl font-semibold text-custom-blue">15</h3>
            <p className="text-lg text-gray-600">Récompenses</p>
          </div>
        </div>
      </div>
    </div>
  );
}
