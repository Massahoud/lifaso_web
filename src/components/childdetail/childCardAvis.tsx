import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import InvestigatorNoteModal from "./EditInterviewerReview";

interface Child {
  id: string;
  avis_enqueteur: string;
  prenom_enqueteur: string;
  nom_enqueteur: string;
}

const UserCard: React.FC<{ child: Child }> = ({ child }) => {
  if (!child) return <p>Aucune donnée disponible</p>;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState({
    avis_enqueteur: "",
    nom_enqueteur: "",
    prenom_enqueteur: "",
  });

  useEffect(() => {
    setNote({
      nom_enqueteur: child.nom_enqueteur,
      prenom_enqueteur: child.prenom_enqueteur,
      avis_enqueteur: child.avis_enqueteur,
    });
  }, [child]);

  const handleSave = (updatedNote: any) => {
    setNote(updatedNote);
    child.avis_enqueteur = updatedNote.avis_enqueteur; 
  };

  return (
    <div className="max-w-lg p-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {child.prenom_enqueteur} {child.nom_enqueteur}
            </h2>
            <p className="text-sm text-gray-500">Admin, Consultant, Enquêteur</p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-200" onClick={() => setIsModalOpen(true)}>
          <Pencil size={20} className="text-gray-500" />
        </button>
      </div>
      <div className="border-t border-gray-200 mt-2 pt-2">
        <p className="text-gray-600 text-sm leading-relaxed">{note.avis_enqueteur}</p>
      </div>

      <InvestigatorNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        note={note}
        onSave={handleSave}
      />
    </div>
  );
};

export default UserCard;
