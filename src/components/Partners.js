import { FaHandshake } from "react-icons/fa";

export default function Partners() {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-8 md:px-10 lg:px-32 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
          Nos Partenaires
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white shadow-md hover:shadow-lg transition p-6 rounded-lg">
            <FaHandshake className="text-custom-blue text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Université de Moscou</h3>
            <p className="text-gray-600">Partenaire majeur dans la délivrance de diplômes certifiés.</p>
          </div>
          <div className="bg-white shadow-md hover:shadow-lg transition p-6 rounded-lg">
            <FaHandshake className="text-custom-blue text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Université de Moscou</h3>
            <p className="text-gray-600">Partenaire majeur dans la délivrance de diplômes certifiés.</p>
          </div>
          <div className="bg-white shadow-md hover:shadow-lg transition p-6 rounded-lg">
            <FaHandshake className="text-custom-blue text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Université de Moscou</h3>
            <p className="text-gray-600">Partenaire majeur dans la délivrance de diplômes certifiés.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
