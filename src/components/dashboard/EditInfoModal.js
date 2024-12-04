import {
  FaTimes,
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaHome,
  FaPhone,
  FaUsers,
  FaEnvelope,
} from "react-icons/fa";
import { useState } from "react";

const EditInfoModal = ({ onClose, studentData }) => {
  const [formData, setFormData] = useState({ ...studentData });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis.";
    if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis.";
    if (!formData.birthDate) newErrors.birthDate = "La date de naissance est requise.";
    if (!formData.birthPlace.trim()) newErrors.birthPlace = "Le lieu de naissance est requis.";
    if (!formData.address.trim()) newErrors.address = "L'adresse est requise.";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Le numéro de téléphone doit être valide (10 chiffres).";
    if (!formData.userType) newErrors.userType = "Le type d'utilisateur est requis.";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Le format de l'email est invalide.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, userType: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Données enregistrées : ", formData);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-14 rounded-lg w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Modifier Mes Infos</h2>
          <button onClick={onClose}>
            <FaTimes className="text-red-600 text-lg" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">

            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-600" />
              <label className="w-1/3">Nom :</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Nom"
                className="w-2/3 p-2 border rounded"
              />
            </div>
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

           
            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-600" />
              <label className="w-1/3">Prénom :</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Prénom"
                className="w-2/3 p-2 border rounded"
              />
            </div>
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

         
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-gray-600" />
              <label className="w-1/3">Email :</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-2/3 p-2 border rounded"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-gray-600" />
              <label className="w-1/3">Date de naissance :</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-2/3 p-2 border rounded"
              />
            </div>
            {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}

          
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-gray-600" />
              <label className="w-1/3">Lieu de naissance :</label>
              <input
                type="text"
                name="birthPlace"
                value={formData.birthPlace}
                onChange={handleChange}
                placeholder="Lieu de naissance"
                className="w-2/3 p-2 border rounded"
              />
            </div>
            {errors.birthPlace && <p className="text-red-500 text-sm">{errors.birthPlace}</p>}

            <div className="flex items-center space-x-2">
              <FaHome className="text-gray-600" />
              <label className="w-1/3">Adresse :</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Adresse"
                className="w-2/3 p-2 border rounded"
              />
            </div>
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

    
            <div className="flex items-center space-x-2">
              <FaPhone className="text-gray-600" />
              <label className="w-1/3">Téléphone :</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Téléphone"
                className="w-2/3 p-2 border rounded"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}


            <div className="flex items-center space-x-2">
              <FaUsers className="text-gray-600" />
              <label className="w-1/3">Type d'utilisateur :</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="userType"
                    value="Étudiante"
                    checked={formData.userType === "Étudiante"}
                    onChange={handleRadioChange}
                  />
                  <span>Étudiante</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="userType"
                    value="Fonctionnaire"
                    checked={formData.userType === "Fonctionnaire"}
                    onChange={handleRadioChange}
                  />
                  <span>Fonctionnaire</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="userType"
                    value="Externe"
                    checked={formData.userType === "Externe"}
                    onChange={handleRadioChange}
                  />
                  <span>Externe</span>
                </label>
              </div>
            </div>
            {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInfoModal;
