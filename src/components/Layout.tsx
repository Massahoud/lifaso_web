import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Barre de navigation */}
      <nav className="w-full max-w-3xl bg-white shadow-md rounded-lg p-4 mb-6 flex justify-around">
        <Link to="/" className="text-blue-500 hover:underline">Accueil</Link>
        <Link to="/token" className="text-blue-500 hover:underline">Saisir un Token</Link>
      </nav>

      {/* Contenu dynamique */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
