import { Input } from "../../../components/ui/input";
import { FaSearch, FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "../../services/api";

interface SearchBarWithProfileProps {
  onSearch: (query: string) => void;
}

interface User {
  id: string;
  nom: string;
  prenom: string;
  photo: string;
  statut?: string; // Ajout de statut si nécessaire
}

const SearchBarWithProfile: React.FC<SearchBarWithProfileProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const userId = localStorage.getItem("userId");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  useEffect(() => {
    if (!userId) return;

    api.get(`/users/${userId}`)
      .then((response) => setCurrentUser(response.data))
      .catch((error) => console.error("Erreur récupération user connecté :", error));
  }, [userId]);

  return (
    <div className="flex items-center justify-between px-8 py-6 bg-white shadow-md">
      {/* Barre de recherche */}
      <div className="relative w-[50%]">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Rechercher un N° d’enquête, Nom, Prénom, ..."
          value={query}
          onChange={handleSearch}
          className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-400"
        />
      </div>

      {/* Icône de notification */}
      <button className="relative p-2 rounded-full hover:bg-gray-100">
        <FaBell className="text-gray-600" size={18} />
      </button>

      {/* Profil utilisateur */}
      {currentUser && (
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src={currentUser.photo}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">{currentUser.prenom} {currentUser.nom}</p>
            {currentUser.statut && <p className="text-xs text-gray-500">{currentUser.statut}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBarWithProfile;
