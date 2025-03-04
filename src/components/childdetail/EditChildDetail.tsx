import React, { useState } from "react";
import { X } from "lucide-react";

interface Child {
  nom: string;
  prenom: string;
  age: number;
  sexe: string;
  
  contactNom: string;
  contact: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: Child;
  onSave: (data: Child) => void;
}
const ChildEditModal: React.FC<ModalProps> = ({ isOpen, onClose, child, onSave }) => {
    // Assurez-vous que "child" est correctement passé, sinon définir des valeurs par défaut
    const [formData, setFormData] = useState<Child>({
      nom: child?.nom || "",
      prenom: child?.prenom || "",
      age: child?.age || 0,
      sexe: child?.sexe || "Garçon",
      
      contactNom: child?.contactNom || "",
      contact: child?.contact || "",
    });
  
    if (!isOpen) return null; // Si le modal n'est pas ouvert, on ne rend rien
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
      onClose();
    };
  
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-end z-50">
        <div className="bg-white w-1/3 h-full p-6 shadow-lg overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-xl font-semibold">Informations</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            </button>
          </div>
  
          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-600">Nom(s)</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full border rounded-2xl p-2"
              />
            </div>
            <div>
              <label className="block text-gray-600">Prénom(s)</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="w-full border rounded-2xl p-2"
              />
            </div>
            <div>
              <label className="block text-gray-600">Âge</label>
              <input
                type="number"
                name="age"
                value={formData.age}
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
                    name="sexe"
                    value="M"
                    checked={formData.sexe === "M"}
                    onChange={handleChange}
                  />
                  <span>Garçon</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="sexe"
                    value="F"
                    checked={formData.sexe === "F"}
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
                name="contactNom"
                value={formData.contactNom}
                onChange={handleChange}
                className="w-full border rounded-2xl p-2"
              />
            </div>
            <div>
              <label className="block text-gray-600">Téléphone</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
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
