import { useParams } from "react-router-dom";

const PageChild = () => {
  const { id } = useParams();

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Détails de l'Enfant</h1>
      <p>ID de l'enfant : <span className="font-semibold">{id}</span></p>
    </div>
  );
};

export default PageChild;
