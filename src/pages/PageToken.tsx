import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface MyJwtPayload {
  userId?: string;
  role?: string;
  exp?: number;
}

const PageToken = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      // Récupération du token dans l'URL
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      // Extraire `pointId` du chemin de l'URL
      const pathParts = location.pathname.split("/");
      const pointId = pathParts.length > 2 ? pathParts[2] : null;

      console.log("pointId:", pointId);

      if (!token) {
        throw new Error("Aucun paramètre 'token' trouvé dans l'URL");
      }

      // Vérification du format du token JWT
      if (!/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_+/=]*$/.test(token)) {
        throw new Error("Format du token JWT invalide");
      }

      // Stockage du token dans le localStorage
      localStorage.setItem("token", token);

      // Décodage du token
      const decoded = jwtDecode<MyJwtPayload>(token);
      if (!decoded.userId) {
        throw new Error("Le champ userId est manquant dans le token");
      }

      localStorage.setItem("userId", decoded.userId);

      // Redirection avec `navigate`
      if (pointId) {
        navigate(`/child-detail/${encodeURIComponent(pointId)}`);
      } else {
        navigate("/childs");
      }
    } catch (error) {
      console.error("Erreur détaillée :", error);
      navigate("/auth");
    }
  }, [navigate, location]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Redirection en cours...</h1>
    </div>
  );
};

export default PageToken;
