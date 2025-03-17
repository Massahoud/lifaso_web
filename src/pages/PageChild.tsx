
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import RadarChartComponent from "../components/childdetail/ChildGraphe";
import IndicatorsCard from "../components/childdetail/ChildIndices";
import ChildDetail from "../components/childdetail/ChildDetail";
import UserCard from "../components/childdetail/childCardAvis";
import ResponsesCard from "../components/childdetail/ChildReponse";
import ChatBox from "../components/childdetail/ChildChat";
import AppBar from "../components/childdetail/AppBar";

const API_URL = "https://soleilmainapi.vercel.app/api/enquete";
const CHOIX_REPONSE_URL = "https://soleilmainapi.vercel.app/api/choixreponse";
const SCORE_URL = "https://soleilmainapi.vercel.app/api/enquete/score";


const INDICES_URL = "https://soleilmainapi.vercel.app/api/choixreponse/indices";


const ChildDetailPage = () => {
  const { id } = useParams();
  const [child, setChild] = useState(null);
  const [responses, setResponses] = useState([]);
  const [indicators, setIndicators] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [indices, setIndices] = useState<{ subject: string; value: number }[]>([]);

  useEffect(() => {
    if (!id) return;

    api
      .get(`${API_URL}/${id}`)
      .then((response) => {
        setChild(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des détails :", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!id) return;

    api
      .get(`${CHOIX_REPONSE_URL}/${id}`)
      .then((response) => {
        setResponses(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des réponses :", error);
      });
  }, [id]);

  useEffect(() => {
    if (!id) return;

    api
      .get(`${SCORE_URL}/${id}`)
      .then((response) => {
        const childData = response.data[0];
        const formattedData = [
          { subject: "CADRE DE VIE", value: isNaN(Number(childData.cadre_vie)) ? 0 : Number(childData.cadre_vie) },
          { subject: "PAUVRETÉ", value: isNaN(Number(childData.pauvrete)) ? 0 : Number(childData.pauvrete) },
          { subject: "VIOLENCE", value: isNaN(Number(childData.violence)) ? 0 : Number(childData.violence) },
          { subject: "SANTÉ PHYSIQUE", value: isNaN(Number(childData.sante_physique)) ? 0 : Number(childData.sante_physique) },
          { subject: "ÉDUCATION", value: isNaN(Number(childData.education)) ? 0 : Number(childData.education) },
          { subject: "ALIMENTATION", value: isNaN(Number(childData.alimentation)) ? 0 : Number(childData.alimentation) },
        ];
        setIndices(formattedData);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des indices :", error);
      });
  }, [id]);

  useEffect(() => {
    if (!id) return;

    api
      .get(`${INDICES_URL}/${id}`)
      .then((response) => {
        const extractedIndicators: string[] = response.data.map((item: { indice_sortir: string }) => item.indice_sortir);
        setIndicators(extractedIndicators);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des indices :", error);
      });
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!child) return <p>Aucune donnée trouvée.</p>;

  return (
    <div className="h-screen flex flex-col">

      <AppBar child={child} />
    
      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 flex-grow overflow-auto">
        <div className="col-span-3 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
            <ChildDetail child={child} />
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 h-2/5">
            <RadarChartComponent data={indices} />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 h-1/5">
            <IndicatorsCard indicators={indicators} />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 h-2/5">
            <UserCard child={child} />
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-4 mr-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 h-3/5">
            <ResponsesCard responses={responses} />
          </div>

          <div className="bg-gray-700 text-white rounded-t-2xl p-3 font-bold">
            BOITE DE DIALOGUE
          </div>
          <div className="border border-gray-400 border-t-0 rounded-b-2xl p-4">
            <ChatBox enqueteId={id} />
          </div>

        </div>


      </div>
    </div>

  );
};
export default ChildDetailPage;
