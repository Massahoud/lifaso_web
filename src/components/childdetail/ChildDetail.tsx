import React, { useState, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Calendar, MapPin, Phone, User, Pencil } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import ChildEditModal from "./EditChildDetail";

interface Child {
  id: string;
  nom_enfant: string;
  age_enfant: string;
  sexe_enfant: string;
  lieuenquete: string;
  prenom_enfant: string;
  numero: string;
  date_heure_debut: any;
  prenom_enqueteur: string;
  nom_enqueteur: string;
  contactPhone?: string;
  photo_url?: string;
  contact_enfant: string;
  nomcontact_enfant: string;
}

const ChildDetail: React.FC<{ child: Child }> = ({ child }) => {
  const [childData, setChildData] = useState({
    id:"",
    nom_enfant: "",
    prenom_enfant: "",
    age_enfant: "",
    sexe_enfant: "",
    
    nomcontact_enfant: "",
    contact_enfant: "",
  });

  useEffect(() => {
    setChildData({
      id: child.id,
      nom_enfant: child.nom_enfant,
      prenom_enfant: child.prenom_enfant,
      age_enfant: child.age_enfant,
      sexe_enfant: child.sexe_enfant,
      
      nomcontact_enfant: child.nomcontact_enfant,
      contact_enfant: child.contact_enfant,
    });
  }, [child]);

  const handleSave = (updatedData: any) => {
    setChildData(updatedData);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  let dateObj: Date | null = null;

  if (child.date_heure_debut instanceof Timestamp) {
    dateObj = child.date_heure_debut.toDate();
  } else if (
    typeof child.date_heure_debut === "object" &&
    "_seconds" in child.date_heure_debut &&
    "_nanoseconds" in child.date_heure_debut
  ) {
    dateObj = new Timestamp(
      child.date_heure_debut._seconds,
      child.date_heure_debut._nanoseconds
    ).toDate();
  } else if (
    typeof child.date_heure_debut === "string" ||
    typeof child.date_heure_debut === "number"
  ) {
    const parsedDate = new Date(child.date_heure_debut);
    dateObj = isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  if (!dateObj) {
    console.error("Date invalide détectée:", child.date_heure_debut);
    dateObj = new Date();
  }

  const formattedDate = dateObj.toLocaleString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-full space-y-5">
      <div className="relative rounded-2xl">
        <img
          src={child.photo_url || "https://via.placeholder.com/150"}
          alt={child.nom_enfant}
          className="w-full h-130 object-cover rounded-xl"
        />
        <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
          {child.sexe_enfant}
        </Badge>
      </div>
      <Card className="mt-4 rounded-2xl shadow-lg bg-white p-4">
        <p className="text-gray-500 flex items-center">
          Réalisée le {formattedDate}
          <button
            className="ml-2 text-blue-500 hover:text-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            <Pencil className="w-12 h-4 text-gray-600" />
          </button>
        </p>
        <p className="flex items-center mt-2">
          <Calendar className="w-5 h-4 mr-2" /> {child.age_enfant} ans
        </p>
        <p className="flex items-center mt-2">
          <MapPin className="w-5 h-4 mr-2" /> {child.lieuenquete}
        </p>
        <p className="flex items-center mt-2">
          <User className="w-5 h-4 mr-2" /> {child.sexe_enfant}
        </p>
        <div className="mt-4 border-t pt-2">
          <p className="text-gray-600 font-semibold">Contact</p>
          <p className="font-medium">{child.nomcontact_enfant}</p>
          <p className="flex items-center text-blue-500 mt-1">
            <Phone className="w-4 h-4 mr-2" /> {child.contact_enfant || "N/A"}
          </p>
        </div>
      </Card>

      <ChildEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        child={childData}
        onSave={handleSave}
      />
    </div>
  );
};

export default ChildDetail;
