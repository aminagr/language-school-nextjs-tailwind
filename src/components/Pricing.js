import { FaDollarSign } from "react-icons/fa";

export default function Pricing() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-8 md:px-10 lg:px-32 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
          Nos Tarifs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-md hover:shadow-lg transition p-6 rounded-lg">
            <FaDollarSign className="text-custom-red text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pack de Base</h3>
            <p className="text-gray-600">Cours intensifs avec 2 heures par semaine. À partir de 150€.</p>
          </div>
    
        </div>
      </div>
    </div>
  );
}
