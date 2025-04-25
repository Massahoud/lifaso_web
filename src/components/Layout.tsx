import { Outlet, Link, useLocation } from "react-router-dom";
import {
  FaChartLine,
  FaClipboardList,
  FaFileAlt,
  FaUsers,
  FaUsersCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import api from "../services/api";
import { useEffect, useState } from "react";

import imageName from "../assets/asdm.png";

interface User {
  statut?: string;
}

const Layout = () => {
  const userId = localStorage.getItem("userId");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation(); // Pour détecter la route active

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


  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="overflow-x-hidden">
      <div className="flex min-h-screen">
        {/* Bouton hamburger */}
        <button
          className="absolute top-4 left-4 z-50 text-gray-700 md:hidden"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
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
              <Link
                to="/childs"
                className={`flex items-center font-semibold ${
                  isActive("/childs")
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                <FaClipboardList className="mr-2" /> Mes enquêtes
              </Link>
            </li>
            <li>
              <Link
                to="/nuagedepoint"
                className={`flex items-center ${
                  isActive("/nuagedepoint")
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                <FaChartLine className="mr-2" /> Nuage de point
              </Link>
            </li>
            <li>
              <Link
                to="/formulaire"
                className={`flex items-center ${
                  isActive("/formulaire")
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                <FaFileAlt className="mr-2" /> Formulaires
              </Link>
            </li>

            {(currentUser?.statut === "admin" ||
              currentUser?.statut === "superadmin") && (
              <>
                <li>
                  <Link
                    to="/users"
                    className={`flex items-center ${
                      isActive("/users")
                        ? "text-orange-500"
                        : "text-gray-700 hover:text-orange-500"
                    }`}
                  >
                    <FaUsers className="mr-2" /> Utilisateurs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/groups"
                    className={`flex items-center ${
                      isActive("/groups")
                        ? "text-orange-500"
                        : "text-gray-700 hover:text-orange-500"
                    }`}
                  >
                    <FaUsersCog className="mr-2" /> Groupes d'utilisateurs
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Contenu principal */}
        <div className="w-4/5 flex-grow h-screen overflow-auto p-0 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
