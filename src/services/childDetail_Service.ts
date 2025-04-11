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
       { subject: "cadre_vie", value: isNaN(Number(childData.cadre_vie)) ? 0 : Number(childData.cadre_vie) },
       { subject: "pauvrete", value: isNaN(Number(childData.pauvrete)) ? 0 : Number(childData.pauvrete) },
       { subject: "violence", value: isNaN(Number(childData.violence)) ? 0 : Number(childData.violence) },
       { subject: "sante_physique", value: isNaN(Number(childData.sante_physique)) ? 0 : Number(childData.sante_physique) },
       { subject: "education", value: isNaN(Number(childData.education)) ? 0 : Number(childData.education) },
       { subject: "alimentation", value: isNaN(Number(childData.alimentation)) ? 0 : Number(childData.alimentation) },
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
    // Appel à l'API pour récupérer les quartiles
    const response = await api.get(`/quartile_score/quartiles`);
    const data = response.data;

   
    // Vérification que les données sont valides
    if (data && typeof data === "object") {
      const formattedQuartiles: Record<string, Record<string, number>> = {};

      // Parcours des catégories et formatage des données
      Object.entries(data).forEach(([categorie, valeurs]) => {
       

        // Vérification que les valeurs sont un tableau
        const valeursArray = Array.isArray(valeurs) ? valeurs : [];
        const quartileData: Record<string, number> = {};

        // Conversion des valeurs en nombres et ajout au formatage
        valeursArray.forEach((valeur, index) => {
          quartileData[`quartile${index + 1}`] = parseFloat(valeur); // `index + 1` pour correspondre à quartile1, quartile2, etc.
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