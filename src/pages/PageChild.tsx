import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchChildDetails,
  fetchResponses,
  fetchScore,
  fetchIndicators
} from "../services/childDetail_Service";
import RadarChartComponent from "../components/childdetail/ChildGraphe";
import IndicatorsCard from "../components/childdetail/ChildIndices";
import ChildDetail from "../components/childdetail/ChildDetail";
import UserCard from "../components/childdetail/childCardAvis";
import ResponsesCard from "../components/childdetail/ChildReponse";
import ChatBox from "../components/childdetail/ChildChat";
import AppBar from "../components/childdetail/AppBar";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
const ChildDetailPage = () => {
  const { id } = useParams();
  const [child, setChild] = useState(null);
  const [responses, setResponses] = useState([]);
  const [indicators, setIndicators] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [indices, setIndices] = useState<{ subject: string; value: number }[]>([]);
  useEffect(() => {
    if (id && !loading) {
      const captureElement = document.getElementById("capture");
      if (captureElement) {
        // Assure-toi que le DOM est prêt
        html2canvas(captureElement, {
          backgroundColor: "#ffffff",
          useCORS: true,
          allowTaint: false
        }).then((canvas) => {
          const image = canvas.toDataURL("image/png");
          console.log("Capture réussie", image);
        }).catch((error) => {
          console.error("Erreur lors de la capture:", error);
        });
      }
    }
  }, [id, loading]);  // Déclenche après que l'ID et le contenu aient été chargés
  
  useEffect(() => {
    if (!id) return;

    setLoading(true);

    Promise.allSettled([
      fetchChildDetails(id),
      fetchResponses(id),
      fetchScore(id),
      fetchIndicators(id)
    ])
      .then((results) => {
        const [childResult, responsesResult, scoreResult, indicatorsResult] = results;

        if (childResult.status === "fulfilled") {
          setChild(childResult.value);
        } else {
          console.error("Erreur chargement enfant:", childResult.reason);
        }

        if (responsesResult.status === "fulfilled") {
          setResponses(responsesResult.value);
        } else {
          console.error("Erreur chargement réponses:", responsesResult.reason);
        }

        if (scoreResult.status === "fulfilled") {
          setIndices(scoreResult.value);
        } else {
          console.error("Erreur chargement scores:", scoreResult.reason);
        }

        if (indicatorsResult.status === "fulfilled") {
          setIndicators(indicatorsResult.value);
        } else {
          console.error("Erreur chargement indicateurs:", indicatorsResult.reason);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-screen flex flex-col"
       
      >
        <div className="bg-gray-200 h-16 w-full animate-pulse"></div>
  
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 flex-grow overflow-auto">
          <div className="col-span-3 flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-lg p-4 h-full animate-pulse"></div>
          </div>
  
          <div className="col-span-4 flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-lg p-4 h-2/5 animate-pulse"></div>
            <div className="bg-white rounded-2xl shadow-lg p-4 h-1/5 animate-pulse"></div>
            <div className="bg-white rounded-2xl shadow-lg p-4 h-2/5 animate-pulse"></div>
          </div>
  
          <div className="col-span-5 flex flex-col gap-4 mr-4">
            <div className="bg-white rounded-2xl shadow-lg p-4 h-3/5 animate-pulse"></div>
  
            <div className="bg-white  rounded-2xl shadow-lg p-3 h-2/5  animate-pulse">
              
            </div>
            
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex flex-col"
    >
      {child && <AppBar child={child} />}
      <div id="capture">
      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 flex-grow overflow-auto">
        <div className="col-span-3 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
            {child ? <ChildDetail child={child} /> : <p>Pas d'information sur l'enfant.</p>}
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 h-2/5">
            {indices.length > 0 ? (
              <RadarChartComponent data={indices} />
            ) : (
              <p>Aucune donnée pour le graphique.</p>
            )}
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 h-1/5">
            <IndicatorsCard indicators={indicators} />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 h-2/5">
            {child ? <UserCard child={child} /> : <p>Avis non disponible.</p>}
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-4 mr-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 h-3/5">
            {responses.length > 0 ? (
              <ResponsesCard responses={responses} />
            ) : (
              <p>Aucune réponse disponible.</p>
            )}
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
    </motion.div>
  );
};

export default ChildDetailPage;
