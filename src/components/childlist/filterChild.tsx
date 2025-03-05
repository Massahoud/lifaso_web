
import { FaPlus } from "react-icons/fa";

const EnquetesPage = () => {
  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        {/* Titre */}
        <h1 className="text-3xl font-bold text-gray-800">816 ENQUÊTES</h1>

        {/* Boutons */}
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none">
            Par période
          </button>
          <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none">
            Par date
          </button>
          <button className="px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:outline-none flex items-center">
            <FaPlus className="mr-2" />
            Nouvelle enquête
          </button>
        </div>
      </div>

      {/* Tableau des enquêtes */}
      <div className="">
        <table className="min-w-full ">
          <thead>
            <tr className="border-b border-gray-200 text-gray-600">
              <th className="py-3 px-6 text-left">Enquête +</th>
              <th className="py-3 px-12 text-left">Enfant</th>
              <th className="py-3 px-6 text-left">Sexe / Âge</th>
              <th className="py-3 px-15 text-left">État</th>
              <th className="py-3 px-6 text-left">Dernière intervention</th>
            </tr>
          </thead>
         
        </table>
      </div>
    </div>
  );
};

export default EnquetesPage;
