import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnterToken from "./pages/PageToken";
import ChildList from "./pages/PageChilds";
import Layout from "./components/Layout";
import ChildDetail from "./components/childdetail/ChildDetail";
import RadarChartComponent from "./components/childdetail/ChildGraphe";
import UserCard from "./components/childdetail/childCardAvis";
import IndicatorsCard from "./components/childdetail/ChildIndices";
import ResponsesCard from "./components/childdetail/ChildReponse";
import ChatBox from "./components/childdetail/ChildChat";
import ChildDetailPage from "./pages/PageChild";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnterToken />} />
        <Route path="/child-list" element={<ChildList />} />
        <Route path="/child-detail" element={<ChildDetailPage />} />
        <Route path="/acceuil" element={<Layout/>} />
        <Route path="/radar" element={<RadarChartComponent/>} />
        <Route path="/avis" element={<UserCard/>} />
        <Route path="/indice" element={<IndicatorsCard/>} />
        <Route path="/reponse" element={<ResponsesCard />} />
        <Route path="/chat" element={<ChatBox />} />
      </Routes>
    </Router>
  );
}

export default App;
