import { Input } from "../../../components/ui/input";
import { FaSearch, FaBell } from "react-icons/fa";
import { useState } from "react";
interface SearchBarWithProfileProps {
  onSearch: (query: string) => void;
}

const SearchBarWithProfile: React.FC<SearchBarWithProfileProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Appelle la fonction passée en prop
  };

  return (
    <div className="flex items-center justify-between  px-8 py-6 bg-white shadow-md ">
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
      <div className="flex items-center space-x-2 cursor-pointer">
        <img
          src="https://randomuser.me/api/portraits/men/10.jpg"
          alt="Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-medium">Dylan Grava</p>
          <p className="text-xs text-gray-500">Enquêteur</p>
        </div>
      </div>
    </div>
  );
};

export default SearchBarWithProfile;
