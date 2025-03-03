import React from "react";
import RadarChartComponent from "../components/childdetail/ChildGraphe";
import IndicatorsCard from "../components/childdetail/ChildIndices";
import ChildDetail from "../components/childdetail/ChildDetail";
import UserCard from "../components/childdetail/childCardAvis";
import ResponsesCard from "../components/childdetail/ChildReponse";
import ChatBox from "../components/childdetail/ChildChat";

const ChildDetailPage = () => {
  return (
    <div className="h-screen  flex flex-col">
      {/* AppBar */}
      <div className="bg-white shadow-md p-4 text-xl font-bold">
        Détails de l'Enfant
      </div>

      {/* Contenu principal */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 flex-grow">
        {/* Colonne gauche */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
            <ChildDetail />
          </div>
        </div>

        {/* Colonne centrale */}
        <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 h-2/5">
            <RadarChartComponent />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 h-1/5">
            <IndicatorsCard />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 h-2/5">
            <UserCard />
          </div>
        </div>

        {/* Colonne droite */}
        <div className="col-span-5 flex flex-col gap-4 mr-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 h-3/5">
            <ResponsesCard />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 h-2/5">
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildDetailPage;
