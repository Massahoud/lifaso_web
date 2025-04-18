import api from "./api";

import { getUserRole } from "../services/role"; 

export const fetchChildren = async () => {
  try {
    const response = await api.get("/enquete");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des enfants :", error);
    return [];
  }
};

export const fetchEnquetesByUserRole = async (userId: string) => {
  try {
    // Appeler l'API avec le userId
    const response = await api.get(`/enquete/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des enquêtes par rôle :", error);
    return [];
  }
};
// services/childService.ts

export interface Child {
  id: string;
  nom_enfant: string;
  prenom_enfant: string;
  age_enfant: string;
  sexe_enfant: string;
  nomcontact_enfant: string;
  contact_enfant: string;
}

 // Assure-toi que le chemin est correct

 export const updateChild = async (childId: string, data: any) => {
  try {
    const user = await getUserRole();
    if (!user) {
      throw new Error("Impossible de récupérer les informations de l'utilisateur.");
    }

    // Format de date : "18 avril 2025"
    const formattedDate = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const modification = {
      nom: user.nom,
      prenom: user.prenom,
      date: formattedDate,
    };

    // 🔥 Supprimer le champ `id` de l'objet `data`
    const { id, ...rest } = data;

    const updatedData = {
      ...rest,
      derniere_modification: Array.isArray(rest.derniere_modification)
        ? [...rest.derniere_modification, modification]
        : [modification],
    };

    await api.put(`/surveys/${childId}`, updatedData);
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw error;
  }
};




export interface InvestigatorNote {
  id: string;
  nom_enqueteur: string;
  prenom_enqueteur: string;
  avis_enqueteur: string;
}


export const updateInvestigatorNote = async (noteId: string, data: InvestigatorNote) => {
  try {
    await api.put(`/surveys/${noteId}`, data);
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw error;
  }
};



export interface EtatChild {
  id: string
  etat: string;
}

export const updateEtat = async (EtatId: string, data: EtatChild) => {
  try {
    await api.put(`/surveys/${EtatId}`, data);
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw error;
  }
};



