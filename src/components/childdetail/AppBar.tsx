import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash,  FaFilePdf } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { exportToPDF } from "./ChildReponse";

import { getUserRole } from "../../services/role";
import { deleteSurvey } from "../../services/childDetail_Service";
import domtoimage from "dom-to-image";
import { jsPDF } from "jspdf";
interface Child {
  id: string;
  nom_enfant: string;
  age_enfant: number;
  sexe_enfant: string;
  lieuenquete: string;
  numero: string;
  prenom_enfant: string;
}
interface ResponseItem {
  numero: string;
  question_text: string;
  reponse_text: string;
}
interface AppBarProps {
  child: Child;
  responses: ResponseItem[]; // Ajout de la prop responses
}
const AppBar: React.FC<AppBarProps> = ({ child, responses }) => {
  if (!child) return <p>Aucune donnée disponible</p>;
  const navigate = useNavigate();
  
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
      const fetchUserStatus = async () => {
        const userInfo = await getUserRole();
        if (userInfo) {
          setUserStatus(userInfo.statut); // extrait uniquement le statut
        }
      };
      fetchUserStatus();
    }, []);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const handleDelete = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer cette enquête ?")) {
      try {
        await deleteSurvey(child.id);
        alert("Enquête supprimée avec succès !");
        navigate(-1); // Redirige l'utilisateur après suppression
      } catch (error) {
        alert("Erreur lors de la suppression de l'enquête.");
      }
    }
  };

  const handleExport = async () => {
    setIsMenuOpen(false); 
    const element = document.getElementById("capture");
  
    if (!element) {
      console.error("Élément non trouvé");
      return;
    }
  
    try {
      // Convertir l'élément en image PNG
      const dataUrl = await domtoimage.toPng(element);
  
      // Créer un PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // Largeur A4 en mm
      const imgHeight = (element.offsetHeight * imgWidth) / element.offsetWidth; // Garde le ratio
  
      pdf.addImage(dataUrl, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`enquete_${child.numero}.pdf`);
    } catch (error) {
      console.error("Erreur lors de la capture :", error);
      alert("Impossible de capturer la page.");
    }
  };
  

  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4">
      {/* Bouton de retour circulaire avec icône */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition cursor-pointer"
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
         <div className="relative">
         <button
           onClick={toggleMenu}
           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
         >
           <FaFilePdf /> Exporter PDF
         </button>
       
         {isMenuOpen && (
           <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg p-2 z-10">
             <button
               onClick={() => handleExport()}
               className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
             >
               La page
             </button>
             <button
                onClick={() => {
                  setIsMenuOpen(false);
                  exportToPDF(responses); // Exporter les questions
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
               Les questions
             </button>
           </div>
         )}
       </div>
        )}
        {userStatus !== "enqueteur" && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
          >
            <FaTrash /> Supprimer
          </button>
        )}
      </div>
    </div>
  );
};

export default AppBar;
