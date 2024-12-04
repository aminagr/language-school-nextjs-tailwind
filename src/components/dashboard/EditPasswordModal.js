import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { useState } from "react";

const EditPasswordModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const storedPassword = "a"; 

  const toggleShowPassword = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

   
    if (currentPassword !== storedPassword) {
      setError("L'ancien mot de passe est incorrect.");
      return;
    }

  
    if (newPassword !== confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    
    setError("");
    alert("Mot de passe modifié avec succès !");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Modifier le Mot de Passe</h2>
          <button onClick={onClose}>
            <FaTimes className="text-red-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
        
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                placeholder="Ancien mot de passe"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => toggleShowPassword("current")}
                className="absolute inset-y-0 right-2 flex items-center text-gray-600"
              >
                {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

       
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => toggleShowPassword("new")}
                className="absolute inset-y-0 right-2 flex items-center text-gray-600"
              >
                {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

        
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => toggleShowPassword("confirm")}
                className="absolute inset-y-0 right-2 flex items-center text-gray-600"
              >
                {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>


          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        
          <button
            type="submit"
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded w-full"
          >
            Modifier
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPasswordModal;
