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
    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis.";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis.";
    if (!formData.date_naissance) newErrors.date_naissance = "La date de naissance est requise.";
    if (!formData.lieu_naissance.trim()) newErrors.lieu_naissance = "Le lieu de naissance est requis.";
    if (!formData.adresse.trim()) newErrors.adresse = "L'adresse est requise.";
    if (!/^\d{10}$/.test(formData.telephone)) newErrors.telephone = "Le numéro de téléphone doit être valide (10 chiffres).";
    if (!formData.type) newErrors.type = "Le type d'utilisateur est requis.";
    if (!formData.mail.trim()) {
      newErrors.mail = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mail)) {
      newErrors.mail = "Le format de l'email est invalide.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, type: e.target.value });
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
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Nom"
                className="w-2/3 p-2 border rounded"
              />
            </div>
            {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}

            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-600" />
              <label className="w-1/3">Prénom :</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Prénom"
                className="w-2/3 p-2 border rounded"
              />
            </div>
            {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom}</p>}

            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-gray-600" />
              <label className="w-1/3">Email :</label>
              <input
                type="email"
                name="mail"
                value={formData.mail}
                onChange={handleChange}
                placeholder="Email"
                className="w-2/3 p-2 border rounded"
              />
            </div>
            {errors.mail && <p className="text-red-500 text-sm">{errors.mail}</p>}

            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-gray-600" />
              <label className="w-1/3">Date de naissance :</label>
              <input
                type="date"
                name="date_naissance"
                value={formData.date_naissance}
                onChange={handleChange}
                className="w-2/3 p-2 border rounded"
              />
            </div>
            {errors.date_naissance && <p className="text-red-500 text-sm">{errors.date_naissance}</p>}

            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-gray-600" />
              <label className="w-1/3">Lieu de naissance :</label>
              <input
                type="text"
                name="lieu_naissance"
                value={formData.lieu_naissance}
                onChange={handleChange}
                placeholder="Lieu de naissance"
                className="w-2/3 p-2 border rounded"
              />
            </div>
            {errors.lieu_naissance && <p className="text-red-500 text-sm">{errors.lieu_naissance}</p>}

            <div className="flex items-center space-x-2">
              <FaHome className="text-gray-600" />
              <label className="w-1/3">Adresse :</label>
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                placeholder="Adresse"
                className="w-2/3 p-2 border rounded"
              />
            </div>
            {errors.adresse && <p className="text-red-500 text-sm">{errors.adresse}</p>}

            <div className="flex items-center space-x-2">
              <FaPhone className="text-gray-600" />
              <label className="w-1/3">Téléphone :</label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="Téléphone"
                className="w-2/3 p-2 border rounded"
              />
            </div>
            {errors.telephone && <p className="text-red-500 text-sm">{errors.telephone}</p>}

            <div className="flex items-center space-x-2">
              <FaUsers className="text-gray-600" />
              <label className="w-1/3">Type d'utilisateur :</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="type"
                    value="Etudiant"
                    checked={formData.type === "Etudiant"}
                    onChange={handleRadioChange}
                  />
                  <span>Étudiant</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="type"
                    value="Fonctionnaire"
                    checked={formData.type === "Fonctionnaire"}
                    onChange={handleRadioChange}
                  />
                  <span>Fonctionnaire</span>
                </label>
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    name="type"
                    value="Externe"
                    checked={formData.type === "Externe"}
                    onChange={handleRadioChange}
                  />
                  <span>Externe</span>
                </label>
              </div>
            </div>
            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
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
