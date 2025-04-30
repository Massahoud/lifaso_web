import { Input } from "../../../components/ui/input";
import { FaSearch, FaUser } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Cookies from "js-cookie";
interface SearchBarWithProfileProps {
  onSearch: (query: string) => void;
}

interface User {
  id: string;
  nom: string;
  prenom: string;
  photo: string;
  statut?: string; 
}

const SearchBarWithProfile: React.FC<SearchBarWithProfileProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const userId = Cookies.get("userId");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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

 
  const handleLogout = () => {
    Cookies.remove("userId"); 
    Cookies.remove("token");
    Cookies.remove("userRole"); 
    navigate("/");
  };

  useEffect(() => {
    if (!userId) return;
  
    setLoading(true); // Commencer en loading
  
    api.get(`/users/${userId}`)
      .then((response) => setCurrentUser(response.data))
      .catch((error) => console.error("Erreur récupération user connecté :", error))
      .finally(() => setLoading(false)); 
  }, [userId]);
  

  return (
    <div className="w-full flex justify-end px-4 md:px-8 py-4 md:py-6 shadow-md bg-white">
      <div className="w-[90%] flex flex-col md:flex-row items-center justify-between gap-y-4">
        
        {/* Barre de recherche */}
        <div className="relative w-[90%] md:w-1/2 self-end md:self-auto">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher un N° d’enquête, Nom, Prénom, ..."
            value={query}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-400"
          />
        </div>
  
        <div className="hidden md:flex relative items-center space-x-4">
  {loading ? (
    // ✅ Pendant le chargement
    <div className="flex items-center">
      <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-orange-400 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  ) : currentUser && (
    // ✅ Quand c'est chargé
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
      <img
        src={currentUser.photo}
        alt="Avatar"
        className="w-8 h-8 md:w-10 md:h-10 rounded-full"
      />
      <div className="hidden md:block">
        <p className="text-sm font-medium">
          {currentUser.prenom} {currentUser.nom}
        </p>
        {currentUser.statut && (
          <p className="text-xs text-gray-500">{currentUser.statut}</p>
        )}
      </div>
    </div>
  )}
  
  {/* Menu déroulant */}
  {menuOpen && currentUser && (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border z-50"
    >
      <button
        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
        onClick={() => navigate(`/users/profile/${currentUser.id}`)}
      >
        <FaUser className="mr-2" /> Mes informations
      </button>
      <hr className="my-1" />
      <button
        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
        onClick={handleLogout}
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17l5-5m0 0l-5-5m5 5H9m4 9a9 9 0 110-18 9 9 0 0110 9"
          />
        </svg>
        Se déconnecter
      </button>
    </div>
  )}
</div>

      </div>
    </div>
  );
  
};

export default SearchBarWithProfile;
