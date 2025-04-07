import api from "./api";
 
 import.meta.env.VITE_ENQUETE_URL;

 export const fetchChildDetails = async (id: string) => {
   try {
     const response = await api.get(`/enquete/${id}`);
     return response.data;
   } catch (error) {
     console.error("Erreur lors de la récupération des détails :", error);
     throw error;
   }
 };
 
 export const fetchResponses = async (id: string) => {
   try {
     const response = await api.get(`/choixreponse/${id}`);
     return response.data;
   } catch (error) {
     console.error("Erreur lors de la récupération des réponses :", error);
     throw error;
   }
 };
 
 export const fetchScore = async (id: string) => {
   try {
     const response = await api.get(`/enquete/score/${id}`);
     const childData = response.data[0];
 
     return [
       { subject: "CADRE DE VIE", value: isNaN(Number(childData.cadre_vie)) ? 0 : Number(childData.cadre_vie) },
       { subject: "PAUVRETÉ", value: isNaN(Number(childData.pauvrete)) ? 0 : Number(childData.pauvrete) },
       { subject: "VIOLENCE", value: isNaN(Number(childData.violence)) ? 0 : Number(childData.violence) },
       { subject: "SANTÉ PHYSIQUE", value: isNaN(Number(childData.sante_physique)) ? 0 : Number(childData.sante_physique) },
       { subject: "ÉDUCATION", value: isNaN(Number(childData.education)) ? 0 : Number(childData.education) },
       { subject: "ALIMENTATION", value: isNaN(Number(childData.alimentation)) ? 0 : Number(childData.alimentation) },
     ];
   } catch (error) {
     console.error("Erreur lors de la récupération des scores :", error);
     throw error;
   }
 };
 
 export const fetchIndicators = async (id: string) => {
   try {
     const response = await api.get(`/choixreponse/indices/${id}`);
     return response.data.map((item: { indice_sortir: string }) => item.indice_sortir);
   } catch (error) {
     console.error("Erreur lors de la récupération des indices :", error);
     throw error;
   }
 };

 export const deleteSurvey = async (id: string) => {
  try {
    const response = await api.delete(`/surveys/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'enquête :", error);
    throw error;
  }
};

export const fetchQuartiles = async () => {
  try {
    const response = await api.get(`/data/quartiles`); 
    const data = response.data;

    console.log("Données brutes des quartiles :", data);

    if (data && typeof data === "object") {
      const formattedQuartiles: Record<string, Record<string, number>> = {};

      Object.entries(data).forEach(([categorie, valeurs]) => {
        console.log(`Catégorie : ${categorie}, Valeurs :`, valeurs); 

        const valeursArray = valeurs as string[];
        const quartileData: Record<string, number> = {};

        valeursArray.forEach((valeur, index) => {
          quartileData[`quartile${index}`] = parseFloat(valeur); 
        });

        formattedQuartiles[categorie] = quartileData;
      });

      return formattedQuartiles;
    } else {
      console.error("Les données des quartiles sont invalides :", data);
      return {};
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des quartiles :", error);
    throw error;
  }
};

export const fetchScores = async () => {
  try {
    const response = await api.get(`/data/scores`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des scores :", error);
    throw error;
  }
};