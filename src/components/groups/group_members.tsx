import  { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getGroupById, fetchGroupMembers, fetchGroupAdmins ,removeMemberFromGroup, removeAdminFromGroup} from "../../services/groups_service";
import GroupCard from "../groups/card_members";
import { CircularProgress, Typography } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import GroupMemberSeach from "./search_members";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material"; // Import des composants Snackbar et Alert
import { IoChevronBack } from "react-icons/io5";
interface User {
  id: string;
  nom: string;
    numero: string;
  prenom: string;
  email: string;
  photo?: string;
  statut?: string;
}

interface Group {
  id: string;
  nom: string;
  description: string;
  membres: string[];
  administrateurs: string[]; // Liste des IDs des administrateurs
  date_creation: string;
}
const GroupMembersPage = () => {
  const location = useLocation();
  const { groupId } = location.state || {};
  const [group, setGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [administrateurs, setAdmins] = useState<User[]>([]); // Nouvel état pour les administrateurs
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingAdmins, setIsLoadingAdmins] = useState<boolean>(true); // Chargement pour les admins
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [filteredMembers, setFilteredMembers] = useState<User[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // État pour le message de succès
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false); // État pour contrôler l'ouverture du Snackbar
 
  useEffect(() => {
    const filterUsers = () => {
      const lowercasedQuery = searchQuery.toLowerCase();
  
      // Filtrer les membres
      const filtered = members.filter((child) => {
        return (
          child.numero.includes(searchQuery) ||
          child.nom.toLowerCase().includes(lowercasedQuery) ||
          child.prenom.toLowerCase().includes(lowercasedQuery)
        );
      });
  
      // Filtrer les administrateurs
      const filteredAdmins = administrateurs.filter((admin) => {
        return (
          admin.numero.includes(searchQuery) ||
          admin.nom.toLowerCase().includes(lowercasedQuery) ||
          admin.prenom.toLowerCase().includes(lowercasedQuery)
        );
      });
  
      // Mettre à jour uniquement les membres filtrés
      setFilteredMembers([...filtered, ...filteredAdmins]);
    };
  
    filterUsers();
  }, [searchQuery, members, administrateurs]);

  //fonction pour gerer la suppression d'un membre
  const handleDelete = async (id: string, statut: string) => {
    try {
      if (!group) {
        throw new Error("Group data is missing");
      }

      if (statut === "Membre") {
        await removeMemberFromGroup(group.id, id); // Suppression d'un membre
        setMembers((prev) => prev.filter((member) => member.id !== id)); // Mise à jour de l'état
        setSuccessMessage("Le membre a été supprimé avec succès."); // Message de succès
      } else if (statut === "Administrateur") {
        await removeAdminFromGroup(group.id, id); // Suppression d'un administrateur
        setAdmins((prev) => prev.filter((admin) => admin.id !== id)); // Mise à jour de l'état
        setSuccessMessage("L'administrateur a été supprimé avec succès."); // Message de succès
      }

      // Efface le message après 3 secondes
      setIsSnackbarOpen(true); 
    } catch (error: any) {
      console.error("Error deleting user:", error.message);
      setError(`Erreur : ${error.message}`);
    }
  };
  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false); // Ferme le Snackbar
  };
  // Récupération des détails du groupe et des membres
  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        if (!groupId) {
          throw new Error("Group ID is missing");
        }

        // Fetch group details
        const fetchedGroup = await getGroupById(groupId);
        setGroup(fetchedGroup);

        // Fetch members
        const fetchedMembers = await fetchGroupMembers(fetchedGroup.membres);
        setMembers(fetchedMembers);
        setFilteredMembers(fetchedMembers); // Initialiser les membres filtrés

        // Fetch admins
        const fetchedAdmins = await fetchGroupAdmins(fetchedGroup.administrateurs); // Nouvelle fonction pour récupérer les admins
        setAdmins(fetchedAdmins);
      } catch (err: any) {
        console.error("Error fetching group or members:", err);
        setError(`Erreur : ${err.message}`);
      } finally {
        setIsLoading(false);
        setIsLoadingAdmins(false); // Fin du chargement des admins
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="h-full flex flex-col bg-gray-100">
    {/* Affichage du message de succès */}
    <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000} // Durée d'affichage (3 secondes)
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position du Snackbar
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
        <GroupMemberSeach onSearch={setSearchQuery} />

        {group && (
         <>
         <div className="p-4 md:p-6 relative">
           <div className="flex flex-wrap items-center justify-between gap-y-4 mb-4">
             {/* Bouton retour + Titre */}
             <div className="flex items-center gap-3 flex-1 min-w-0">
               <button
                 onClick={() => navigate(-1)}
                 className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition cursor-pointer shrink-0"
                 title="Retour"
                 aria-label="Retour"
               >
                 <IoChevronBack size={20} className="md:size-6" />
               </button>
       
               <h1 className="text-lg md:text-2xl font-bold text-gray-800 truncate">
                 {group.nom}
                 <span className="text-gray-500 text-sm md:text-base ml-2">
                   ({members.length} membres, {administrateurs.length} admin)
                 </span>
               </h1>
             </div>
       
             {/* Bouton d'action */}
             <div className="flex items-center gap-2">
               <button
                 className="px-2 py-1 text-sm md:px-3 md:py-2 md:text-base rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:outline-none flex items-center cursor-pointer"
                 onClick={() => navigate(`/groups/update/${group.id}`)}
               >
                 <FaPlus className="mr-1 md:mr-2 text-xs md:text-base" />
                 Ajouter un membre
               </button>
             </div>
           </div>
         </div>
       </>
       
        )}
         {/* Tableau */}
      <div className=" hidden md:flex  ">
        <table className="min-w-full">
          <thead>
            <tr className="border-gray-200 text-gray-600">
              <th className="py-3 px-25 text-left">id</th>
              <th className="py-3 px-10 text-left">Utilisateurs</th>
              <th className="py-3 px-20 text-left">Statut</th>
              <th className="py-3 px-50 text-left">Groupes</th>
            </tr>
          </thead>
        </table>
      </div>

   
     <div className="flex-1 overflow-auto p-4">
  
  {isLoading || isLoadingAdmins ? (
    <div className="flex items-center justify-center">
      <CircularProgress />
    </div>
  ) : [...administrateurs, ...filteredMembers].length > 0 ? (
    <div className="grid grid-cols-1 gap-4">
    {filteredMembers
      .filter((member) => !administrateurs.some((admin) => admin.id === member.id)) // Exclure les administrateurs des membres
      .concat(administrateurs) // Ajouter les administrateurs après avoir filtré les membres
      .map((user) => (
        <GroupCard
          key={user.id}
          id={user.id}
          numero={user.numero}
          nom={user.nom}
          prenom={user.prenom}
          email={user.email}
          photo={user.photo || "/default_avatar.png"}
          statut={
            administrateurs.some((admin) => admin.id === user.id)
              ? "Administrateur"
              : "Membre"
          }
          groupe={group?.nom || ""}
          date_creation={group?.date_creation || ""}
          onDelete={handleDelete}
        >
          {administrateurs.some((admin) => admin.id === user.id) && (
            <span className="text-sm text-white bg-blue-500 px-2 py-1 rounded-full ml-2">
              Admin
            </span>
          )}
        </GroupCard>
      ))}
  </div>
  ) : (
    <Typography variant="h6" className="text-gray-600">
      Aucun utilisateur trouvé.
    </Typography>
  )}
</div>
    </div>
  );
};

export default GroupMembersPage;