// services/dataService.ts
import api from "./api"; // Remplacer axios par ton instance personnalisée

// Stocker le token
export const setAuthToken = async (token: string) => {
  localStorage.setItem("token", token);
};

// Récupérer le token
export const getAuthToken = async (): Promise<string | null> => {
  return localStorage.getItem("token");
};

// Récupérer toutes les données
export const fetchAllData = async (): Promise<any[]> => {
  const token = await getAuthToken();
  if (!token) throw new Error("Aucun token d'authentification trouvé");

  try {
    const response = await api.get(`/api/datanuage`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des données");
  }
};

// Récupérer une donnée par ID
export const fetchDataById = async (id: string): Promise<any> => {
  const token = await getAuthToken();
  if (!token) throw new Error("Aucun token d'authentification trouvé");

  try {
    const response = await api.get(`/api/datanuage/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération de la donnée");
  }
};
