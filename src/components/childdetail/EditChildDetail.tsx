import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import api from "../../services/api"; // Importation de l'instance API avec le token

interface Child {
  id: string;
  nom_enfant: string;
  prenom_enfant: string;
  age_enfant: string;
  sexe_enfant: string;
  nomcontact_enfant: string;
  contact_enfant: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: Child;
  onSave: (data: Child) => void;
}

const ChildEditModal: React.FC<ModalProps> = ({ isOpen, onClose, child, onSave }) => {
  const [formData, setFormData] = useState<Child>({
    id: "",
    nom_enfant: "",
    prenom_enfant: "",
    age_enfant: "",
    sexe_enfant: "M",
    nomcontact_enfant: "",
    contact_enfant: "",
  });

  useEffect(() => {
    if (child) {
      setFormData({
        id: child.id || "",
        nom_enfant: child.nom_enfant || "",
        prenom_enfant: child.prenom_enfant || "",
        age_enfant: child.age_enfant || "",
        sexe_enfant: child.sexe_enfant || "",
        nomcontact_enfant: child.nomcontact_enfant || "",
        contact_enfant: child.contact_enfant || "",
      });
    }
  }, [child]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.put(`/surveys/${child.id}`, formData);

      onSave(formData); // Mise à jour des données affichées
      onClose(); // Fermer la modal
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-1/3 h-full p-6 shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold">Informations</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        <h3 className="mt-4 text-lg font-semibold">Enfant</h3>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-gray-600">Nom(s)</label>
            <input
              type="text"
              name="nom_enfant"
              value={formData.nom_enfant}
              onChange={handleChange}
              className="w-full border rounded-2xl p-2"
            />
          </div>
          <div>
            <label className="block text-gray-600">Prénom(s)</label>
            <input
              type="text"
              name="prenom_enfant"
              value={formData.prenom_enfant}
              onChange={handleChange}
              className="w-full border rounded-2xl p-2"
            />
          </div>
          <div>
            <label className="block text-gray-600">Âge</label>
            <input
              type="text"
              name="age_enfant"
              value={formData.age_enfant}
              onChange={handleChange}
              className="w-full border rounded-2xl p-2"
            />
          </div>
          <div>
            <label className="block text-gray-600">Sexe</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sexe_enfant"
                  value="M"
                  checked={formData.sexe_enfant === "M"}
                  onChange={handleChange}
                />
                <span>Garçon</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sexe_enfant"
                  value="F"
                  checked={formData.sexe_enfant === "F"}
                  onChange={handleChange}
                />
                <span>Fille</span>
              </label>
            </div>
          </div>

          <h3 className="mt-4 text-lg font-semibold">Contact de l'enfant</h3>
          <div>
            <label className="block text-gray-600">Nom(s) du contact</label>
            <input
              type="text"
              name="nomcontact_enfant"
              value={formData.nomcontact_enfant}
              onChange={handleChange}
              className="w-full border rounded-2xl p-2"
            />
          </div>
          <div>
            <label className="block text-gray-600">Téléphone</label>
            <input
              type="text"
              name="contact_enfant"
              value={formData.contact_enfant}
              onChange={handleChange}
              className="w-full border rounded-2xl p-2"
            />
          </div>

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

export default ChildEditModal;
