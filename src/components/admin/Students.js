import React, { useState } from "react";
import { FaPlus, FaTrash, FaSearch } from "react-icons/fa";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newStudent, setNewStudent] = useState({
    id: "",
    matricule: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
    lieuNaissance: "",
    adresse: "",
    type: "",
    etat:"",
  });

  const handleAddStudent = () => {
    setStudents([...students, { ...newStudent, id: Date.now() }]);
    setNewStudent({
      id: "",
      matricule: "",
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      dateNaissance: "",
      lieuNaissance: "",
      adresse: "",
      type: "",
      etat:"",
    });
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter((student) =>
    Object.values(student).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">

      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="relative w-full sm:w-1/2 mb-2 sm:mb-0">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un étudiant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={handleAddStudent}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <FaPlus className="mr-2" />
          Ajouter un étudiant
        </button>
      </div>

  
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "ID",
                "Matricule",
                "Nom",
                "Prénom",
                "Email",
                "Téléphone",
                "Date de Naissance",
                "Lieu de Naissance",
                "Adresse",
                "Type",
                "Etat",
                "Actions",
              ].map((header) => (
                <th key={header} className="px-4 py-2 border text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{student.id}</td>
                <td className="px-4 py-2 border">{student.matricule}</td>
                <td className="px-4 py-2 border">{student.nom}</td>
                <td className="px-4 py-2 border">{student.prenom}</td>
                <td className="px-4 py-2 border">{student.email}</td>
                <td className="px-4 py-2 border">{student.telephone}</td>
                <td className="px-4 py-2 border">{student.dateNaissance}</td>
                <td className="px-4 py-2 border">{student.lieuNaissance}</td>
                <td className="px-4 py-2 border">{student.adresse}</td>
                <td className="px-4 py-2 border">{student.type}</td>
                <td className="px-4 py-2 border">{student.etat}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {filteredStudents.length === 0 && (
        <p className="mt-4 text-center text-gray-500">
          Aucun étudiant trouvé.
        </p>
      )}
    </div>
  );
};

export default Students;
