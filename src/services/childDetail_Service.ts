import api from "./api";
 
 const API_URL = import.meta.env.VITE_ENQUETE_URL;
 const CHOIX_REPONSE_URL = import.meta.env.VITE_CHOIX_REPONSE_URL;
 const SCORE_URL = import.meta.env.VITE_SCORE_URL;
 const INDICES_URL = import.meta.env.VITE_INDICES_URL;
 
 export const fetchChildDetails = async (id: string) => {
   try {
     const response = await api.get(`${API_URL}/${id}`);
     return response.data;
   } catch (error) {
     console.error("Erreur lors de la récupération des détails :", error);
     throw error;
   }
 };
 
 export const fetchResponses = async (id: string) => {
   try {
     const response = await api.get(`${CHOIX_REPONSE_URL}/${id}`);
     return response.data;
   } catch (error) {
     console.error("Erreur lors de la récupération des réponses :", error);
     throw error;
   }
 };
 
 export const fetchScore = async (id: string) => {
   try {
     const response = await api.get(`${SCORE_URL}/${id}`);
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
     const response = await api.get(`${INDICES_URL}/${id}`);
     return response.data.map((item: { indice_sortir: string }) => item.indice_sortir);
   } catch (error) {
     console.error("Erreur lors de la récupération des indices :", error);
     throw error;
   }
 };