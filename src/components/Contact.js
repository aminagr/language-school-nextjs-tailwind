'use client';
import { useState } from "react";
import { FaUser, FaEnvelope, FaComments, FaPhoneAlt, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-8 md:px-10 lg:px-32 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Contactez-nous</h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <FaEnvelope className="text-3xl text-custom-blue mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">Email</h3>
            <p className="text-gray-600">contact@centre.com</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <FaPhoneAlt className="text-3xl text-custom-red mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">Téléphone</h3>
            <p className="text-gray-600">+213 123 456 789</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <FaMapMarkerAlt className="text-3xl text-custom-blue mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">Adresse</h3>
            <p className="text-gray-600">Alger, Algérie</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <FaGlobe className="text-3xl text-custom-red mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">Site Web</h3>
            <p className="text-gray-600">centre.com</p>
          </div>
        </div>

    
        <div className="grid grid-cols-1 lg:grid-cols-2">
  <div className="bg-white p-8 rounded-lg max-w-3xl mx-auto">
    <h3 className="text-2xl font-semibold text-custom-blue mb-6">Envoyez-nous un message</h3>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 peer-focus:text-custom-blue text-xl" />
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-4 pl-14 bg-transparent border-b-2 border-gray-300 focus:border-custom-blue focus:outline-none text-lg peer"
        />
      </div>
      <div className="relative">
        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 peer-focus:text-custom-blue text-xl" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 pl-14 bg-transparent border-b-2 border-gray-300 focus:border-custom-blue focus:outline-none text-lg peer"
        />
      </div>
      <div className="relative">
        <FaComments className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 peer-focus:text-custom-blue text-xl" />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-4 pl-14 bg-transparent border-b-2 border-gray-300 focus:border-custom-blue focus:outline-none text-lg peer"
          rows="5"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full p-4 bg-custom-red text-white font-semibold rounded-lg hover:bg-custom-blue hover:text-white focus:outline-none transition-all duration-300"
        >
          Envoyer
        </button>
      </div>
    </form>
  </div>

  <div className="flex justify-center items-center">
  <iframe
      className="w-full h-64 sm:h-96 rounded-lg shadow-lg"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d767.7299506996776!2d3.006396572816101!3d36.77646991804208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb19a7bf99115%3A0x3e614c9a5f7e4a4e!2sAbu%20Al-Qasim%20Saadallah%20University%20-%20Algiers2%20(AASUA)!5e1!3m2!1sfr!2sdz!4v1732975145453!5m2!1sfr!2sdz"
      frameBorder="0"
      style={{ border: 0 }}
      allowFullScreen=""
      aria-hidden="false"
      tabIndex="0"
    />
  </div>
</div>

      </div>
    </div>
  );
}
