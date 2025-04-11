import api from "./api"; // Import de l'instance API configurée



// TypeScript types pour les données
interface Group {
  id: string;
  nom: string;
  description: string;
  date_creation: string;
  administrateurs: string[];
  membres: string[];
}

interface User {
  id: string;
  numero: string;
  nom: string;
  prenom: string;
  statut: string;
  email: string;
}

// Fonction pour récupérer les utilisateurs
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get(`/users`);
    return response.data; // Assurez-vous que l'API retourne une liste d'utilisateurs
  } catch (error: any) {
    console.error("Error fetching users:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

// Fonction pour créer un groupe
export const createGroup = async (
  nom: string,
  description: string,
  date_creation: string,
  adminIds: string[],
  memberIds: string[]
): Promise<Group> => {
  if (!adminIds.length || !memberIds.length) {
    throw new Error("Invalid input: members or admins cannot be empty");
  }

  try {
    const response = await api.post(`/groups`, {
      nom,
      description,
      date_creation,
      administrateurs: adminIds,
      membres: memberIds,
    });

    if (response.status === 201) {
      return response.data.group; // Assurez-vous que l'API retourne un objet `group`
    } else {
      throw new Error(`Failed to create group: ${response.status} ${response.data}`);
    }
  } catch (error: any) {
    console.error("Error creating group:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to create group");
  }
};

// Fonction pour récupérer les groupes
export const fetchGroups = async (): Promise<Group[]> => {
  try {
    const response = await api.get(`/groups`);
    return response.data; // Assurez-vous que l'API retourne une liste de groupes
  } catch (error: any) {
    console.error("Error fetching groups:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch groups");
  }
};

// Fonction pour récupérer les membres d'un groupe
export const fetchGroupMembers = async (memberIds: string[]): Promise<User[]> => {
  if (!memberIds || memberIds.length === 0) {
    throw new Error("Invalid memberIds: memberIds cannot be empty");
  }

  try {
    const memberRequests = memberIds.map((id) =>
      api.get(`/users/${id}`)
    );

    const responses = await Promise.all(memberRequests);
    return responses.map((response) => response.data); // Retourne les données des utilisateurs
  } catch (error: any) {
    console.error("Error fetching group members:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch group members");
  }
};

// Fonction pour récupérer un utilisateur par ID
export const getUserById = async (id: string): Promise<User> => {
  if (!id) {
    throw new Error("Invalid id: id cannot be empty");
  }

  try {
    const response = await api.get(`/users/${id}`);
    return response.data; // Assurez-vous que l'API retourne un objet utilisateur
  } catch (error: any) {
    console.error("Error fetching user:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};

// Fonction pour récupérer les administrateurs d'un groupe
export const fetchGroupAdmins = async (adminIds: string[]): Promise<User[]> => {
  if (!adminIds || adminIds.length === 0) {
    throw new Error("Invalid adminIds: adminIds cannot be empty");
  }

  try {
    const adminRequests = adminIds.map((id) =>
      api.get(`/users/${id}`)
    );

    const responses = await Promise.all(adminRequests);
    return responses.map((response) => response.data); // Retourne les données des administrateurs
  } catch (error: any) {
    console.error("Error fetching group admins:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch group admins");
  }
};

// Fonction pour récupérer un groupe par ID
export const getGroupById = async (id: string): Promise<Group> => {
  if (!id) {
    throw new Error("Invalid id: id cannot be empty");
  }

  try {
    const response = await api.get(`/groups/${id}`);
    return response.data; // Assurez-vous que l'API retourne un objet `group`
  } catch (error: any) {
    console.error("Error fetching group:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch group");
  }
};