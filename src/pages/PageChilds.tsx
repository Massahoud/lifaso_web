import { Link } from "react-router-dom";

const PageChilds = () => {
  const childs = [
    { id: 1, name: "Enfant 1" },
    { id: 2, name: "Enfant 2" },
    { id: 3, name: "Enfant 3" },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Liste des Enfants</h1>
      <ul className="space-y-2">
        {childs.map((child) => (
          <li key={child.id}>
            <Link
              to={`/child/${child.id}`}
              className="text-blue-500 hover:underline"
            >
              {child.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageChilds;
