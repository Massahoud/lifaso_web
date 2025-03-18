import { FaMale, FaFemale, FaChevronRight } from "react-icons/fa";
import { Timestamp } from "firebase/firestore";

interface ChildCardProps {
  id: string;
  numero: string;
  nom_enfant: string;
  prenom_enfant: string;
  prenom_enqueteur: string;
  lieuenquete: string;
  date_heure_debut: any;
  age_enfant: string;
  sexe_enfant: string;
  nom_enqueteur: string;
  etat: string;
  photo_url: string;
}
const getEtatColor = (etat: string) => {
  switch (etat.toLowerCase()) {
    case "clôturé":
      return "bg-green-500"; // Vert
    case "nouveau":
      return "bg-yellow-400"; // Jaune
    case "en cours":
      return "bg-orange-500"; // Orange
    default:
      return "bg-gray-400"; // Gris par défaut
  }
};

const ChildCard: React.FC<ChildCardProps> = ({

  numero,
  date_heure_debut,
  nom_enqueteur,
  prenom_enfant,
  prenom_enqueteur,
  nom_enfant,
  sexe_enfant,
  etat,
  age_enfant,
  lieuenquete,
  photo_url,
}) => {
  

  let dateObj: Date | null = null;

  if (date_heure_debut instanceof Timestamp) {
    dateObj = date_heure_debut.toDate();
  } else if (
    typeof date_heure_debut === "object" &&
    "_seconds" in date_heure_debut &&
    "_nanoseconds" in date_heure_debut
  ) {
    dateObj = new Timestamp(
      date_heure_debut._seconds,
      date_heure_debut._nanoseconds
    ).toDate();
  } else if (typeof date_heure_debut === "string" || typeof date_heure_debut === "number") {
    const parsedDate = new Date(date_heure_debut);
    dateObj = isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  if (!dateObj) {
    console.error("Date invalide détectée:", date_heure_debut);
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
    <div className="w-[100%] flex items-center p-4 rounded-2xl shadow-lg bg-white min-h-[88px] gap-x-6">
      <div className="w-[15%] flex flex-col">
        <span className="font-semibold text-gray-600 text-base">{numero}</span>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>

      <div className="w-[25%] flex items-center gap-x-4">
        <img
          src={photo_url}
          alt={nom_enfant}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-600 text-base">{nom_enfant} {prenom_enfant}</p>
          <p className="text-xs text-gray-500">{lieuenquete}</p>
        </div>
      </div>

      <div className="w-[15%] flex items-center gap-x-2">
        {sexe_enfant === "M" ? (
          <FaMale className="text-blue-600 text-xl" />
        ) : (
          <FaFemale className="text-pink-600 text-xl" />
        )}
        <p className="text-gray-900 text-sm">
          {sexe_enfant}, {age_enfant} ans
        </p>
      </div>

      <div className={`w-[15%] flex justify-center`}>
  <span className={`${getEtatColor(etat)} text-white px-3 py-1 rounded-full text-xs`}>
    {etat}
  </span>
</div>


      <div className="w-[30%] text-gray-600 font-semibold text-xs text-center">
        {formattedDate} • {nom_enqueteur}, {prenom_enqueteur}
      </div>

      <div className="w-[5%] flex justify-center items-center">
        <FaChevronRight className="text-gray-500 text-2xl" />
      </div>
    </div>
  );
};

export default ChildCard;
