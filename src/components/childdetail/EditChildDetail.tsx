
// components/ChildEditModal.tsx
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { updateChild } from "../../services/childService";

export interface Child {
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
      setFormData({ ...child });
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
      await updateChild(child.id, formData);
      onSave(formData);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-40 bg-opacity-50 backdrop-blur flex justify-end z-50">
      <div className="bg-white w-1/3 h-full p-6 shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold">Informations</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        <h3 className="mt-4 text-lg font-semibold">Enfant</h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {Object.keys(formData).map((key) => (
            key !== "id" && (
              <div key={key}>
                <label className="block text-gray-600">{key.replace("_enfant", "")}</label>
                <input
                  type="text"
                  name={key}
                  value={formData[key as keyof Child] as string}
                  onChange={handleChange}
                  className="w-full border rounded-2xl p-2"
                />
              </div>
            )
          ))}
          <button type="submit" className="w-full bg-orange-500 text-white py-2 mt-6 rounded-2xl hover:bg-orange-600">
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChildEditModal;