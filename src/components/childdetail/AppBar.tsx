import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaDownload } from "react-icons/fa";
interface Child {
    id: string;
    nom_enfant: string;
    age_enfant: number;
    sexe_enfant: string;
    lieuenquete: string;
    numero: string;
    prenom_enfant: string;
   
  }
  
const AppBar: React.FC<{ child: Child }> = ({ child }) => {
  if (!child) return <p>Aucune donnée disponible</p>;
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Voulez-vous vraiment supprimer cette enquête ?")) {
      console.log("Suppression de l'enquête");
    }
  };

  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4">
      <button onClick={() => navigate(-1)} className="text-gray-600 text-lg">
        ⬅
      </button>
      <div className="text-lg font-semibold text-gray-800">
        <span className="text-sm text-gray-500">Enquête n°{child.numero}</span>
        <br />
       <h2> {child.nom_enfant},{child.prenom_enfant}</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">
          <FaDownload /> Exporter
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          <FaTrash /> Supprimer
        </button>
      </div>
    </div>
  );
};

export default AppBar;
