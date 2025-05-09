import api from './api'; // Importez l'instance `api`

const getAllSurveys = async () => {
  try {
    const response = await api.get('/surveys'); // Utilisez `api` au lieu de `axios`
    return response.data;
  } catch (err) {
    console.error('[getAllSurveys] Erreur:', err);
    throw err;
  }
};

const getSurveyById = async (id: string) => {
  try {
    const response = await api.get(`/surveys/${id}`); // Utilisez `api` au lieu de `axios`
    return response.data;
  } catch (err) {
    console.error('Error fetching survey:', err);
    throw err;
  }
};

const sendResponses = async (surveyId: string, responses: any[]) => {
  const data = {
    responses: responses.map((r) => ({ ...r, enquete_id: surveyId })),
  };

  try {
    const response = await api.post('/surveys/Reponse', data); // Utilisez `api` au lieu de `axios`
    if (response.status === 200) {
      console.log('Réponses envoyées avec succès !');
      await sendSurveyIdToApi(surveyId);
    } else {
      console.error("Erreur d'envoi:", response.data);
    }
  } catch (err) {
    console.error('Erreur de connexion:', err);
  }
};

const sendSurveyIdToApi = async (surveyId: string) => {
  try {
    const response = await api.get(`/calculenquete/${surveyId}`); // Utilisez `api` au lieu de `axios`
    if (response.status === 200) {
      console.log('ID envoyé avec succès !');
    } else {
      console.error('Erreur envoi ID:', response.data);
    }
  } catch (err) {
    console.error('Erreur de connexion:', err);
  }
};

const createSurvey = async (survey: any, imageFile: File | null) => {
  const formData = new FormData();

  const geolocalisation = {
    latitude: parseFloat(survey.latitude) || 0.0,
    longitude: parseFloat(survey.longitude) || 0.0,
  };

  formData.append('numero', survey.numero);
  formData.append('age_enfant', survey.ageEnfant);
  formData.append('latitude', geolocalisation.latitude.toString());
  formData.append('longitude', geolocalisation.longitude.toString());
  formData.append('prenom_enqueteur', survey.prenomEnqueteur);
  formData.append('groupe', survey.groupe);
  formData.append('nom_enqueteur', survey.nomEnqueteur);
  formData.append('prenom_enfant', survey.prenomEnfant);
  formData.append('nom_enfant', survey.nomEnfant);
  formData.append('sexe_enfant', survey.sexeEnfant);
  formData.append('contact_enfant', survey.contactEnfant);
  formData.append('nomcontact_enfant', survey.nomContactEnfant);
  formData.append('lieuenquete', survey.lieuEnquete);
  formData.append('avis_enqueteur', survey.avisEnqueteur);
  formData.append('geolocalisation', JSON.stringify(geolocalisation));

  if (imageFile) {
    formData.append('photo_url', imageFile);
  }

  try {
    const response = await api.post('/surveys', formData); // Utilisez `api` au lieu de `axios`
    if (response.status === 201) {
      console.log('Survey créée:', response.data);
      return response.data?.survey?.id || null;
    } else {
      throw new Error(`Erreur création: ${response.status}`);
    }
  } catch (err) {
    console.error('Erreur création survey:', err);
    return null;
  }
};

const updateSurvey = async (id: string, survey: any) => {
  try {
    const response = await api.put(`/surveys/${id}`, survey); // Utilisez `api` au lieu de `axios`
    return response.data;
  } catch (err) {
    console.error('Erreur update survey:', err);
    throw err;
  }
};

const deleteSurvey = async (id: string) => {
  try {
    await api.delete(`/surveys/${id}`); // Utilisez `api` au lieu de `axios`
  } catch (err) {
    console.error('Erreur delete survey:', err);
    throw err;
  }
};

export {
  getAllSurveys,
  getSurveyById,
  sendResponses,
  sendSurveyIdToApi,
  createSurvey,
  updateSurvey,
  deleteSurvey,
};