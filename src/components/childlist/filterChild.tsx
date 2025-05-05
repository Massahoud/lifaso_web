import { useState,useEffect } from "react";
import Cookies from "js-cookie";
import { FaPlus } from "react-icons/fa";
import { fetchGroups } from "../../services/groups_service";
interface EnquetesPageProps {
  onFilterByState: (etat: string | null) => void;
  onFilterByDate: (startDate: string | null, endDate: string | null) => void;
  totalEnquetes: number;
  onFilterByGroup: (groupId: string | null) => void; // Ajoutez cette fonction pour filtrer par groupe
}
interface Group {
  id: string;
  nom: string;
}
const EnquetesPage: React.FC<EnquetesPageProps> = ({ onFilterByState, onFilterByDate,onFilterByGroup, totalEnquetes }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStatePicker, setShowStatePicker] = useState(false);
  const [showGroupPicker, setShowGroupPicker] = useState(false); // État pour afficher la liste des groupes
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [groups, setGroups] = useState<Group[]>([]); // Liste des groupes
  const [, setSelectedGroup] = useState<string | null>(null); // Groupe sélectionné

  const handleStateSelection = (etat: string) => {
   
    onFilterByState(etat);
    setShowStatePicker(false);
  };
  
  
  const handleGroupSelection = (groupId: string | null) => {
    setSelectedGroup(groupId);
    setShowGroupPicker(false);
    onFilterByGroup(groupId); // Appliquer le filtre par groupe
  };
  useEffect(() => {
    // Récupérer la liste des groupes
    const fetchAllGroups = async () => {
      try {
        const fetchedGroups = await fetchGroups();
        setGroups(fetchedGroups);
      } catch (error) {
        console.error("Erreur lors de la récupération des groupes :", error);
      }
    };

    fetchAllGroups();
  }, []);

   useEffect(() => {
      // Récupération du token dans le localStorage
      const storedToken = Cookies.get("token");
      if (storedToken) {
        setToken(storedToken);
      }
  
    
    }, []);
  
    // Fonction pour ajouter le token aux liens
    const generateLink = (baseUrl: string) => {
      return token ? `${baseUrl}?token=${token}` : baseUrl;
    };

  return (
    <div className="p-6 relative">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-y-4">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {totalEnquetes} ENQUÊTES
        </h1>

        {/* Boutons */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-start gap-2 w-full md:w-auto">

          {/* Bouton Par période */}
          <button
            className="px-2 md:px-3 py-1.5 md:py-2 text-sm md:text-base rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none cursor-pointer"
            onClick={() => {
              setShowDatePicker(!showDatePicker);
              setShowStatePicker(false);
              setShowGroupPicker(false);
            }}
          >
            Par période
          </button>

          {/* Carte de sélection de période */}
          {showDatePicker && (
            <div className="absolute top-15 right-60 mt-2 bg-white shadow-lg rounded-lg p-4 border flex flex-col space-y-2 w-50 z-10">
              <div className="flex flex-wrap gap-2">
                <div className="flex flex-col">
                  <label className="text-gray-500 text-sm">Du</label>
                  <input
                    type="date"
                    value={startDate || ""}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded px-2 py-1 text-gray-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-500 text-sm">Au</label>
                  <input
                    type="date"
                    value={endDate || ""}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded px-2 py-1 text-gray-700"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <button
                  className="text-gray-600 hover:text-black text-sm"
                  onClick={() => {
                    setStartDate(null);
                    setEndDate(null);
                    setShowDatePicker(false);
                    onFilterByDate(null, null);
                  }}
                >
                  Annuler
                </button>
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setShowDatePicker(false);
                    onFilterByDate(startDate, endDate);
                  }}
                >
                  Valider
                </button>
              </div>
            </div>
          )}

          {/* Bouton Par État */}

          <button
            className="px-2 md:px-3 py-1.5 md:py-2 text-sm md:text-base rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none cursor-pointer"
            onClick={() => {
              setShowStatePicker(!showStatePicker);
              setShowDatePicker(false);
              setShowGroupPicker(false);
            }}
          >
            Par État
          </button>

          {/* Carte de sélection d'état */}
          {showStatePicker && (
             <div className="absolute top-15 right-35 mt-2 bg-white shadow-lg rounded-lg p-4 border flex flex-col space-y-2 w-40 z-10">
              {["Nouveau", "En cours", "Clôturé"].map((etat) => (
                <button
                  key={etat}
                  className="border rounded px-4 py-2 text-gray-500 hover:bg-orange-100"
                  onClick={() => handleStateSelection(etat)}
                >
                  {etat}
                </button>
              ))}
              <button
                className="text-gray-600 hover:text-black text-sm"
                onClick={() => {
                  setShowStatePicker(false);
                  onFilterByState(null);
                }}
              >
                Annuler
              </button>
            </div>
          )}

{/* Bouton Par Groupe */}
<button
            className="px-2 md:px-3 py-1.5 md:py-2 text-sm md:text-base rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none cursor-pointer"
            onClick={() => {
              setShowGroupPicker(!showGroupPicker);
              setShowDatePicker(false);
              setShowStatePicker(false);
            }}
          >
            Par Groupe
          </button>

          {/* Carte de sélection de groupe */}
          {showGroupPicker && (
            <div className="absolute top-15 right-35 mt-2 bg-white shadow-lg rounded-lg p-4 border flex flex-col space-y-2 w-40 z-10">
              {groups.map((group) => (
                <button
                  key={group.id}
                  className="border rounded px-4 py-2 text-gray-500 hover:bg-orange-100"
                  onClick={() => handleGroupSelection(group.id)}
                >
                  {group.nom}
                </button>
              ))}
              <button
                className="text-gray-600 hover:text-black text-sm"
                onClick={() => handleGroupSelection(null)}
              >
                Annuler
              </button>
            </div>
          )}
  {/* Bouton Nouvelle enquête */}
  <button
            className="px-2 md:px-3 py-1.5 md:py-2 text-sm md:text-base rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:outline-none flex items-center cursor-pointer"
            onClick={() =>
              (window.location.href  = generateLink("https://v0.enquetesoleil.com/createSurvey"))
            }
          >
            <FaPlus className="mr-1 md:mr-2" />
            Nouvelle enquête
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnquetesPage;
