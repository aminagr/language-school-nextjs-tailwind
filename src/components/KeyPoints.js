import { FaGraduationCap, FaChalkboardTeacher, FaCertificate } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";

export default function KeyPoints() {
  const points = [
    {
      icon: <FaGraduationCap className="text-custom-red text-4xl" />,
      title: "Diplôme Reconnue",
      description:
        "Obtenez un diplôme certifié, délivré par des universités prestigieuses en Russie.",
    },
    {
      icon: <FaChalkboardTeacher className="text-custom-blue text-4xl" />,
      title: "Professeurs Natifs",
      description:
        "Apprenez avec des enseignants natifs pour une immersion complète dans la langue.",
    },
    {
      icon: <MdLanguage className="text-custom-red text-4xl" />,
      title: "Immersion Culturelle",
      description:
        "Découvrez la culture russe à travers des cours interactifs et passionnants.",
    },
    {
      icon: <FaCertificate className="text-custom-blue text-4xl" />,
      title: "Certification Rapide",
      description:
        "Atteignez vos objectifs linguistiques rapidement avec nos programmes intensifs.",
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-8 md:px-10 lg:px-32 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
          Pourquoi Choisir Notre École ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-lg transition p-6 rounded-lg flex flex-col items-center"
            >
              <div className="mb-4">{point.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{point.title}</h3>
              <p className="text-gray-600 text-center">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
