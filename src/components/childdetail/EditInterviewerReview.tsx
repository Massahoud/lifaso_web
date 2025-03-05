import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import api from "../../services/api";

interface InvestigatorNoteProps {
  isOpen: boolean;
  onClose: () => void;
  note: {
    id: string;
    nom_enqueteur: string;
    prenom_enqueteur: string;
    avis_enqueteur: string;
  };
  onSave: (note: {
    id: string;
    nom_enqueteur: string;
    prenom_enqueteur: string;
    avis_enqueteur: string;
  }) => void;
}

const InvestigatorNoteModal: React.FC<InvestigatorNoteProps> = ({ isOpen, onClose, note, onSave }) => {
  const [currentNote, setCurrentNote] = useState(note);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // ⚡ Met à jour currentNote quand note change (par ex. à l'ouverture du modal)
  useEffect(() => {
    setCurrentNote(note);
  }, [note]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      await api.put(`/surveys/${note.id}`, currentNote);
      onSave(currentNote);
      setMessage({ type: "success", text: "Mise à jour réussie ✅" });
      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setMessage({ type: "error", text: "Erreur lors de la mise à jour ❌" });
      setTimeout(() => setMessage(null), 3000);
    }
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
            <p className="text-md font-semibold">{currentNote.nom_enqueteur}</p>
            <p className="text-sm text-gray-500">{currentNote.prenom_enqueteur}</p>
          </div>
        </div>

        {/* Note */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <label className="block text-gray-600">Note</label>
          <textarea
            name="avis_enqueteur"
            value={currentNote.avis_enqueteur}
            onChange={handleChange}
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

        {/* Popup de confirmation ou d'échec */}
        {message && (
          <div
            className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 text-white rounded-lg shadow-lg ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestigatorNoteModal;
