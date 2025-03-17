
import { FaPlus } from "react-icons/fa";

const EnquetesPage = () => {
  return (
    <div className="p-6 ">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-1">
        {/* Titre */}
        <h1 className="text-3xl font-bold text-gray-800">816 ENQUÊTES</h1>

        {/* Boutons */}
        <div className="flex items-center space-x-2">
        <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none cursor-pointer">
  Par période
</button>
<button className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none cursor-pointer">
  Par date
</button>
<button
  className="px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:outline-none flex items-center cursor-pointer"
  onClick={() => (window.location.href = "https://fir-f3d3d.web.app/createSurvey")}
>
  <FaPlus className="mr-2" />
  Nouvelle enquête
</button>


        </div>
      </div>

     
    </div>
  );
};

export default EnquetesPage;
