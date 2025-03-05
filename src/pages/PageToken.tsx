import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EnterToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");



    if (token) {
      const [realTokenBefore, realTokenAfter] = token.split("/plus");



      localStorage.setItem("token", realTokenBefore);



      const id = realTokenAfter.trim();


      if (id) {

        const cleanId = id.startsWith("/") ? id.substring(1) : id;



        navigate(`/child-detail/${cleanId}`);
      } else {
        console.log("Aucun ID trouvé.");
        navigate("/acceuil");
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
