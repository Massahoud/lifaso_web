import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchChildDetails,
  fetchResponses,
  fetchScore,
  fetchIndicators,
} from "../services/childDetail_Service";
import RadarChartComponent from "../components/childdetail/ChildGraphe";
import IndicatorsCard from "../components/childdetail/ChildIndices";
import ChildDetail from "../components/childdetail/ChildDetail";
import UserCard from "../components/childdetail/childCardAvis";
import { ResponsesCard } from "../components/childdetail/ChildReponse";
import ChatBox from "../components/childdetail/ChildChat";
import AppBar from "../components/childdetail/AppBar";
import { motion } from "framer-motion";
import { useMediaQuery } from "../services/useMediaQuery"; // ajuste selon ton chemin

const ChildDetailPage = () => {
  const { id } = useParams();
  const [child, setChild] = useState(null);
  const [responses, setResponses] = useState([]);
  const [indicators, setIndicators] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [indices, setIndices] = useState<{ subject: string; value: number }[]>(
    []
  );
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  useEffect(() => {
    if (!id) return;

    setLoading(true);

    Promise.allSettled([
      fetchChildDetails(id),
      fetchResponses(id),
      fetchScore(id),
      fetchIndicators(id),
    ])
      .then((results) => {
        const [childResult, responsesResult, scoreResult, indicatorsResult] =
          results;

        if (childResult.status === "fulfilled") {
          setChild(childResult.value);
        }

        if (responsesResult.status === "fulfilled") {
          setResponses(responsesResult.value);
        }

        if (scoreResult.status === "fulfilled") {
          setIndices(scoreResult.value);
        }

        if (indicatorsResult.status === "fulfilled") {
          setIndicators(indicatorsResult.value);
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
        <div className="bg-gray-200 h-16 w-full animate-pulse" />
        {isLargeScreen ? (
        // Affichage pour les grands écrans
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 flex-grow overflow-auto">
          <div className="col-span-3 flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-lg p-4 h-full animate-pulse" />
          </div>

          <div className="col-span-4 flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-lg p-4 h-2/5 animate-pulse" />
            <div className="bg-white rounded-2xl shadow-lg p-4 h-1/5 animate-pulse" />
            <div className="bg-white rounded-2xl shadow-lg p-4 h-2/5 animate-pulse" />
          </div>

          <div className="col-span-5 flex flex-col gap-4 mr-4">
            <div className="bg-white rounded-2xl shadow-lg p-4 h-3/5 animate-pulse" />
            <div className="bg-white rounded-2xl shadow-lg p-4 h-2/5 animate-pulse" />
          </div>
        </div>
      ) : (
        // Affichage pour les petits écrans
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100 flex-grow overflow-auto">
          <div className="bg-white rounded-2xl shadow-lg p-4 animate-pulse h-[300px]" />
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-4 animate-pulse h-[180px]" />
            <div className="bg-white rounded-2xl shadow-lg p-4 animate-pulse h-[100px]" />
            <div className="bg-white rounded-2xl shadow-lg p-4 animate-pulse h-[180px]" />
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-4 animate-pulse h-[300px]" />
            <div className="bg-white rounded-2xl shadow-lg p-4 animate-pulse h-[200px]" />
          </div>
        </div>
      )}
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
      {/* AppBar fixé en haut */}
      {child && (
        <div className="fixed top-0 left-0 w-full z-50">
          <AppBar child={child} responses={responses} />
        </div>
      )}

      {/* Contenu de la page avec padding pour éviter le chevauchement avec l’AppBar */}
      <div id="capture" className="pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 p-4 bg-gray-100 flex-grow overflow-auto">
          {/* Section détails enfant */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
              {child ? (
                <ChildDetail child={child} />
              ) : (
                <p>Pas d'information sur l'enfant.</p>
              )}
            </div>
          </div>

          {/* Section radar, indicateurs, avis */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              {indices.length > 0 ? (
                <RadarChartComponent data={indices} />
              ) : (
                <p>Aucune donnée pour le graphique.</p>
              )}
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-4">
              <IndicatorsCard indicators={indicators} />
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-4 h-2/5">
              {child ? <UserCard child={child} /> : <p>Avis non disponible.</p>}
            </div>
          </div>

          {/* Section réponses et chat */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
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
