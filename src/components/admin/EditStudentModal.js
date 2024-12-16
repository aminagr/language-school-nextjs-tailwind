import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave, FaUser, FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const EditStudentModal = ({ studentData, onSave, onClose }) => {
  const [editData, setEditData] = useState({ ...studentData, type: studentData.type || 'Etudiant' }); // Valeur par défaut 'etudiant'

  useEffect(() => {
    setEditData({ ...studentData, type: studentData.type || 'Etudiant' }); // Assurez-vous d'avoir un type valide
  }, [studentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(editData).some((field) => field === '')) {
      alert('Tous les champs doivent être remplis.');
      return;
    }
    onSave(editData);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 p-6 relative max-h-screen overflow-auto">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          <FaTimes className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Éditer un étudiant</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['matricule', 'nom', 'prenom', 'lieu_naissance', 'adresse', 'telephone', 'mail'].map((field) => (
              <div key={field} className="mb-4">
                <label htmlFor={field} className="block text-gray-700 font-medium mb-2 capitalize">
                  {field.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <span className="p-3">
                    {field === 'telephone' ? <FaPhoneAlt /> : field === 'mail' ? <FaEnvelope /> : <FaUser />}
                  </span>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={editData[field]}
                    onChange={handleChange}
                    required
                    className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label htmlFor="date_naissance" className="block text-gray-700 font-medium mb-2">Date de naissance</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <span className="p-3"><FaCalendarAlt /></span>
              <input
                type="date"
                id="date_naissance"
                name="date_naissance"
                value={editData.date_naissance}
                onChange={handleChange}
                required
                className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 font-medium mb-2">Type</label>
            <div className="flex gap-4">
              {['Etudiant', 'Fonctionnaire', 'Externe'].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    onChange={handleChange}
                    checked={editData.type === type}
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none flex items-center justify-center">
            <FaSave className="h-5 w-5 mr-2" />
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
