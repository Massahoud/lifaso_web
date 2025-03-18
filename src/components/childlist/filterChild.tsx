import { useState } from "react";
import { FaPlus } from "react-icons/fa";

interface EnquetesPageProps {
  onFilterByState: (etat: string) => void;
}

const EnquetesPage: React.FC<EnquetesPageProps> = ({ onFilterByState }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStatePicker, setShowStatePicker] = useState(false);

  const handleStateSelection = (etat: string) => {
    onFilterByState(etat);
    setShowStatePicker(false);
  };

  return (
    <div className="p-6 relative">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-1">
        {/* Titre */}
        <h1 className="text-3xl font-bold text-gray-800">816 ENQUÊTES</h1>

        {/* Boutons */}
        <div className="flex items-center space-x-2 relative">
          {/* Bouton Par période */}
          <button
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none cursor-pointer"
            onClick={() => {
              setShowDatePicker(!showDatePicker);
              setShowStatePicker(false);
            }}
          >
            Par période
          </button>

          {/* Carte de sélection de période */}
          {showDatePicker && (
            <div className="absolute top-12 left-0 bg-white shadow-lg rounded-lg p-4 border flex flex-col space-y-2">
              <div className="flex space-x-2">
                <div className="flex flex-col">
                  <label className="text-gray-500 text-sm">Du</label>
                  <input type="date" className="border rounded px-2 py-1 text-gray-700" />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-500 text-sm">Au</label>
                  <input type="date" className="border rounded px-2 py-1 text-gray-700" />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <button
                  className="text-gray-600 hover:text-black text-sm"
                  onClick={() => setShowDatePicker(false)}
                >
                  Annuler
                </button>
                <button className="bg-orange-500 text-white px-4 py-2 rounded">
                  Valider
                </button>
              </div>
            </div>
          )}

          {/* Bouton Par Etat */}
          <button
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none cursor-pointer"
            onClick={() => {
              setShowStatePicker(!showStatePicker);
              setShowDatePicker(false);
            }}
          >
            Par État
          </button>

          {/* Carte de sélection d'état */}
          {showStatePicker && (
            <div className="absolute top-12 left-0 bg-white shadow-lg rounded-lg p-4 border flex flex-col space-y-2 w-40">
              {["Nouveau", "En cours", "Clôturé"].map((etat) => (
                <button
                  key={etat}
                  className="border rounded px-4 py-2 text-gray-500 hover:bg-gray-100"
                  onClick={() => handleStateSelection(etat)}
                >
                  {etat}
                </button>
              ))}
              <button className="text-gray-600 hover:text-black text-sm" onClick={() => setShowStatePicker(false)}>
                Annuler
              </button>
            </div>
          )}

          {/* Bouton Nouvelle enquête */}
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
