import api from "./api";

export const updateIndice = async (id: string, data: Record<string, any>): Promise<any> => {
    console.log("ID:", id);
  try {
    if (!id || !data || Object.keys(data).length === 0) {
      throw new Error("L'ID et les données à mettre à jour sont requis.");
    }

    const response = await api.put(`/quartile_score/indices/${id}`, data);
    console.log("Document mis à jour avec succès:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du document:", error);
    throw error;
  }
};