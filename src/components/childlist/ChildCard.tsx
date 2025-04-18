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
  derniere_modification?: Modification[];
}
interface Modification {
  nom: string;
  prenom: string;
  date: string;
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
  derniere_modification,
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

  let displayText = `${formattedDate} • ${nom_enqueteur}, ${prenom_enqueteur}`;

  if (derniere_modification && derniere_modification.length > 0) {
    const lastModif = derniere_modification[derniere_modification.length - 1];
    displayText = `${lastModif.date} • ${lastModif.nom} ${lastModif.prenom}`;
  }
 

  return (
    <div className="w-full flex flex-wrap md:flex-nowrap items-center p-4 rounded-2xl shadow-lg bg-white min-h-[88px] gap-y-4 md:gap-x-6">
      <div className="w-full md:w-[15%] flex flex-col items-start md:items-center">
        <span className="font-semibold text-gray-600 text-base">{numero}</span>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>
  
      <div className="w-full md:w-[25%] flex items-center gap-x-4">
        <div
          className="w-14 h-14 rounded-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${photo_url})`,
            backgroundPosition: "top 30%",
          }}
        ></div>
        <div>
          <p className="font-semibold text-gray-600 text-base">
            {nom_enfant} {prenom_enfant}
          </p>
          <p className="text-xs text-gray-500">{lieuenquete}</p>
        </div>
      </div>
  
      <div className="w-full md:w-[15%] flex items-center gap-x-2">
        {sexe_enfant === "M" ? (
          <FaMale className="text-blue-600 text-xl" />
        ) : (
          <FaFemale className="text-pink-600 text-xl" />
        )}
        <p className="text-gray-900 text-sm">
          {sexe_enfant}, {age_enfant} ans
        </p>
      </div>
  
      <div className="w-full md:w-[15%] flex justify-start md:justify-center">
        <span
          className={`${getEtatColor(etat)} text-white px-3 py-1 rounded-full text-xs`}
        >
          {etat}
        </span>
      </div>
  
      <div className="w-full md:w-[30%] text-gray-600 font-semibold text-xs text-left md:text-center">
      {displayText}

      </div>
  
      <div className="w-full md:w-[5%] flex justify-end md:justify-center items-center">
        <FaChevronRight className="text-gray-500 text-2xl" />
      </div>
    </div>
  );
};

export default ChildCard;
