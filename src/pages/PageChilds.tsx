import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../components/childlist/SearchBar";
import ChildCard from "../components/childlist/ChildCard";
import Pagination from "../components/childlist/Pagination";
import EnquetesPage from "../components/childlist/filterChild";
import { fetchChildren } from "../services/childService";

const ITEMS_PER_PAGE = 30;

interface Child {
  id: string;
  numero: string;
  nom_enfant: string;
  lieuenquete: string;
  date_heure_debut: any;
  age_enfant: string;
  sexe_enfant: string;
  prenom_enfant: string;
  nom_enqueteur: string;
  prenom_enqueteur: string;
  photo_url: string;
}

const ChildList = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [filteredChildren, setFilteredChildren] = useState<Child[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadChildren = async () => {
      setLoading(true);
      const data = await fetchChildren();
      setChildren(data);
      setFilteredChildren(data);
      setLoading(false);
    };

    loadChildren();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredChildren(children);
      return;
    }

    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = children.filter((child) =>
      child.numero.toLowerCase().includes(lowercasedQuery) ||
      child.nom_enfant.toLowerCase().includes(lowercasedQuery) ||
      child.prenom_enfant.toLowerCase().includes(lowercasedQuery) ||
      child.lieuenquete.toLowerCase().includes(lowercasedQuery) ||
      child.nom_enqueteur.toLowerCase().includes(lowercasedQuery) ||
      child.prenom_enqueteur.toLowerCase().includes(lowercasedQuery)
    );

    setFilteredChildren(filtered);
    setCurrentPage(1);
  }, [searchQuery, children]);

  const totalPages = Math.ceil(filteredChildren.length / ITEMS_PER_PAGE);
  const currentChildren = filteredChildren.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Barre de recherche et filtres fixes */}
      <SearchBar onSearch={setSearchQuery} />
      <EnquetesPage />

      {/* Tableau des enquêtes */}
      <div className="">
        <table className="min-w-full">
          <thead>
            <tr className="border-gray-200 text-gray-600">
              <th className="py-3 px-6 text-left">Enquête +</th>
              <th className="py-3 px-12 text-left">Enfant</th>
              <th className="py-3 px-6 text-left">Sexe / Âge</th>
              <th className="py-3 px-15 text-left">État</th>
              <th className="py-3 px-6 text-left">Dernière intervention</th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Liste avec défilement */}
      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4 cursor-pointer">
            {currentChildren.map((child) => (
              <div key={child.id} onClick={() => navigate(`/child-detail/${child.id}`)}>
                <ChildCard {...child} id={child.id} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination fixe en bas */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ChildList;