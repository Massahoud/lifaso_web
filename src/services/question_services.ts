// services/questionService.ts
import api from "./api"; // Remplacer axios par ton instance personnalisée

export interface Question {
  id: string;
  numero: string;
  question_text: string;
  type: string;
  commentaire?: string;
}

// Récupérer toutes les questions
export const fetchAllQuestions = async (): Promise<Question[]> => {
  try {
    const response = await api.get(`/questions`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des questions");
  }
};

// Récupérer une question par ID
export const getQuestionById = async (id: string): Promise<Question> => {
  try {
    const response = await api.get(`/questions/${id}`);
    if (!response.data) {
      throw new Error("Réponse vide");
    }
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération de la question");
  }
};

// Créer une question
export const createQuestion = async (question: Question): Promise<Question> => {
  try {
    const response = await api.post(`/questions`, question, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data?.question) {
      return response.data.question;
    } else if (response.data?.question_text) {
      return response.data.question_text;
    } else {
      throw new Error("Réponse API inattendue");
    }
  } catch (error) {
    throw new Error("Erreur lors de la création de la question");
  }
};

// Mettre à jour une question
export const updateQuestion = async (id: string, question: Question): Promise<Question> => {
  try {
    const response = await api.put(`/questions/${id}`, question, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.question;
  } catch (error) {
    throw new Error("Erreur lors de la mise à jour de la question");
  }
};

// Supprimer une question
export const deleteQuestion = async (id: string): Promise<void> => {
  try {
    await api.delete(`/questions/${id}`);
  } catch (error) {
    throw new Error("Erreur lors de la suppression de la question");
  }
};
