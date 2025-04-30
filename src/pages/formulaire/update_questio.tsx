import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import {
  getQuestionById,
  updateQuestion as updateQuestionService,
  Question,
  deleteQuestion
} from '../../services/question_services';
import {
  createResponse,
  deleteResponse,
  fetchResponsesByQuestionId,
  updateResponse,
  Response,
 
} from '../../services/réponse_service';
import CustomTextField from '../../components/ui/custom_textfield';
import CustomDialog from '../../components/ui/CustomDialog';

interface ResponseField {
  reponse: string;
  education: string;
  alimentation: string;
  pauvrete: string;
  cadreVie: string;
  santePhysique: string;
  violence: string;
  indiceSortir: string;
}

const createEmptyResponseField = (): ResponseField => ({
  reponse: '',
  education: '',
  alimentation: '',
  pauvrete: '',
  cadreVie: '',
  santePhysique: '',
  violence: '',
  indiceSortir: ''
});

const UpdateQuestionPage = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
const [showUpdateDialog, setShowUpdateDialog] = useState(false);
const [showDeleteResponseDialog, setShowDeleteResponseDialog] = useState(false);
const [responseToDeleteIndex, setResponseToDeleteIndex] = useState<number | null>(null);

  
  const [numero, setNumero] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [instruction, setInstruction] = useState('');
  const [selectedType, setSelectedType] = useState('text');
  const [responseFields, setResponseFields] = useState<ResponseField[]>([createEmptyResponseField()]);
  const [responseIds, setResponseIds] = useState<string[]>([]);

  useEffect(() => {
    if (questionId) {
      loadQuestionData();
    }
  }, [questionId]);

  const loadQuestionData = async () => {
  
  
    try {
      const question = await getQuestionById(questionId!);
      
  
      setNumero(question.numero?.toString() || '');
      setQuestionText(question.question_text || '');
      setInstruction(question.commentaire || '');
      setSelectedType(question.type || 'text');
  
      const responses = await fetchResponsesByQuestionId(questionId!);
     
  
      setResponseIds(responses.map(r => r.id || ''));
      setResponseFields(
        responses.map(response => ({
          reponse: response.reponse_text || '',
          education: response.education || '',
          alimentation: response.alimentation || '',
          pauvrete: response.pauvrete || '',
          cadreVie: response.cadre_vie || '',
          santePhysique: response.sante_physique || '',
          violence: response.violence || '',
          indiceSortir: response.indice_sortir || '',
        }))
      );
  
    } catch (error: any) {

      alert('Erreur de chargement : ' + (error.message || ''));
    }
  };
  

  const handleAddResponseField = () => {
    setResponseFields([...responseFields, createEmptyResponseField()]);
  };
  const handleDeleteQuestion = () => {
    setShowDeleteDialog(true);
  };
  const handleRemoveResponseField = (index: number) => {
    setResponseToDeleteIndex(index);
    setShowDeleteResponseDialog(true);
  };
  
  const confirmDeleteResponseField = async () => {
    if (responseToDeleteIndex === null) return;
  
    const index = responseToDeleteIndex;
  
    if (responseIds[index]) {
      try {
        await deleteResponse(responseIds[index]);
        const newIds = [...responseIds];
        newIds.splice(index, 1);
        setResponseIds(newIds);
      } catch (error) {
        console.error("Erreur suppression réponse :", error);
        alert("Erreur lors de la suppression de la réponse.");
        return;
      }
    }
  
    const newFields = [...responseFields];
    newFields.splice(index, 1);
    setResponseFields(newFields);
    setResponseToDeleteIndex(null);
  };
  
  const confirmDeleteQuestion = async () => {
    try {
      for (const responseId of responseIds) {
        if (responseId) {
          await deleteResponse(responseId);
        }
      }
      await deleteQuestion(questionId!);
      alert("Question et réponses supprimées avec succès.");
      navigate(-1);
    } catch (error: any) {
      console.error("Erreur suppression question :", error);
      alert("Erreur lors de la suppression : " + (error.message || ''));
    }
  };
  
 // assure-toi que c’est bien importé

 const handleUpdateQuestion = () => {
  setShowUpdateDialog(true);
};

const confirmUpdateQuestion = async () => {
  try {
    if (!numero || !questionText) {
      alert("Le numéro et le texte de la question sont requis.");
      return;
    }

    const updatedQuestion: Question = {
      id: questionId!,
      numero: numero,
      question_text: questionText,
      type: selectedType,
      commentaire: instruction,
    };

    await updateQuestionService(questionId!, updatedQuestion);

    for (let i = 0; i < responseFields.length; i++) {
      const r = responseFields[i];
      const payload: Response = {
        question_id: questionId!,
        reponse_text: r.reponse,
        education: r.education,
        alimentation: r.alimentation,
        pauvrete: r.pauvrete,
        cadre_vie: r.cadreVie,
        sante_physique: r.santePhysique,
        violence: r.violence,
        indice_sortir: r.indiceSortir,
      };

      if (responseIds[i]) {
        await updateResponse(responseIds[i], payload);
      } else {
        await createResponse(payload);
      }
    }

    alert("Question et réponses mises à jour avec succès.");
    navigate(-1);
  } catch (error: any) {
    console.error("Erreur update question :", error);
    alert("Erreur lors de la mise à jour : " + (error.message || ''));
  }
};

  const handleFieldChange = (index: number, field: keyof ResponseField, value: string) => {
    const updatedFields = [...responseFields];
    updatedFields[index][field] = value;
    setResponseFields(updatedFields);
  };

  return (
      <div className="h-screen flex flex-col bg-gray-100 ">
  
  
              <div className="w-full flex justify-stard gap-32 px-4 md:px-8 py-4 md:py-2 shadow-md bg-white ">
                  <button
                      onClick={() => navigate(-1)}
                      className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition cursor-pointer shrink-0"
                      title="Retour"
                      aria-label="Retour"
                  >
                      <IoChevronBack size={20} className="md:size-6" />
                  </button>
  
                  <h2 className="text-2xl font-semibold ">Modifier une quetion</h2>

                  <button onClick={handleUpdateQuestion} className="px-4 py-2 bg-orange-500 text-white rounded-full">Enregistrer</button>
                  <button onClick={handleDeleteQuestion} className="mr-4 px-4 py-2 bg-red-500 text-white rounded-full">Supprimer</button>

              </div>

              <div className="p-8 flex-1 overflow-auto flex justify-center ">
              <div className="w-full md:w-4/5">
              <div className="bg-white p-6 border-l-8 border-gray-800 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CustomTextField name="numero" label="Numéro" value={numero} onChange={e => setNumero(e.target.value)} />
      <CustomTextField name="question" label="Texte de la question" value={questionText} onChange={e => setQuestionText(e.target.value)} />
      <CustomTextField name="instruction" label="Instruction" value={instruction} onChange={e => setInstruction(e.target.value)} />
      <div className="flex flex-col">
      <label className="text-sm text-gray-500 mb-1">Type</label>
      <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="w-full px-4 py-2 rounded-full border border-gray-300">
        <option value="text">Texte</option>
        <option value="reponseunique">Réponse unique</option>
        <option value="reponsemultiples">Réponses multiples</option>
      </select>
      </div> </div>
            </div>

            <div className="bg-white p-6 border-l-8 border-gray-800">    
      <h3 className="text-lg font-semibold mt-4">Réponses</h3>
      {responseFields.map((response, index) => (
        <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
          <CustomTextField name={`reponse-${index}`} label="Réponse" value={response.reponse} onChange={e => handleFieldChange(index, 'reponse', e.target.value)} />
          <CustomTextField name={`education-${index}`} label="Éducation" value={response.education} onChange={e => handleFieldChange(index, 'education', e.target.value)} />
          <CustomTextField name={`alimentation-${index}`} label="Alimentation" value={response.alimentation} onChange={e => handleFieldChange(index, 'alimentation', e.target.value)} />
          <CustomTextField name={`pauvrete-${index}`} label="Pauvreté" value={response.pauvrete} onChange={e => handleFieldChange(index, 'pauvrete', e.target.value)} />
          <CustomTextField name={`cadreVie-${index}`} label="Cadre de vie" value={response.cadreVie} onChange={e => handleFieldChange(index, 'cadreVie', e.target.value)} />
          <CustomTextField name={`santePhysique-${index}`} label="Santé physique" value={response.santePhysique} onChange={e => handleFieldChange(index, 'santePhysique', e.target.value)} />
          <CustomTextField name={`violence-${index}`} label="Violence" value={response.violence} onChange={e => handleFieldChange(index, 'violence', e.target.value)} />
          <CustomTextField name={`indiceSortir-${index}`} label="Indice sortir" value={response.indiceSortir} onChange={e => handleFieldChange(index, 'indiceSortir', e.target.value)} />
          </div>
          <button onClick={() => handleRemoveResponseField(index)} 
          className="text-red-500 mt-2">Supprimer</button>
        </div>
      ))}

      <button onClick={handleAddResponseField} className="bg-blue-500 text-white px-4 py-2 rounded">Ajouter une réponse</button>

    </div>
    </div>
    </div>
    {showDeleteDialog && (
  <CustomDialog
    title="Confirmation de suppression"
    content="Êtes-vous sûr de vouloir supprimer cette question et ses réponses ?"
    buttonText="Supprimer"
    onClose={() => setShowDeleteDialog(false)}
    onConfirm={() => {
      setShowDeleteDialog(false);
      confirmDeleteQuestion();
    }}
  />
)}

{showUpdateDialog && (
  <CustomDialog
    title="Confirmation de mise à jour"
    content="Êtes-vous sûr de vouloir mettre à jour cette question ?"
    buttonText="Mettre à jour"
    onClose={() => setShowUpdateDialog(false)}
    onConfirm={() => {
      setShowUpdateDialog(false);
      confirmUpdateQuestion();
    }}
  />
)}

{showDeleteResponseDialog && (
  <CustomDialog
    title="Confirmation de suppression de réponse"
    content="Êtes-vous sûr de vouloir supprimer cette réponse ?"
    buttonText="Supprimer"
    onClose={() => setShowDeleteResponseDialog(false)}
    onConfirm={() => {
      setShowDeleteResponseDialog(false);
      confirmDeleteResponseField();
    }}
  />
)}

                </div>
    
        
  );
};

export default UpdateQuestionPage;
