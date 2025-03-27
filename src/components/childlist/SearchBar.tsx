import { Input } from "../../../components/ui/input";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken"); // Supprime aussi le token
    window.location.href = "https://v0.enquetesoleil.com";
  };

  useEffect(() => {
    if (!userId) return;

    api.get(`/users/${userId}`)
      .then((response) => setCurrentUser(response.data))
      .catch((error) => console.error("Erreur récupération user connecté :", error));
  }, [userId]);

  return (
    <div className="flex items-center justify-between px-8 py-6 shadow-md bg-white relative">
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
        <div className="relative">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
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

          {/* Menu déroulant */}
          {menuOpen && (
            <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border z-50">
              <button 
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => navigate("/profile")}
              >
                <FaUser className="mr-2" /> Mes informations
              </button>
              <hr className="my-1" />
              <button 
                className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17l5-5m0 0l-5-5m5 5H9m4 9a9 9 0 110-18 9 9 0 0110 9" />
                </svg>
                Se déconnecter
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBarWithProfile;
