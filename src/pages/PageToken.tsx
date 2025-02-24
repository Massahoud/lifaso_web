import { useState } from "react";

const PageToken = () => {
  const [token, setToken] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    alert("Token copié !");
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Saisir un Token</h1>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Entrer un token"
        className="border rounded p-2 w-full mb-2"
      />
      <button
        onClick={handleCopy}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Copier le Token
      </button>
    </div>
  );
};

export default PageToken;
