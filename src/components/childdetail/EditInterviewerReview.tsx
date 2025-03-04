import React, { useState } from "react";
import { X } from "lucide-react";

interface InvestigatorNoteProps {
    isOpen: boolean;
    onClose: () => void;
    note: {
      nom_enqueteur: string;
      prenom_enqueteur: string;
      avis_enqueteur: string;
    };
    onSave: (note: { nom_enqueteur: string; prenom_enqueteur: string; avis_enqueteur: string }) => void;
  }
  
  const InvestigatorNoteModal: React.FC<InvestigatorNoteProps> = ({ isOpen, onClose, note, onSave }) => {
    const [currentNote, setCurrentNote] = useState(note);
  
    if (!isOpen) return null;
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(currentNote);
      onClose();
    };
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-1/3 h-full p-6 shadow-lg overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold">Note enquêteur</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        {/* Enquêteur */}
        <div className="mt-4 flex items-center bg-gray-100 p-3 rounded-2xl">
        <img src="https://via.placeholder.com/50" alt="Avatar" className="w-10 h-10 rounded-full" />
          <div className="ml-3">
          <p className="text-md font-semibold">{note.nom_enqueteur}</p>
          <p className="text-sm text-gray-500">{note.prenom_enqueteur}</p>
          </div>
        </div>

        {/* Note */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <label className="block text-gray-600">Note</label>
          <textarea
            name="note"
            value={note.avis_enqueteur}
            onChange={(e) => setCurrentNote({ ...currentNote, avis_enqueteur: e.target.value })}
            className="w-full border rounded-lg p-3 h-32"
          ></textarea>

          {/* Bouton d'enregistrement */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 mt-6 rounded-2xl hover:bg-orange-600"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvestigatorNoteModal;
