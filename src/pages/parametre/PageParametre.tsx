import React, { useEffect, useState } from "react";
import { fetchEnquetesByUserRole } from "../../services/childService";
import { fetchDataById } from "../../services/nuagePoint";
import { updateIndice } from "../../services/parametre_services";
import Cookies from "js-cookie";
import { FaPowerOff } from "react-icons/fa";
import SearchBarWithProfile from "./seachbar";

interface Enquete {
  id: string;
  nom_enfant: string;
  prenom_enfant: string;
  numero: string;
  lecture?: boolean;
}

const PageParametre: React.FC = () => {
  const [enquetes, setEnquetes] = useState<Enquete[]>([]);
  const [filteredEnquetes, setFilteredEnquetes] = useState<Enquete[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [statuses, setStatuses] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = Cookies.get("userId");
        if (!userId) {
          setError("Utilisateur non authentifié.");
          setLoading(false);
          return;
        }

        const { data, error } = await fetchEnquetesByUserRole(userId);
        if (error) {
          setError(error);
          setLoading(false);
          return;
        }

        setEnquetes(data);
        setFilteredEnquetes(data);

        // Fetch lecture status in parallel for better performance
        const statusPromises = data.map(async (enquete:Enquete) => {
          try {
            const fetchedData = await fetchDataById(enquete.id);
            return { id: enquete.id, status: fetchedData.lecture === true };
          } catch {
            return { id: enquete.id, status: false };
          }
        });

        const results = await Promise.all(statusPromises);
        const statusMap: Record<string, boolean> = {};
        results.forEach(({ id, status }) => {
          statusMap[id] = status;
        });

        setStatuses(statusMap);
      } catch (err) {
        console.error("Erreur lors de la récupération des enquêtes :", err);
        setError("Une erreur est survenue. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleStatus = async (id: string) => {
    const newStatus = !statuses[id];
    setStatuses((prev) => ({ ...prev, [id]: newStatus }));

    try {
      await updateIndice(id, { lecture: newStatus });
    } catch (err) {
      console.error(`Erreur lors de la mise à jour de l'enquête ${id}:`, err);
    }
  };

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const filtered = enquetes.filter((e:Enquete) =>
      e.nom_enfant.toLowerCase().includes(lowerQuery) ||
      e.prenom_enfant.toLowerCase().includes(lowerQuery) ||
      e.numero.toLowerCase().includes(lowerQuery)
    );
    setFilteredEnquetes(filtered);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEnquetes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEnquetes.length / itemsPerPage);

 

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="">
        <SearchBarWithProfile onSearch={handleSearch} />
      </div>
      {loading ? (
        <div className="text-center mt-20">Chargement...</div>
      ) : error ? (
        <div className="text-center text-red-500 mt-20">{error}</div>
      ) : (
      <div className=" flex-1 overflow-auto  p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Paramètres</h1>
        <div className="bg-white shadow rounded-lg p-4">
          {currentItems.length === 0 ? (
            <p className="text-gray-500">Aucune enquête disponible.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border-b">Numero</th>
                  <th className="p-2 border-b">Nom</th>
                  <th className="p-2 border-b">Prénom</th>
                  <th className="p-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((enquete:Enquete) => (
                  <tr key={enquete.id} className="hover:bg-gray-100">
                    <td className="p-2 border-b">{enquete.numero}</td>
                    <td className="p-2 border-b">{enquete.nom_enfant}</td>
                    <td className="p-2 border-b">{enquete.prenom_enfant}</td>
                    <td className="p-2 border-b">
                      <button
                        onClick={() => toggleStatus(enquete.id)}
                        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
                          statuses[enquete.id] ? "bg-green-500" : "bg-gray-300"
                        }`}
                        title={statuses[enquete.id] ? "Activé" : "Désactivé"}
                      >
                        <FaPowerOff
                          className={`text-white transition-transform duration-300 ${
                            statuses[enquete.id] ? "rotate-0" : "rotate-180"
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Précédent
            </button>
            <span>
              Page {currentPage} sur {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
        )}
    </div>
  );
};

export default PageParametre;
