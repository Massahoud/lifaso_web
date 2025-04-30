import  { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Avatar,
  Snackbar,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { fetchGroups, fetchGroupMembers } from "../../services/groups_service";
import CreateGroupPage from "./create_Groupe";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../../services/role";
import GroupeSeachbar from "../../components/groups/group_seachbar";

import { getAllOrganismes } from "../../services/organisme_services";
import { deleteGroup } from "../../services/groups_service";
interface User {
  id: string;
  nom: string;
  prenom: string;
  photo?: string;
}

interface Group {
  id: string;
  nom: string;
  description: string;
  organismeid?: string; // ID de l'organisme
  membres: string[]; // Liste des IDs des membres
}

const GroupsListPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupMembers, setGroupMembers] = useState<Record<string, User[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [organismes, setOrganismes] = useState<{ id: string; nom: string }[]>([]);
const [selectedOrganismeId, setSelectedOrganismeId] = useState<string | null>(null);

  const navigate = useNavigate();
   useEffect(() => {
     const fetchUserStatus = async () => {
       const userInfo = await getUserRole();
       if (userInfo) {
         setUserStatus(userInfo.statut); // extrait uniquement le statut
       }
     };
     fetchUserStatus();
   }, []);
   useEffect(() => {
    const fetchAllOrganismes = async () => {
      try {
        const data = await getAllOrganismes();
        setOrganismes(data);
      } catch (err: any) {
        setError(`Erreur lors du chargement des organismes : ${err.message}`);
      }
    };
    fetchAllOrganismes();
  }, []);
  

const handleDeleteGroup = async (groupId: string) => {
  if (!window.confirm("Es-tu sûr de vouloir supprimer ce groupe ?")) return;

  try {
    await deleteGroup(groupId);
    setGroups(prev => prev.filter(group => group.id !== groupId));
  } catch (err: any) {
    setError(`Erreur lors de la suppression du groupe : ${err.message}`);
  }
};

  
  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        
        const fetchedGroups = await fetchGroups();
      

        const membersMap: Record<string, User[]> = {};

        for (const group of fetchedGroups) {
          
          const members = await fetchGroupMembers(group.membres);
          
          membersMap[group.id] = members;
        }

        setGroups(fetchedGroups);
        setGroupMembers(membersMap);
       
      } catch (err: any) {
        console.error("Error fetching groups or members:", err);
        setError(`Erreur lors de la récupération des groupes : ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllGroups();
  }, []);

  const handleGroupClick = (group: Group) => {
    
    navigate(`/group_membres`, { state: { groupId: group.id } });
  };
  const handleSearch = (query: string) => {
  
    setSearchQuery(query);
  };

  const filteredGroups = groups
  .filter(group => group.nom.toLowerCase().includes(searchQuery.toLowerCase()))
  .filter(group => !selectedOrganismeId || group.organismeid === selectedOrganismeId);

 

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Barre de recherche */}
      <GroupeSeachbar onSearch={handleSearch} />
  
       <div className="p-6 relative">
            <div className="flex flex-wrap items-center justify-between mb-4 gap-y-4">
              {/* Titre */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {groups.length} groupes utilisateurs
              </h1>

              <div className="flex items-center ">
  <label className="mr-2 font-semibold">Filtrer par organisme :</label>
  <select
    className="border border-gray-300 rounded-full p-2  text-black   "
    value={selectedOrganismeId || ""}
    onChange={(e) => setSelectedOrganismeId(e.target.value || null)}
  >
    <option value="" >Tous les organismes</option>
    {organismes.map((org) => (
      <option key={org.id} value={org.id}>{org.nom}</option>
    ))}
  </select>
</div>

              {/* Boutons */}
              <div className="flex items-center gap-x-2 gap-y-0 flex-wrap relative">
              {userStatus !== "enqueteur" && (
                <button
                  className="px-3 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:outline-none flex items-center cursor-pointer"
                  onClick={() => setIsModalOpen(true)}>
                   <FaPlus className="mr-2" />
                  Créer une groupe
                </button>
                    )}

                   
              </div>
                   {isModalOpen && <CreateGroupPage onClose={() => setIsModalOpen(false)} />}
               
            </div>
          </div>
  
      {/* Contenu principal */}
      <div style={{ padding: "16px"}}>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress style={{ color: "#FFA500" }} />
            <Typography variant="h6" color="textSecondary" style={{ marginTop: "16px" }}>
              Chargement des groupes...
            </Typography>
          </div>
        ) : filteredGroups.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            Aucun groupe disponible.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredGroups.map((group) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={group.id}>
                <Card
                  onClick={() => handleGroupClick(group)}
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <CardContent>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "16px", justifyContent: "center" }}>
                      {groupMembers[group.id]?.slice(0, 4).map((member, index) => (
                        <Avatar
                          key={index}
                          src={member.photo || "/default_avatar.png"}
                          alt={member.nom}
                          style={{ marginRight: "-8px" }}
                        />
                      ))}
                      {group.membres.length > 4 && (
                        <Typography variant="body2" style={{ marginLeft: "8px" }}>
                          +{group.membres.length - 4}
                        </Typography>
                      )}
                    </div>
                    <Typography variant="h6" align="center">
                      {group.nom}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center">
                      {group.description}
                    </Typography>
                    <div className="flex justify-end">
    {userStatus !== "enqueteur" && userStatus !== "admin" && (
      <button
        className="text-red-600 hover:text-red-800 text-sm"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteGroup(group.id);
        }}
      >
        Supprimer
      </button>
    )}
  </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
  
      {/* Snackbar pour les erreurs */}
      {error && (
        <Snackbar
          open={!!error}
          message={error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
};

export default GroupsListPage;