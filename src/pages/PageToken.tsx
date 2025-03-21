import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface MyJwtPayload {
  userId?: string;
  role?: string;
  exp?: number;
}

const PageToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Récupération du token dans l'URL
      const params = new URLSearchParams(window.location.search);
      const rawTokenParam = params.get("token");

      if (!rawTokenParam) {
        throw new Error("Aucun paramètre 'token' trouvé dans l'URL");
      }

      // Décodage du token et extraction de l'ID utilisateur
      const decodedTokenParam = decodeURIComponent(rawTokenParam);
      const separator = "|plus|";
      const [token, pointId] = decodedTokenParam.includes(separator)
        ? decodedTokenParam.split(separator)
        : [decodedTokenParam, null];

      if (!/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_+/=]*$/.test(token)) {
        throw new Error("Format du token JWT invalide");
      }

      localStorage.setItem("token", token);

      const decoded = jwtDecode<MyJwtPayload>(token);
      if (!decoded.userId) {
        throw new Error("Le champ userId est manquant dans le token");
      }

      localStorage.setItem("userId", decoded.userId);

      // Redirection définitive
      if (pointId) {
        window.location.href = `/child-detail/${encodeURIComponent(pointId)}`;
      } else {
        window.location.href = "/childs";
      }
    } catch (error) {
      console.error("Erreur détaillée :", error);
      window.location.href = "/auth";
    }
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Redirection en cours...</h1>
    </div>
  );
};

export default PageToken;
