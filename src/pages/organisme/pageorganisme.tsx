import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { getAllOrganismes } from "../../services/organisme_services";

import { getUserRole } from "../../services/role";

import CreateOrganismePage from "./create_organisme";
import OrganismeSearchBar from "../../components/organisme/organisme_search";
import UpdateOrganismePage from "./update_organisme";

interface Organisme {
  id: string;
  nom: string;
  description: string;
}

const OrganismesListPage = () => {
  const [organismes, setOrganismes] = useState<Organisme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [selectedOrganismeId, setSelectedOrganismeId] = useState<string | null>(null);


  useEffect(() => {
    const fetchUserStatus = async () => {
      const userInfo = await getUserRole();
      if (userInfo) {
        setUserStatus(userInfo.statut);
      }
    };
    fetchUserStatus();
  }, []);

  useEffect(() => {
    const fetchOrganismes = async () => {
      try {
        const data = await getAllOrganismes();
        setOrganismes(data);
      } catch (err: any) {
        console.error("Erreur lors de la récupération des organismes:", err);
        setError("Erreur lors de la récupération des organismes");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrganismes();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredOrganismes = organismes.filter((org) =>
    org.nom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOrganismeClick = (org: Organisme) => {
    setSelectedOrganismeId(org.id);
  };
  

  return (
    <div className="h-full flex flex-col bg-gray-100">
      <OrganismeSearchBar onSearch={handleSearch} />

      <div className="p-6 relative">
        <div className="flex flex-wrap items-center justify-between mb-4 gap-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
    {isLoading
      ? "Chargement des organismes..."
      : `${organismes.length} organismes`}
  </h1>
          {userStatus !== "enqueteur" && (
            <button
              className="px-3 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:outline-none flex items-center"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus className="mr-2" />
              Créer un organisme
            </button>
          )}
          {isModalOpen && (
            <CreateOrganismePage onClose={() => setIsModalOpen(false)} />
          )}
        </div>
      </div>

      <div style={{ padding: "16px" }}>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress style={{ color: "#FFA500" }} />
            <Typography variant="h6" style={{ marginTop: "16px" }}>
              Chargement des organismes...
            </Typography>
          </div>
        ) : filteredOrganismes.length === 0 ? (
          console.log("Organismes:", organismes.length),
console.log("Filtrés:", filteredOrganismes.length),

          <Typography variant="h6" color="textSecondary">
            Aucun organisme disponible.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredOrganismes.map((org) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={org.id}>
                <Card
                  onClick={() => handleOrganismeClick(org)}
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <CardContent>
                    <Typography variant="h6" align="center">
                      {org.nom}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center">
                      {org.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      {error && (
        <Snackbar
          open={!!error}
          message={error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        />
      )}
      {selectedOrganismeId && (
  <UpdateOrganismePage
    organismeId={selectedOrganismeId}
    onClose={() => setSelectedOrganismeId(null)}
  />
)}

    </div>
  );
};

export default OrganismesListPage;
