import { Outlet, Link } from "react-router-dom";
import { FaChartLine, FaClipboardList, FaFileAlt, FaUsers, FaUsersCog, FaBars, FaTimes } from "react-icons/fa";
import api from "../services/api";
import { useEffect, useState } from "react";
import ChildList from "../pages/PageChilds";
import imageName from "../assets/asdm.png";

interface User {
  statut?: string; // Statut de l'utilisateur
}

const Layout = () => {
  const userId = localStorage.getItem("userId");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false); // État pour gérer l'ouverture de la navigation

  useEffect(() => {
    // Récupération du token dans le localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    if (!userId) return; // ✅ Ne fait rien si userId est null

    api.get(`/users/${userId}`)
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => console.error("Erreur récupération user connecté :", error));
  }, [userId]);

  // Fonction pour ajouter le token aux liens
  const generateLink = (baseUrl: string) => {
    return token ? `${baseUrl}?token=${token}` : baseUrl;
  };

  return (
    <div className="overflow-x-hidden">
      <div className="flex min-h-screen">
        {/* Bouton pour ouvrir/fermer la navigation sur petits écrans */}
        <button
          className="absolute top-4 left-4 z-50 text-gray-700 md:hidden"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
  
        {/* Barre de navigation */}
        <nav
          className={`fixed top-0 left-0 z-40 w-64 min-h-screen bg-white shadow-md p-6 transform ${
            isNavOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:relative md:translate-x-0`}
        >
          <div className="flex flex-col items-center">
            <img src={imageName} alt="Logo" className="w-50 mb-4" />
          </div>
  
          <ul className="space-y-8 text-gray-700">
            <li>
              <Link to="/childs" className="flex items-center text-orange-500 font-semibold">
                <FaClipboardList className="mr-2" /> Mes enquêtes
              </Link>
            </li>
            <li>
              <Link to={generateLink("https://v0.enquetesoleil.com/nuageDePoint")} className="flex items-center hover:text-orange-500">
                <FaChartLine className="mr-2" /> Nuage de point
              </Link>
            </li>
            <li>
              <Link to={generateLink("https://v0.enquetesoleil.com/question")} className="flex items-center hover:text-orange-500">
                <FaFileAlt className="mr-2" /> Formulaires
              </Link>
            </li>
            {(currentUser?.statut === "admin" || currentUser?.statut === "superadmin") && (
              <>
                <li>
                  <Link to={generateLink("https://v0.enquetesoleil.com/users")} className="flex items-center hover:text-orange-500">
                    <FaUsers className="mr-2" /> Utilisateurs
                  </Link>
                </li>
                <li>
                  <Link to={generateLink("https://v0.enquetesoleil.com/groups")} className="flex items-center hover:text-orange-500">
                    <FaUsersCog className="mr-2" /> Groupes d'utilisateurs
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
  
        {/* Contenu principal */}
        <div className="flex-grow h-screen overflow-auto p-0 bg-gray-100">
          <ChildList />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;