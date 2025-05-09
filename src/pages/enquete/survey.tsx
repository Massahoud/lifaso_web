import  { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MultipleChoiceQuestion from '../../components/ui/MultipleChoiceQuestion';
import SingleChoiceQuestion from '../../components/ui/SingleChoiceQuestion';
import { fetchAllQuestions } from '../../services/question_services';
import { fetchResponsesByQuestionId } from '../../services/réponse_service';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { createSurvey, sendResponses } from '../../services/enquete_service';

type Question = {
    id: string;
    numero: string;
    question_text: string;
    type: string;
    commentaire?: string;
};

type Response = {
  id: string;
  reponse_text: string;
};

const SurveyPage = () => {
  const [progress, setProgress] = useState(0);
  const [answers, setAnswers] = useState({});
  const [, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // État pour le dialogue
  const [avis, setAvis] = useState(''); // État pour stocker l'avis
  const surveyData = location.state?.survey; // Récupère les données transmises
 
  useEffect(() => {
    if (surveyData) {
      setTempSurvey(surveyData);
      console.log('Survey Data:', surveyData); // Affiche les données de l'enquête dans la console
       // Stocke les données dans l'état local
    }
  }, [surveyData]);

  const [questionsWithResponses, setQuestionsWithResponses] = useState<
    { question: Question; responses: Response[] | null }[]
  >([]);

  const [, setTempSurvey] = useState<{ id: number; avisEnqueteur?: string } | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const fetchedQuestions = await fetchAllQuestions(); // Récupère toutes les questions
        const withResponses = await Promise.all(
          fetchedQuestions.map(async (q) => {
            try {
              const r = await fetchResponsesByQuestionId(q.id); // Récupère les réponses pour chaque question
              // Ensure all responses have a valid `id`
              const validResponses = r.filter((response) => response.id !== undefined) as Response[];
              return { question: q, responses: validResponses };
            } catch {
              return { question: q, responses: [] }; // Si une erreur survient, retourne une liste vide
            }
          })
        );
        setQuestionsWithResponses(withResponses); // Met à jour l'état avec les questions et leurs réponses
      } catch (error: any) {
        setErrorMessage("Erreur lors du chargement des questions");
        console.error(error);
      } finally {
        setIsLoading(false); // Arrête le chargement
      }
    };

    loadQuestions();
  }, []);
 //gestion du progresse bar 
 useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || 0; // Position actuelle du défilement
      const scrollHeight = document.documentElement.scrollHeight || 1; // Hauteur totale du contenu
      const clientHeight = document.documentElement.clientHeight || 1; // Hauteur visible de la fenêtre
  
      const scrollProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;
  
      setProgress(scrollProgress); // Met à jour l'état de la progression
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnswer = (
    questionId: string,
    questionText: string,
    questionNumber: string,
    responseId: string | null,
    responseText: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [`${questionId}-${responseId}`]: {
        question_id: questionId,
        question_text: questionText,
        numero: questionNumber,
        reponse: responseId || '',
        reponse_text: responseText || '',
      },
    }));
  };

  const sendSurveyAndAnswers = async (avis: string) => {
    if (!surveyData) {
      console.error('Aucune enquête disponible à envoyer.');
      return;
    }
  
    const newSurvey = {
      ...surveyData,
      avisEnqueteur: avis,
    };
  
    try {
      setIsLoading(true);
      let imageFile: File | null = null;

      // Si une photo est disponible via photoUrl, récupérez-la
      if (surveyData.photoUrl) {
        const response = await fetch(surveyData.photoUrl); // Télécharge l'image depuis l'URL blob
        const blob = await response.blob(); // Convertit la réponse en Blob
        imageFile = new File([blob], 'photo.jpg', { type: blob.type }); // Crée un objet File
      }
      // Appel à createSurvey pour créer l'enquête
      const surveyId = await createSurvey(newSurvey, imageFile); // Remplacez `null` par un fichier image si nécessaire
  console.log('Survey ID:',imageFile); // Affiche l'ID de l'enquête dans la console
      if (surveyId) {
        // Appel à sendResponses pour envoyer les réponses
        await sendAnswersToApi(surveyId);
        navigate('/childs');
      } else {
        throw new Error("L'ID de l'enquête est null.");
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const sendAnswersToApi = async (surveyId: string) => {
    if (Object.keys(answers).length === 0) {
      alert('Aucune réponse à envoyer.');
      return;
    }
  
    const responses = Object.values(answers);
  
    try {
      // Appel à sendResponses pour envoyer les réponses
      await sendResponses(surveyId, responses);
      alert('Toutes les réponses ont été envoyées avec succès !');
      setAnswers({});
    } catch (error) {
      console.error('Erreur lors de l\'envoi des réponses:', error);
      alert('Erreur lors de l\'envoi des réponses.');
    }
  };
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogSubmit = () => {
    sendSurveyAndAnswers(avis);
    setIsDialogOpen(false);
  };
  const renderQuestionWidget = (question: Question, responses: Response[] | null) => {
    if (question.type === 'reponseunique') {
      return (
        <SingleChoiceQuestion
          questionNumber={question.numero}
          question={question.question_text}
          options={responses?.map((response) => response.reponse_text) || []}
          onChanged={(selectedText) => {
            const selectedResponse = responses?.find(
              (r) => r.reponse_text === selectedText
            );
            if (selectedResponse) {
              handleAnswer(
                question.id,
                question.question_text,
                question.numero,
                selectedResponse.id,
                selectedResponse.reponse_text
              );
            }
          }}
        />
      );
    } else if (question.type === 'reponsemultiples') {
      return (
        <MultipleChoiceQuestion
          questionNumber={question.numero}
          question={question.question_text}
          options={responses?.map((response) => response.reponse_text) || []}
          onChanged={(selectedTexts) => {
            const selectedResponses = responses?.filter((r) =>
              selectedTexts.includes(r.reponse_text)
            );
            if (selectedResponses) {
              selectedResponses.forEach((response) => {
                handleAnswer(
                  question.id,
                  question.question_text,
                  question.numero,
                  response.id,
                  response.reponse_text
                );
              });
            }
          }}
        />
      );
    } else {
        return (
            <div className="flex flex-col space-y-2">
              {/* Affichage du numéro et du texte de la question */}
              <div className="fontSize: '16px', fontWeight: 500">
                {question.numero}. {question.question_text}
              </div>
          
              {/* Champ de saisie */}
              <TextField
                placeholder={`Entrez votre réponse pour`}
                onChange={(e) =>
                  handleAnswer(
                    question.id,
                    question.question_text,
                    question.numero,
                    null,
                    e.target.value
                  )
                }
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    "& fieldset": {
                      borderColor: "gray",
                    },
                    "&:hover fieldset": {
                      borderColor: "orange",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "orange",
                    },
                  },
                }}
                margin="normal"
              />
            </div>
          );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg  w-full max-w-2xl">
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
        <div className="p-4">
          <h1 className="text-xl font-bold">Enquête</h1>
          <progress
  value={isNaN(progress) ? 0 : progress} // Utilisez 0 si `progress` est NaN
  max="100"
  className="w-full h-2 bg-orange-500 rounded"
>
  {isNaN(progress) ? 0 : progress}%
</progress>
        </div>
      </header>
      <main className="mt-20 p-8">
        {isLoading ? (
          <p>Chargement des questions...</p>
        ) : (
          questionsWithResponses.map(({ question, responses }) => (
            <div key={question.id} className="question-container">
              {renderQuestionWidget(question, responses)}
            </div>
          ))
        )}
       <button
            onClick={handleDialogOpen}
            disabled={isLoading}
            className={`w-full py-3 text-white font-bold rounded-lg ${
              isLoading ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {isLoading ? 'Envoi en cours...' : 'Enregistrer'}
          </button>
      </main>
    </div>
    <Dialog
  open={isDialogOpen}
  onClose={handleDialogClose}
  fullWidth // Agrandir le dialogue pour qu'il prenne toute la largeur disponible
  maxWidth="xs" // Vous pouvez ajuster la taille maximale (sm, md, lg, xl)
>
  <DialogTitle>Entrez votre avis</DialogTitle>
  <DialogContent>
    <textarea
      value={avis}
      onChange={(e) => setAvis(e.target.value)}
      rows={8} // Augmenter le nombre de lignes pour un champ plus grand
      className="w-full p-2 border rounded"
      placeholder="Saisissez votre avis ici..."
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDialogClose} color="secondary">
      Annuler
    </Button>
    <Button
      onClick={handleDialogSubmit}
      style={{
        backgroundColor: '#f97316', // Couleur orange
        color: 'white', // Texte blanc
      }}
      variant="contained"
    >
      Envoyer
    </Button>
  </DialogActions>
</Dialog>
    </div>
  );
};

export default SurveyPage;