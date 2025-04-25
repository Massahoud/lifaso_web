import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";


const FormulaireFilter= () => {
  const [showStatePicker, setShowStatePicker] = useState(false);
  const navigate = useNavigate();

  const [, setToken] = useState<string | null>(null);
 
   useEffect(() => {
      // Récupération du token dans le localStorage
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
  
    
    }, []);
  
    // Fonction pour ajouter le token aux liens
   

  return (
    <div className="p-6 relative">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-y-4">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        120 questions
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
            Exporter
          </button>

         
          {/* Bouton Nouvelle enquête */}
          <button
            className="px-2 md:px-3 py-1.5 md:py-2 text-sm md:text-base rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:outline-none flex items-center cursor-pointer"
            onClick={() =>
              navigate("/formulaire/create")
            }
          >
            <FaPlus className="mr-1 md:mr-2" />
            Ajouter une question
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormulaireFilter;
