import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
interface UsersPageProps {
  onFilterByState: (statut: string | null) => void;
  totalUsers: number;
}

const UsersFilter: React.FC<UsersPageProps> = ({onFilterByState, totalUsers }) => {
  const [showStatePicker, setShowStatePicker] = useState(false);
  const navigate = useNavigate();


  const handleStateSelection = (statut: string) => {
    onFilterByState(statut);
    setShowStatePicker(false);
  };
  
  
   
  return (
    <div className="p-6 relative">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-y-4">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        {totalUsers !== undefined ? `${totalUsers} utilisateurs` : "Chargement..."}
        </h1>

        {/* Boutons */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-start gap-2 w-full md:w-auto">

         

        
          {/* Bouton Par role */}

          <button
            className="px-2 md:px-3 py-1.5 md:py-2 text-sm md:text-base rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none cursor-pointer"
            onClick={() => {
              setShowStatePicker(!showStatePicker);
            }}
          >
            Par Rôle
          </button>

          {/* Carte de sélection d'état */}
          {showStatePicker && (
  <div className="absolute top-15 right-45 mt-2 bg-white shadow-lg rounded-lg p-4 border flex flex-col space-y-2 w-40 z-10">
    {["admin", "super Admin", "enqueteur"].map((statut) => (
      <button
        key={statut}
        className="border rounded px-4 py-2 text-gray-500 hover:bg-gray-100"
        onClick={() => handleStateSelection(statut)}
      >
        {statut}
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


          {/* Bouton Nouvelle enquête */}
          <button
            className="px-2 md:px-3 py-1.5 md:py-2 text-sm md:text-base rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:outline-none flex items-center cursor-pointer"
            onClick={() =>
              navigate("/users/send_invitation")
            }
          >
            <FaPlus className="mr-1 md:mr-2" />
            Créer un utilisateur
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersFilter;
