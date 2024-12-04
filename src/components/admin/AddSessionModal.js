import React, { useState } from 'react';

const AddSessionModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    session_name: '',
    start_date: '',
    end_date: '',
    registration_start_date: '',
    registration_end_date: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.session_name.trim()) newErrors.session_name = 'Le nom de la session est requis.';
    if (!formData.start_date) newErrors.start_date = 'La date de début est requise.';
    if (!formData.end_date) newErrors.end_date = 'La date de fin est requise.';
    if (!formData.registration_start_date)
      newErrors.registration_start_date = "La date de début d'inscription est requise.";
    if (!formData.registration_end_date)
      newErrors.registration_end_date = "La date de fin d'inscription est requise.";

 
    if (
      formData.start_date &&
      formData.end_date &&
      new Date(formData.start_date) > new Date(formData.end_date)
    ) {
      newErrors.end_date = 'La date de fin doit être après la date de début.';
    }

    if (
      formData.registration_start_date &&
      formData.registration_end_date &&
      new Date(formData.registration_start_date) > new Date(formData.registration_end_date)
    ) {
      newErrors.registration_end_date =
        "La date de fin d'inscription doit être après la date de début d'inscription.";
    }

    if (
      formData.registration_start_date &&
      formData.registration_end_date &&
      (new Date(formData.registration_start_date) < new Date(formData.start_date) ||
        new Date(formData.registration_end_date) > new Date(formData.end_date))
    ) {
      newErrors.registration_end_date =
        "Les dates d'inscription doivent être à l'intérieur de la période de la session.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Ajouter une session</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium">Nom de la session</label>
            <input
              type="text"
              name="session_name"
              value={formData.session_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.session_name && (
              <p className="text-red-500 text-sm">{errors.session_name}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Date de début</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date}</p>}
          </div>
          <div>
            <label className="block font-medium">Date de fin</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.end_date && <p className="text-red-500 text-sm">{errors.end_date}</p>}
          </div>
          <div>
            <label className="block font-medium">Début des inscriptions</label>
            <input
              type="date"
              name="registration_start_date"
              value={formData.registration_start_date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.registration_start_date && (
              <p className="text-red-500 text-sm">{errors.registration_start_date}</p>
            )}
          </div>
          <div>
            <label className="block font-medium">Fin des inscriptions</label>
            <input
              type="date"
              name="registration_end_date"
              value={formData.registration_end_date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.registration_end_date && (
              <p className="text-red-500 text-sm">{errors.registration_end_date}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSessionModal;
