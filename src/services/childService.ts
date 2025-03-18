import api from "./api";


export const fetchChildren = async () => {
  try {
    const response = await api.get("/enquete");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des enfants :", error);
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

export const updateChild = async (childId: string, data: Child) => {
  try {
    await api.put(`/surveys/${childId}`, data);
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



