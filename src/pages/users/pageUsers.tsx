"use client";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/user_services";
import { useLocation, useNavigate } from "react-router-dom";
import UserCard, { UsercardProps } from "../../components/users/users_card";
import UsersSeach from "../../components/users/user_searchbar";
import UsersFilter from "../../components/users/user_filter";
import UpdateUserDrawer from "./user_update";
import SendInviteForm from "./create_users";
import { getGroupsByUserId } from "../../services/groups_service";

const PageUsers: React.FC = () => {
  const [users, setUsers] = useState<UsercardProps[]>([]);
  const [filteredChildren, setFilteredChildren] = useState<UsercardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); 
  const navigate = useNavigate();
  const location = useLocation();
  const isModalOpen = location.pathname === "/users/send_invitation";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUsers();
  
        const usersWithGroups = await Promise.all(
          result.map(async (user: UsercardProps) => {
            try {
              const groups = await getGroupsByUserId(user.id);
              return { ...user, groupe: groups.map((g: any) => g.nom).join(", ") };
            } catch (e) {
              return { ...user, groupe: "Aucun groupe" };
            }
          })
        );
  
        setUsers(usersWithGroups);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des utilisateurs.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);
  

  useEffect(() => {
    let filtered = users;

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((child) => {
        return (
          child.nom.toLowerCase().includes(lowercasedQuery) ||
          child.prenom.toLowerCase().includes(lowercasedQuery) ||
          child.numero === searchQuery
        );
      });
    }

    if (selectedState) {
      filtered = filtered.filter((child) => child.statut === selectedState);
    }

    setFilteredChildren(filtered);
  }, [searchQuery, users, selectedState]);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <UsersSeach onSearch={setSearchQuery} />
      <UsersFilter onFilterByState={setSelectedState} totalUsers={users.length} />

      {/* Header table */}
      <div className="hidden md:block">
        <table className="min-w-full">
          <thead>
            <tr className="border-gray-200 text-gray-600">
              <th className="py-3 px-12 text-left">ID</th>
              <th className="py-3 px-6 text-left">Utilisateurs</th>
              <th className="py-3 px-6 text-left">Statut</th>
              <th className="py-3 px-15 text-left">Groupes</th>
            </tr>
          </thead>
        </table>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Spinner pendant le chargement */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 cursor-pointer">
            {filteredChildren.map((user) => (
              <UserCard key={user.id} user={user} onClick={() => setSelectedUserId(user.id)} />
            ))}
          </div>
        )}
      </div>

      {selectedUserId && (
        <UpdateUserDrawer userId={selectedUserId} onClose={() => setSelectedUserId(null)} />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-md">
          <div className="p-6 w-[90%] max-w-lg">
            <SendInviteForm onClose={() => navigate(-1)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PageUsers;
