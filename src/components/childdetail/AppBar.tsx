import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaDownload } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { getUserRole } from "../../services/role";

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
  
  const [userStatus, setUserStatus] = useState<string | null>(null);
  
  useEffect(() => {
    getUserRole().then(setUserStatus);
  }, []);

  const handleDelete = () => {
    if (window.confirm("Voulez-vous vraiment supprimer cette enquête ?")) {
      console.log("Suppression de l'enquête");
    }
  };

  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4">
      {/* Bouton de retour circulaire avec icône */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition"
        title="Retour"
        aria-label="Retour"
      >
        <IoChevronBack size={24} />
      </button>

      {/* Informations enquête */}
      <div className="text-center">
        <p className="text-lg font-bold text-gray-600">Enquête n°{child.numero}</p>
        <h2 className="text-2xl font-semibold text-gray-800">
          {child.nom_enfant} {child.prenom_enfant}
        </h2>
      </div>

      {/* Boutons d'actions */}
      <div className="flex items-center gap-4">
        {userStatus !== "enqueteur" && (
          <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
            <FaDownload /> Exporter
          </button>
        )}
        {userStatus !== "enqueteur" && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <FaTrash /> Supprimer
          </button>
        )}
      </div>
    </div>
  );
};

export default AppBar;
