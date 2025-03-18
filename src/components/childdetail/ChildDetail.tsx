import React, { useState, useEffect } from "react";
import { Card } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Calendar, MapPin, Phone, User, Pencil, ChevronDown, Check } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import ChildEditModal from "./EditChildDetail";
import { getUserRole } from "../../services/role";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../../../components/ui/dialog";
import { updateEtat } from "../../services/childService";

const stateOptions = ["Nouveau", "En cours", "Clôturé"];
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
  etat: string;
  nomcontact_enfant: string;
}

const ChildDetail: React.FC<{ child: Child }> = ({ child }) => {
  const [childData, setChildData] = useState({
    id:"",
    nom_enfant: "",
    prenom_enfant: "",
    age_enfant: "",
    sexe_enfant: "",
    etat: "",
    nomcontact_enfant: "",
    contact_enfant: "",
  });
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedEtat, setSelectedEtat] = useState(child.etat);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [pendingEtat, setPendingEtat] = useState("");
  useEffect(() => {
   
    getUserRole().then(setUserStatus);
  }, []);

  useEffect(() => {
    setChildData({
      id: child.id,
      nom_enfant: child.nom_enfant,
      prenom_enfant: child.prenom_enfant,
      age_enfant: child.age_enfant,
      sexe_enfant: child.sexe_enfant,
      etat: child.etat,
      nomcontact_enfant: child.nomcontact_enfant,
      contact_enfant: child.contact_enfant,
    });
  }, [child]);

  const handleSave = (updatedData: any) => {
    setChildData(updatedData);
  };

  const handleEtatChange = (newEtat: string) => {
    if (newEtat !== selectedEtat) {
      setPendingEtat(newEtat);
      setIsConfirmDialogOpen(true);
    }
    setIsDropdownOpen(false);
  };

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
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <Badge className={
            `text-white ${
              selectedEtat === "Nouveau" ? "bg-yellow-500" :
              selectedEtat === "En cours" ? "bg-orange-500" : 
              "bg-green-500"
            }`
          }>
            {selectedEtat}
          </Badge>
          {userStatus !== "enqueteur" && (
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-white bg-black/20 rounded-full p-1 hover:bg-black/30 transition-colors"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
          )}
          </div>
          {isDropdownOpen && (
          <div className="absolute top-10 right-2 w-40 bg-white rounded-lg shadow-lg z-50 border">
            {stateOptions.map((option) => (
              <div
                key={option}
                onClick={() => handleEtatChange(option)}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <span>{option}</span>
                {option === selectedEtat && <Check className="w-4 h-4 text-green-500" />}
              </div>
            ))}
          </div>
        )}
      </div>
      <Card className="mt-4 rounded-2xl shadow-lg bg-white p-4">
        <p className="text-gray-500 flex items-center">
          Réalisée le {formattedDate}
          {userStatus !== "enqueteur" && (
          <button
            className="ml-2 text-blue-500 hover:text-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            <Pencil className="w-12 h-4 text-gray-600" />
          </button>
            )}
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
  {/* Dialogue de confirmation */}
  <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>Confirmation requise</DialogHeader>
          <p>
            Voulez-vous vraiment changer l'état de "{selectedEtat}" à "{pendingEtat}" ?
          </p>
          <DialogFooter className="mt-4">
          <button
  onClick={async () => {
    try {
      await updateEtat(child.id, { id: child.id, etat: pendingEtat });
      setSelectedEtat(pendingEtat);
      setIsConfirmDialogOpen(false);
    } catch (error) {
      console.error("Erreur de mise à jour de l'état :", error);
    }
  }}
  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
>
  Confirmer
</button>

          </DialogFooter>
        </DialogContent>
      </Dialog>
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
