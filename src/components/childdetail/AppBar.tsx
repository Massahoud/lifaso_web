import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaDownload, FaFilePdf } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getUserRole } from "../../services/role";
import { deleteSurvey } from "../../services/childDetail_Service";

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
    const element = document.getElementById("capture"); // ID de l'élément à capturer
  
    if (!element) {
      console.error("Élément non trouvé");
      return;
    }
  
    try {
      // Capturer l'élément sous forme d'image
      const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff", // Corrige l'erreur en forçant un fond blanc
        useCORS: true, // Pour les images externes
      });
  
      const imgData = canvas.toDataURL("image/png");
      
      // Créer un PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // Largeur A4 en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Garde le ratio
  
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
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
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FaFilePdf /> Exporter PDF
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
