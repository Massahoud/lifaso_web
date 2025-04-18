import api from "../services/api";

export const getUserRole = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) return null;

  try {
    const response = await api.get(`/users/${userId}`);
    const { statut, nom, prenom } = response.data;

    return { statut, nom, prenom };
  } catch (error) {
    console.error("Erreur lors de la récupération des infos utilisateur :", error);
    return null;
  }
};
