import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface MyJwtPayload extends JwtPayload {
  userId?: string; // Assurez-vous que l'ID est bien défini comme optionnel
}

const EnterToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    

    if (token) {
      
      if (!token.includes("/plus")) {
        localStorage.setItem("token", token);
        
        try {
        
          const decodedToken = jwtDecode<MyJwtPayload>(token);
          const userId = decodedToken.userId;

          if (userId) {
            localStorage.setItem("userId", userId);
          } else {
            console.error("Aucun ID utilisateur trouvé dans le token.");
          }
        } catch (error) {
          console.error("Erreur lors du décodage du token :", error);
        }
        
        navigate("/childs"); 
      } else {
       
        const parts = token.split("/plus");
        const realTokenBefore = parts[0];
        const pointId = parts.length > 1 ? parts[1] : null;

      localStorage.setItem("token", realTokenBefore);
    

      try {
        // Décodage du token avec un typage explicite
        const decodedToken = jwtDecode<MyJwtPayload>(realTokenBefore);
        const userId = decodedToken.userId;

        if (userId) {
          localStorage.setItem("userId", userId);
         
        } else {
          console.error("Aucun ID utilisateur trouvé dans le token.");
        }
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
      }

        if (pointId) {
          navigate(`/child-detail/${pointId}`); // Redirection vers /child-detail/$pointId
        } else {
          navigate("/childs"); // Redirection vers /childs si pas de pointId
        }
      }
    } else {
      console.log("Aucun token trouvé.");
    }
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Redirection en cours...</h1>
    </div>
  );
};

export default EnterToken;
