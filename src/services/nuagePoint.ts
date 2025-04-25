// services/dataService.ts
import axios from "axios";

const baseUrl = "https://soleilmainapi.vercel.app";

// Stocker le token
export const setAuthToken = async (token: string) => {
  localStorage.setItem("token", token);
};

// Récupérer le token
export const getAuthToken = async (): Promise<string | null> => {
  return localStorage.getItem("token");
};

// Gérer la session expirée
const handleTokenExpired = () => {
  alert("Votre session a expiré. Vous devez vous reconnecter.");
  window.location.href = "/login"; // Redirige vers login
};

// Récupérer toutes les données
export const fetchAllData = async (): Promise<any[]> => {
  const token = await getAuthToken();
  if (!token) throw new Error("Aucun token d'authentification trouvé");

  try {
    const response = await axios.get(`${baseUrl}/api/datanuage`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      handleTokenExpired();
      return [];
    }
    throw new Error("Erreur lors de la récupération des données");
  }
};

// Récupérer une donnée par ID
export const fetchDataById = async (id: string): Promise<any> => {
  const token = await getAuthToken();
  if (!token) throw new Error("Aucun token d'authentification trouvé");

  try {
    const response = await axios.get(`${baseUrl}/api/datanuage/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération de la donnée");
  }
};
