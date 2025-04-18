import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import PageToken from "./pages/PageToken";
import EnterToken from "./pages/PageToken";  // Ou autre fichier où tu gères la redirection du token
import ChildList from "./pages/PageChilds";
import Layout from "./components/Layout";
import ChildDetailPage from "./pages/PageChild";

import GroupsListPage from "./pages/Pagegroups";
import GroupMembersPage from "./components/groups/group_members";
import UpdateGroupPage from "./pages/groups/update_groups";

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
        <Route path="/groups/update/:groupeId" element={<UpdateGroupPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="childs" element={<ChildList />} />
          <Route path="groups" element={<GroupsListPage/>} />
          
          <Route path="/group_membres" element={<GroupMembersPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
