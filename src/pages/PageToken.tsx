import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnterToken = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token) {
      localStorage.setItem("token", token); // Stocker le token
      navigate("/acceuil"); // Rediriger vers la liste après saisie
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Entrer votre Token</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Votre token ici"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Valider
        </button>
      </form>
    </div>
  );
};

export default EnterToken;
