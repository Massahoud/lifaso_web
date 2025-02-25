import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/childlist/SearchBar";
import ChildCard from "../components/childlist/ChildCard";
import Pagination from "../components/childlist/Pagination";
import EnquetesPage from "../components/childlist/filterChild";

const API_URL = "http://192.168.1.70:3000/api/enquete";
const ITEMS_PER_PAGE = 10;

interface Child {
  id: string;
  numero: string;
  nom_enfant: string;
  lieuenquete: string;
  date_heure_debut: any;
  age_enfant: string;
  sexe_enfant: string;
  prenom_enfant: string;
  prenom_enqueteur: string;
  nom_enqueteur: string;
  photo_url: string;
}

const ChildList = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [filteredChildren, setFilteredChildren] = useState<Child[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get(API_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setChildren(response.data);
        setFilteredChildren(response.data);
      })
      .catch((error) => console.error("Erreur API :", error));
  }, [navigate]);

  // Fonction de filtrage des enfants
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
    setCurrentPage(1); // Réinitialise la pagination après une recherche
  }, [searchQuery, children]);

  const totalPages = Math.ceil(filteredChildren.length / ITEMS_PER_PAGE);
  const currentChildren = filteredChildren.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className=" ">
      <SearchBar onSearch={setSearchQuery} />
      <EnquetesPage />
      <div className="space-y-4 p-4">
        {currentChildren.map((child) => (
          <div key={child.id} onClick={() => navigate(`/page-childs/${child.id}`)}>
            <ChildCard {...child} id={child.id} />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ChildList;
