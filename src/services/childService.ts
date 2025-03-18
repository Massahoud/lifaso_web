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
