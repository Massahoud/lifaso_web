import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page non trouvée</h1>
      <p className="text-gray-600 mb-8">La page que vous recherchez n'existe pas.</p>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
      >
        Retour à l'accueil
      </button>
    </div>
  );
};

export default NotFoundPage;