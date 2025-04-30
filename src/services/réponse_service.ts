// services/responseService.ts
import api from "./api"; // Remplacer axios par ton instance personnalisée

export interface Response {
  id?: string;
  question_id: string;
  reponse_text: string;
  alimentation: string;
  cadre_vie: string;
  education: string;
  pauvrete: string;
  sante_physique: string;
  violence: string;
  indice_sortir?: string;
}

export type ResponseType = Omit<Response, 'id'>;

// Récupérer toutes les réponses pour une question donnée
export const fetchResponsesByQuestionId = async (questionId: string): Promise<Response[]> => {
  try {
    const res = await api.get(`/responses/question/${questionId}`);
    return res.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des réponses par question");
  }
};

// Récupérer toutes les réponses
export const getAllResponses = async (): Promise<Response[]> => {
  try {
    const res = await api.get(`/responses`);
    return res.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération de toutes les réponses");
  }
};

// Récupérer une réponse par ID
export const getResponseById = async (id: string): Promise<ResponseType> => {
  try {
    const res = await api.get(`/responses/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération de la réponse");
  }
};

// Créer une réponse
export const createResponse = async (response: Response): Promise<Response> => {
  try {
    const res = await api.post(`/responses`, response, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = res.data;
    if (data?.reponse_text) return data.reponse_text;
    throw new Error("Réponse invalide ou inattendue.");
  } catch (error) {
    throw new Error("Erreur lors de la création de la réponse");
  }
};

// Mettre à jour une réponse
export const updateResponse = async (id: string, response: ResponseType): Promise<ResponseType> => {
  try {
    const res = await api.put(`/responses/${id}`, response, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.reponse_text;
  } catch (error) {
    throw new Error("Erreur lors de la mise à jour de la réponse");
  }
};

// Supprimer une réponse
export const deleteResponse = async (id: string): Promise<void> => {
  try {
    await api.delete(`/responses/${id}`);
  } catch (error) {
    throw new Error("Erreur lors de la suppression de la réponse");
  }
};
