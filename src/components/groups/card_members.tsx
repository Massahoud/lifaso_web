import {  FaTrash } from "react-icons/fa";
import api from "../../services/api";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
interface User {
  statut?: string;
}

interface GroupCardProps {
  id: string;
  numero: string;
  nom: string;
  prenom: string;
  email: string;
  photo: string;
  statut: string;
  groupe: string;
  date_creation: string;
  children?: React.ReactNode; // Ajoutez cette ligne
  onDelete: (id: string, statut: string) => void; // Nouvelle prop pour la suppression
}

const GroupCard: React.FC<GroupCardProps> = ({
  id,
  numero,
  nom,
  prenom,
  email,
  photo,
  statut,
  groupe,
  date_creation,
  onDelete,
}) => {
  const handleDeleteClick = () => {
    const confirmation = window.confirm(
      `Êtes-vous sûr de vouloir supprimer ${nom} ${prenom} (${statut}) du groupe ?`
    );
    if (confirmation) {
      onDelete(id, statut); // Appel de la fonction de suppression si confirmé
    }
  };
  const userId = Cookies.get('userId'); 
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
   
  
    if (!userId) return;

    api
      .get(`/users/${userId}`)
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) =>
        console.error("Erreur récupération user connecté :", error)
      );
  }, [userId]);
  return (
    <div className="w-full flex flex-wrap md:flex-nowrap items-center p-4 rounded-2xl shadow-lg bg-white min-h-[88px] gap-y-4 md:gap-x-6">
      <div className="w-full md:w-[15%] flex flex-col items-start md:items-center">
        <span className="font-semibold text-gray-600 text-base">{numero}</span>
        <span className="text-xs text-gray-500">{date_creation}</span>
      </div>

      <div className="w-full md:w-[25%] flex items-center gap-x-4">
        <div
          className="w-14 h-14 rounded-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${photo})`,
            backgroundPosition: "top 30%",
          }}
        ></div>
        <div>
          <p className="font-semibold text-gray-600 text-base">
            {nom} {prenom}
          </p>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      </div>

      <div className="w-full md:w-[15%] flex justify-start md:justify-center">
        {statut}
      </div>

      <div className="w-full md:w-[30%] text-gray-600 font-semibold text-xs text-left md:text-center">
        {groupe}
      </div>
      {(currentUser?.statut === "admin" ||
              currentUser?.statut === "superadmin" ) && (
              <>
      <div className="w-full md:w-[5%] flex justify-end md:justify-center items-center">
        <FaTrash
          className="text-red-500 text-2xl cursor-pointer hover:text-red-700"
          onClick={handleDeleteClick}
        />
      </div>
      </>
            )}
    </div>
  );
};

export default GroupCard;