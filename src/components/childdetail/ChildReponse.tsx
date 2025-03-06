import React,{useState, useEffect } from "react";
import { Pencil } from "lucide-react"; 
import { getUserRole } from "../../services/role";

interface ResponseItem {
  numero: string;
  question_text: string;
  reponse_text: string;
}

interface ResponsesCardProps {
  responses: ResponseItem[];
}

const ResponsesCard: React.FC<ResponsesCardProps> = ({ responses }) => {
   const [userStatus, setUserStatus] = useState<string | null>(null);
    useEffect(() => {
      // Récupération du rôle utilisateur via la fonction utils
      getUserRole().then(setUserStatus);
    }, []);
  return (
    <div className="p-4">
      {/* En-tête avec le titre et l'icône d'édition */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Réponses aux questions</h2>
        {userStatus !== "enqueteur" && (
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Pencil className="h-5 w-5 text-gray-600" />
        </button>
         )}
      </div>

      {/* Liste des réponses avec scroll */}
      <div className="max-h-100 overflow-y-auto">
        {responses.length > 0 ? (
          responses.map((item, index) => (
            <div key={index} className="border-b py-2 flex justify-between items-center">
              <span className="font-regular text-gray-600">{item.numero}. {item.question_text}</span>
              <span className="font-regular text-gray-900 ml-4">{item.reponse_text}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Aucune réponse disponible.</p>
        )}
      </div>
    </div>
  );
};

export default ResponsesCard;
