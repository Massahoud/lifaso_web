import { Outlet, Link } from "react-router-dom";
import { FaChartLine, FaFileAlt, FaUsers, FaUsersCog } from "react-icons/fa";

import ChildList from "../pages/PageChilds";
import imageName from "../assets/logo.png";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      
      {/* Barre de navigation */}
      <nav className="w-1/5 min-h-screen bg-white shadow-md p-6">
        <div className="flex flex-col items-center">
          <img src={imageName} alt="Logo" className="w-24 mb-4" />
        </div>

        <ul className="space-y-4 text-gray-700">
          <li>
            <Link to="/" className="flex items-center text-orange-500 font-semibold">
              📋 Mes enquêtes
            </Link>
          </li>
          <li>
            <Link to="/child-detail" className="flex items-center hover:text-orange-500">
              <FaChartLine className="mr-2" /> detail
            </Link>
          </li>
          <li>
            <Link to="/radar" className="flex items-center hover:text-orange-500">
              <FaFileAlt className="mr-2" /> radar
            </Link>
          </li>
          <li>
            <Link to="/chat" className="flex items-center hover:text-orange-500">
              <FaUsers className="mr-2" /> avis
            </Link>
          </li>
          <li>
            <Link to="/reponse" className="flex items-center hover:text-orange-500">
              <FaUsersCog className="mr-2" /> indices
            </Link>
          </li>
        </ul>
      </nav>

     {/* Contenu dynamique */}
<div className="w-4/5 p-0 bg-gray-100">
<ChildList />
  <Outlet />
</div>

    </div>
  );
};

export default Layout;
