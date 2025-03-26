import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import PageToken from "./pages/PageToken";
import EnterToken from "./pages/PageToken";  // Ou autre fichier où tu gères la redirection du token
import ChildList from "./pages/PageChilds";
import Layout from "./components/Layout";
import ChildDetailPage from "./pages/PageChild";

const TokenHandler = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  return token ? <PageToken /> : null;
};

const AppRoutes = () => {
  return (
    <Router>
      <TokenHandler /> {/* Gère la détection du token avant les routes */}
      <Routes>
        <Route path="/" element={<EnterToken />} />
        <Route path="/child-list" element={<ChildList />} />
        <Route path="/child-detail/:id" element={<ChildDetailPage />} />
        <Route path="/childs" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
