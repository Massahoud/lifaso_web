import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/childlist/SearchBar";
import ChildCard from "../components/childlist/ChildCard";
import Pagination from "../components/childlist/Pagination";
import EnquetesPage from "../components/childlist/filterChild";
import { fetchEnquetesByUserRole } from "../services/childService";

const ITEMS_PER_PAGE = 50;

interface Child {
  id: string;
  numero: string;
  nom_enfant: string;
  lieuenquete: string;
  date_heure_debut: any;
  age_enfant: string;
  sexe_enfant: string;
  prenom_enfant: string;
  etat: string;
  nom_enqueteur: string;
  prenom_enqueteur: string;
  photo_url: string;
}

const ChildList = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [filteredChildren, setFilteredChildren] = useState<Child[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadChildren = async () => {
      setLoading(true);
    
      // Récupérer l'ID utilisateur depuis le localStorage
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("Aucun ID utilisateur trouvé dans le localStorage.");
        setLoading(false);
        return;
      }
    
      try {
        // Vérifiez que l'ID utilisateur est valide
        console.log("ID utilisateur récupéré :", userId);
    
        // Appeler fetchEnquetesByUserRole avec l'ID utilisateur
        const data = await fetchEnquetesByUserRole(userId);
        setChildren(data);
        setFilteredChildren(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des enquêtes :", error);
      } finally {
        setLoading(false);
      }
    };
    loadChildren();
  }, []);

  useEffect(() => {
    let filtered = children;

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((child) => {
        if (child.numero === searchQuery) {
          return true;
        }

        return (
          child.nom_enfant.toLowerCase().includes(lowercasedQuery) ||
          child.prenom_enfant.toLowerCase().includes(lowercasedQuery) ||
          child.lieuenquete.toLowerCase().includes(lowercasedQuery) ||
          child.nom_enqueteur.toLowerCase().includes(lowercasedQuery) ||
          child.prenom_enqueteur.toLowerCase().includes(lowercasedQuery)
        );
      });
    }

    if (selectedState) {
      filtered = filtered.filter((child) => child.etat === selectedState);
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      filtered = filtered.filter((child) => {
        let childDate: Date | null = null;

        if (
          typeof child.date_heure_debut === "object" &&
          "_seconds" in child.date_heure_debut &&
          "_nanoseconds" in child.date_heure_debut
        ) {
          childDate = new Date(child.date_heure_debut._seconds * 1000);
        } else {
          childDate = new Date(child.date_heure_debut);
        }

        if (!childDate || isNaN(childDate.getTime())) {
          console.error("Invalid date for child:", child);
          return false;
        }

        return childDate >= start && childDate <= end;
      });
    }

    setFilteredChildren(filtered);
  }, [searchQuery, children, selectedState, startDate, endDate]);

  const handleFilterByDate = (start: string | null, end: string | null) => {
    setStartDate(start);
    setEndDate(end);

    if (!start && !end) {
      setFilteredChildren(children);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const totalPages = Math.ceil(filteredChildren.length / ITEMS_PER_PAGE);

  const paginatedChildren = filteredChildren.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <SearchBar onSearch={setSearchQuery} />
      <EnquetesPage
        onFilterByState={setSelectedState}
        onFilterByDate={handleFilterByDate}
        totalEnquetes={children.length}
      />

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
      <div ref={scrollContainerRef} className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4 cursor-pointer">
            {paginatedChildren.map((child) => (
              <div key={child.id} onClick={() => navigate(`/child-detail/${child.id}`)}>
                <ChildCard {...child} id={child.id} />
              </div>
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ChildList;