import api from "../services/api";



// Fonction pour récupérer le rôle de l'utilisateur
export const getUserRole = async (): Promise<string | null> => {
  const userId = localStorage.getItem("userId");
  if (!userId) return null;

  try {
    const response = await api.get(`/users/${userId}`);
    return response.data.statut; // Retourne le statut de l'utilisateur (admin, enquêteur, etc.)
  } catch (error) {
    console.error("Erreur lors de la récupération du rôle utilisateur :", error);
    return null;
  }
};
