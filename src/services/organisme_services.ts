import api from "./api";

interface Organisme {
  id: string;
  nom: string;
  description: string;
  date_creation: string;
  superadminId: string;
}

interface User {
  id: string;
  numero: string;
  nom: string;
  prenom: string;
  statut: string;
  email: string;
}

// Récupérer tous les utilisateurs
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get(`/users`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching users:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

// Créer un nouvel organisme
export const createOrganisme = async (
    nom: string,
    description: string,
    date_creation: string,
    superadminId?: string // ← superadminId devient optionnel ici
  ): Promise<Organisme> => {
    if (!nom || !description || !date_creation) {
      throw new Error("Nom, description et date de création sont requis.");
    }
  
    try {
      // Préparer les données
      const organismeData: any = {
        nom,
        description,
        date_creation,
      };
  
      // Ajouter superadminId uniquement s’il est défini
      if (superadminId) {
        organismeData.superadminId = superadminId;
      }
  
      const response = await api.post(`/organismes`, organismeData);
  
      if (response.status === 201) {
        return response.data.organisme;
      } else {
        throw new Error(`Échec de la création : ${response.status}`);
      }
    } catch (error: any) {
      console.error("Erreur lors de la création de l’organisme :", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Erreur serveur");
    }
  };
  


  export const getAllOrganismes = async (): Promise<Organisme[]> => {
    try {
      const response = await api.get("/organismes");
    
  
      return response.data.organismes || [];
    } catch (error) {
      console.error(" Erreur dans getAllOrganismes (frontend) :", error);
      return [];
    }
  };
  
// Récupérer un organisme par ID
export const getOrganismeById = async (id: string): Promise<Organisme> => {
  if (!id) throw new Error("ID requis");

  try {
    const response = await api.get(`/organismes/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Erreur lors de la récupération de l’organisme :", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erreur serveur");
  }
};

export const updateOrganisme = async (
  id: string,
  data: {
    nom: string;
    description: string;
    dateCreation: string;
    superadminId: string;
  }
): Promise<Organisme> => {
  const { nom, description, dateCreation, superadminId } = data;

  if (!id || !nom || !description || !dateCreation || !superadminId) {
    throw new Error("Tous les champs sont requis.");
  }

  try {
    const response = await api.put(`/organismes/${id}`, {
      nom,
      description,
      date_creation: dateCreation, // correspondance clé API
      superadminId,
    });

    return response.data.organisme;
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour de l’organisme :", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erreur serveur");
  }
};

// Supprimer un organisme
export const deleteOrganisme = async (id: string): Promise<void> => {
  if (!id) throw new Error("ID requis");

  try {
    await api.delete(`/organismes/${id}`);
  } catch (error: any) {
    console.error("Erreur lors de la suppression de l’organisme :", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Erreur serveur");
  }
};
