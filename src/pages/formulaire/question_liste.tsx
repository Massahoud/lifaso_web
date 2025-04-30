import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import jsPDF from "jspdf";
import { fetchAllQuestions, Question } from "../../services/question_services";
import { fetchResponsesByQuestionId, Response } from "../../services/réponse_service";
import api from "../../services/api";
import FormulaireSeach from "../../components/formulaire/formulaire_search";
import FormulaireFilter from "../../components/formulaire/filtrer_formulaire";
import Cookies from "js-cookie";

interface User {
  statut?: string;
}
const QuestionsPage = () => {
  const [questionsWithResponses, setQuestionsWithResponses] = useState<
    { question: Question; responses: Response[] | null }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
   const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const userId = Cookies.get('userId');
  useEffect(() => {
   
  
    if (!userId) return;

    api
      .get(`/users/${userId}`)
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) =>
        console.error("Erreur récupération user connecté :", error)
      );
  }, [userId]);
 
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const fetchedQuestions = await fetchAllQuestions();
        const withResponses = await Promise.all(
          fetchedQuestions.map(async (q) => {
            try {
              const r = await fetchResponsesByQuestionId(q.id!);
              return { question: q, responses: r };
            } catch {
              return { question: q, responses: [] };
            }
          })
        );
        setQuestionsWithResponses(withResponses);
      } catch (error: any) {
         setErrorMessage("Erreur lors du chargement des questions");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    let y = 20;
  
    doc.setFontSize(16);
    doc.text("Questions et réponses", 10, y);
    y += 10;
  
    questionsWithResponses.forEach(({ question, responses }) => {
      if (y > pageHeight - 30) {
        doc.addPage();
        y = 20;
      }
  
      doc.setFontSize(13);
      doc.text(`${question.numero}: ${question.question_text}`, 10, y);
      y += 8;
  
      if (responses && responses.length > 0) {
        responses.forEach((response) => {
          if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
          }
          doc.setFontSize(11);
          doc.text(`- ${response.reponse_text || "Réponse non fournie"}`, 15, y);
          y += 6;
        });
      } else {
        doc.setFontSize(11);
        doc.text("- Aucune réponse", 15, y);
        y += 6;
      }
  
      y += 5; // espace entre les questions
    });
  
    doc.save("questions_reponses.pdf");
  };
  

  const filteredQuestions = questionsWithResponses.filter(({ question }) => {
    const q = searchQuery.toLowerCase();
    return (
      question.numero?.toString().toLowerCase().includes(q) || 
      question.question_text.toLowerCase().includes(q)
    );
  });
  

  const handleSearch = (query: string) => setSearchQuery(query);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <FormulaireSeach onSearch={handleSearch} />
      <FormulaireFilter onExport={handleExportToPDF} />


      <div className="p-4 ">
        <HeaderAndTabs />
      </div>

      <div className="p-4 flex-1 overflow-auto">
        <div className="flex-1 overflow-auto p-4 bg-white rounded shadow">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid" />
            </div>
          ) : errorMessage ? (
            <div className="text-red-500">{errorMessage}</div>
          ) : (
            <div>
              {filteredQuestions.map(({ question, responses }) => (
                <div key={question.id} className="mb-6">
                  <div className="flex justify-between items-center">
                    <p className="font-bold">
                      {question.numero}: {question.question_text}
                    </p>
                    {(currentUser?.statut === "admin" ||
              currentUser?.statut === "superadmin") && (
              <>
                    <button
                      onClick={() =>
                        navigate(`/questions/update/${question.id}`,)
                      }
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Pencil size={20} />
                    </button>
                    </>
            )}
                  </div>
                  <div className="mt-2 space-y-2">
                    {responses?.map((response) => (
                      <ResponseRow key={response.id} response={response} />
                    ))}
                  </div>
                  <hr className="my-4" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const HeaderAndTabs = () => {
  const categories = [
    "Alimentation",
    "Cadre de vie",
    "Éducation",
    "Pauvreté",
    "Santé physique",
    "Violence",
    "Indices",
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-2 ">
        <h2 className="text-lg font-bold">Questions et réponses</h2>
        <div className="flex space-x-2">
          {categories.map((cat, i) => (
            <span key={i} className="text-sm font-semibold text-center w-[100px]">
              {cat}
            </span>
          ))}
        </div>
      </div>
      <hr />
    </>
  );
};

const ResponseRow = ({ response }: { response: Response }) => {
  const values = [
    response.alimentation,
    response.cadre_vie,
    response.education,
    response.pauvrete,
    response.sante_physique,
    response.violence,
    response.indice_sortir ?? "—",
  ];

  return (
    <div className="flex items-start bg-gray-100 p-2 rounded">
      <div className="w-[500px]">
        {response.reponse_text ? (
          <p className="font-semibold">{response.reponse_text}</p>
        ) : (
          <div className="bg-gray-300 p-2 rounded text-gray-600">
            Réponse non fournie
          </div>
        )}
      </div>
      <div className="flex-1 flex justify-around">
        {values.map((val, idx) => (
          <div key={idx} className="text-center w-1/7 text-sm font-medium">
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsPage;
