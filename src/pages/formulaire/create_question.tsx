import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuestion as createQuestionAPI, Question } from '../../services/question_services';
import { createResponse, Response } from '../../services/réponse_service';
import CustomTextField from '../../components/ui/custom_textfield';
import { IoChevronBack } from "react-icons/io5";
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

const CreateQuestionPage: React.FC = () => {
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const [showDialog2, setShowDialog2] = useState(false);
    const [numero, setNumero] = useState('');
    const [question, setQuestion] = useState('');
    const [instruction, setInstruction] = useState('');
    const [selectedType, setSelectedType] = useState('choix');
    const [responseFields, setResponseFields] = useState<ResponseField[]>([createEmptyResponseField()]);

    function createEmptyResponseField(): ResponseField {
        return {
            reponse: '',
            education: '',
            alimentation: '',
            pauvrete: '',
            cadreVie: '',
            santePhysique: '',
            violence: '',
            indiceSortir: '',
        };
    }

    const addResponseField = () => {
        setResponseFields([...responseFields, createEmptyResponseField()]);
    };

    const removeResponseField = (index: number) => {
        const newFields = [...responseFields];
        newFields.splice(index, 1);
        setResponseFields(newFields);
    };

    const updateField = (index: number, fieldName: keyof ResponseField, value: string) => {
        const newFields = [...responseFields];
        newFields[index][fieldName] = value;
        setResponseFields(newFields);
    };

    const handleCreateQuestion = async () => {
        try {
          const questionData: Omit<Question, 'id'> = {
            numero:numero,
            question_text: question,
            type: selectedType,
            commentaire: instruction,
          };
      
          const newQuestion = await createQuestionAPI(questionData as Question);
      
          if (!newQuestion?.id) {
            throw new Error('ID de la question manquant');
          }
      
          for (const field of responseFields) {
            if (field.reponse.trim()) {
              const responseData: Response = {
                question_id: newQuestion.id,
                reponse_text: field.reponse,
                education: field.education,
                alimentation: field.alimentation,
                pauvrete: field.pauvrete,
                cadre_vie: field.cadreVie,
                sante_physique: field.santePhysique,
                violence: field.violence,
                indice_sortir: field.indiceSortir,
              };
              await createResponse(responseData);
            }
          }
      
          // Au lieu de alert
          setShowDialog(true);
        } catch (error) {
          console.error('Erreur lors de la création:', error);
            setShowDialog2(true);
        }
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
            <button disabled className="mr-4 px-4 py-2 bg-gray-300 text-white rounded-full">Visualiser</button>
            <button onClick={handleCreateQuestion } className="px-4 py-2 bg-orange-600 text-white rounded-full">Enregistrer</button>
        </div>

        <div className="p-8 flex-1 overflow-auto flex justify-center ">
        <div className="w-full md:w-4/5">
            <div className="bg-white p-6 border-l-8 border-gray-800 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomTextField
                        name="numero"
                        label="Numéro"
                        type="number"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                    />
                    <CustomTextField
                        name="question"
                        label="Texte de la question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <CustomTextField
                        name="instruction"
                        label="Instruction"
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                    />
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 mb-1">Type</label>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full px-4 py-2 rounded-full border border-gray-300"
                        >
                         
                            <option value="text">Texte</option>
                            <option value="reponseunique">Réponse unique</option>
                            <option value="reponsemultiples">Réponses multiples</option>
                            
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 border-l-8 border-gray-800">
                <h3 className="text-lg font-medium mb-4">Réponses</h3>
                {responseFields.map((field, index) => (
                    <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
                            <CustomTextField
                                name={`reponse-${index}`}
                                label="Réponse"
                                value={field.reponse}
                                onChange={(e) => updateField(index, 'reponse', e.target.value)}
                            />
                            <CustomTextField
                                name={`education-${index}`}
                                label="Éducation"
                                value={field.education}
                                onChange={(e) => updateField(index, 'education', e.target.value)}
                            />
                            <CustomTextField
                                name={`alimentation-${index}`}
                                label="Alimentation"
                                value={field.alimentation}
                                onChange={(e) => updateField(index, 'alimentation', e.target.value)}
                            />
                            <CustomTextField
                                name={`pauvrete-${index}`}
                                label="Pauvreté"
                                value={field.pauvrete}
                                onChange={(e) => updateField(index, 'pauvrete', e.target.value)}
                            />
                            <CustomTextField
                                name={`cadreVie-${index}`}
                                label="Cadre de vie"
                                value={field.cadreVie}
                                onChange={(e) => updateField(index, 'cadreVie', e.target.value)}
                            />
                            <CustomTextField
                                name={`santePhysique-${index}`}
                                label="Santé physique"
                                value={field.santePhysique}
                                onChange={(e) => updateField(index, 'santePhysique', e.target.value)}
                            />
                            <CustomTextField
                                name={`violence-${index}`}
                                label="Violence"
                                value={field.violence}
                                onChange={(e) => updateField(index, 'violence', e.target.value)}
                            />
                            <CustomTextField
                                name={`indiceSortir-${index}`}
                                label="Indice à sortir"
                                value={field.indiceSortir}
                                onChange={(e) => updateField(index, 'indiceSortir', e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => removeResponseField(index)}
                            className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                        >
                            Supprimer
                        </button>
                    </div>
                ))}

                <button
                    onClick={addResponseField}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Ajouter une réponse
                </button>
            </div>
        </div>
        </div>
        {showDialog && (
        <CustomDialog
          title="Succès"
          content="Question et réponses créées avec succès"
          buttonText="OK"
          onClose={() => setShowDialog(false)}
          onConfirm={() => {
            setShowDialog(false);
            navigate('/formulaire');
          }}
        />
      )}
        {showDialog2 && (
        <CustomDialog
          title="Erreur"
          content="Erreur lors de la création de la question."
          buttonText="OK"
          onClose={() => setShowDialog2(false)}
          onConfirm={() => {
            setShowDialog2(false);
            navigate('/formulaire');
          }}
        />
        )}
        </div>
    );
   
      
};

export default CreateQuestionPage;
