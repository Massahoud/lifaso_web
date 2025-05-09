import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomTextField from '../../components/ui/custom_textfield';
import api from '../../services/api';
import { fetchGroups } from '../../services/groups_service';
import { getUserRole } from '../../services/role';

interface Group {
  id: string;
  nom: string;
}

const StartSurveyPage = () => {
  const [nom, setNom] = useState<string>('');
  const [prenom, setPrenom] = useState<string>('');
  const [nomEnfant, setNomEnfant] = useState<string>('');
  const [prenomEnfant, setPrenomEnfant] = useState<string>('');
  const [ageEnfant, setAgeEnfant] = useState<string>('');
  const [sexeEnfant, setSexeEnfant] = useState<string>('M');
  const [contactEnfant, setContactEnfant] = useState<string>('');
  const [nomContactEnfant, setNomContactEnfant] = useState<string>('');
  const [lieuEnquete, setLieuEnquete] = useState<string>('koudougou');
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [locationText, setLocationText] = useState<string>('Coordonnées géographiques');
  const [locationData, setLocationData] = useState<{ latitude: number; longitude: number } | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(true);
  const [nextNumberOrder, setNextNumberOrder] = useState<string>('');
  const navigate = useNavigate();


  useEffect(() => {
    fetchUserDetails(); // Récupère le nom et prénom de l'utilisateur
    fetchNextNumberOrder(); // Récupère le dernier numéro d'enquête
    fetchUserGroups(); // Récupère les groupes
  }, []);




  // Récupère les informations de l'utilisateur (nom, prénom)
  const fetchUserDetails = async () => {
    try {
      const user = await getUserRole();
      if (user) {
        setNom(user.nom || ''); // Définit le nom
        setPrenom(user.prenom || ''); // Définit le prénom
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des informations utilisateur :', error);
    }
  };
  const fetchNextNumberOrder = async () => {
    try {
      const response = await api.get('/surveys/lastnumber');
      setNextNumberOrder(response.data?.lastNumber || '1'); // Définit le dernier numéro
    } catch (error) {
      console.error('Erreur lors de la récupération du dernier numéro :', error);
    }
  };
  

  const fetchUserGroups = async () => {
    try {
         const response = await fetchGroups();
         setUserGroups(response);
      
    } catch (error) {
      console.error('Erreur lors de la récupération des groupes:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationData({ latitude, longitude });
          setLocationText(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
        }
      );
    } else {
      console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsButtonEnabled(false);

    const surveyData = {
      numero: nextNumberOrder,
      prenomEnqueteur: prenom || 'N/A',
      nomEnqueteur: nom || 'N/A',
      prenomEnfant: prenomEnfant || 'N/A',
      nomEnfant: nomEnfant || 'N/A',
      sexeEnfant: sexeEnfant || 'Non spécifié',
      contactEnfant: contactEnfant || 'N/A',
      nomContactEnfant: nomContactEnfant || 'N/A',
      ageEnfant: ageEnfant || '0',
      lieuEnquete: lieuEnquete || 'Non spécifié',
      dateHeureDebut: selectedDateTime || new Date(),
      latitude: locationData?.latitude || 0.0,
      longitude: locationData?.longitude || 0.0,
      photoUrl: image ? URL.createObjectURL(image) : '',
      groupe: selectedGroupId || 'Non spécifié',
    };

    try {
     
      navigate('/survey', { state: { survey: surveyData } });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'enquête:', error);
    } finally {
      setIsLoading(false);
      setIsButtonEnabled(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-6">Commencer une enquête</h1>
        <form className="space-y-4">
          <CustomTextField
            name="numero"
            label="Numéro de l'enquête"
            value={nextNumberOrder}
            onChange={() => {}}
            type="text"
          />
          <CustomTextField
            name="nom"
            label="Nom de l'enquêteur"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <CustomTextField
            name="prenom"
            label="Prénom de l'enquêteur"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Groupe</label>
            <select
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="" disabled>
                Sélectionnez un groupe
              </option>
              {userGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.nom}
                </option>
              ))}
            </select>
          </div>
          <CustomTextField
            name="nomEnfant"
            label="Nom de l'enfant"
            value={nomEnfant}
            onChange={(e) => setNomEnfant(e.target.value)}
          />
          <CustomTextField
            name="prenomEnfant"
            label="Prénom de l'enfant"
            value={prenomEnfant}
            onChange={(e) => setPrenomEnfant(e.target.value)}
          />
          <CustomTextField
            name="ageEnfant"
            label="Âge de l'enfant"
            value={ageEnfant}
            onChange={(e) => setAgeEnfant(e.target.value)}
            type="number"
          />
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Sexe de l'enfant</label>
            <select
              value={sexeEnfant}
              onChange={(e) => setSexeEnfant(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>
          <CustomTextField
            name="contactEnfant"
            label="Contact de l'enfant"
            value={contactEnfant}
            onChange={(e) => setContactEnfant(e.target.value)}
          />
          <CustomTextField
            name="nomContactEnfant"
            label="Nom du contact de l'enfant"
            value={nomContactEnfant}
            onChange={(e) => setNomContactEnfant(e.target.value)}
          />
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Lieu de l'enquête</label>
            <select
              value={lieuEnquete}
              onChange={(e) => setLieuEnquete(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="koudougou">Koudougou</option>
              <option value="kongoussi">Kongoussi</option>
              <option value="ouagadougou">Ouagadougou</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Date/heure de début</label>
            <input
              type="datetime-local"
              onChange={(e) => setSelectedDateTime(new Date(e.target.value))}
              className="w-full px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Géolocalisation</label>
            <button
              type="button"
              onClick={handleLocation}
              className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none"
            >
              Activer la géolocalisation
            </button>
            <p className="text-sm text-gray-600 mt-2">{locationText}</p>
          </div>
          <div>
  <label className="text-sm text-gray-500 mb-1 block">Image</label>
  
  {/* Option pour prendre une photo ou sélectionner une image */}
  <input
    type="file"
    accept="image/*"
    capture="environment" // Utilise l'appareil photo arrière
    onChange={handleImageUpload}
    className="w-full px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
  />

  {/* Affichage de l'aperçu de l'image */}
  {image && <img src={URL.createObjectURL(image)} alt="Preview" className="mt-2 h-24" />}
</div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isButtonEnabled}
            className={`w-full px-4 py-2 rounded-full text-white ${
              isButtonEnabled ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Envoi en cours...' : 'Envoyer l\'enquête'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartSurveyPage;