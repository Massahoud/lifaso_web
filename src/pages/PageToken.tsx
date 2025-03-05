import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EnterToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token); // Stocker le token
      navigate("/acceuil"); // Aller à l'accueil directement
    }
  }, [navigate]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Redirection en cours...</h1>
    </div>
  );
};

export default EnterToken;
