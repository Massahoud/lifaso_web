import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import ChildList from "./pages/PageChilds";
import Layout from "./components/Layout";
import ChildDetailPage from "./pages/PageChild";

import GroupsListPage from "./pages/groups/Pagegroups";
import GroupMembersPage from "./components/groups/group_members";

import PageUsers from "./pages/users/pageUsers";

import UserProfile from "./components/users/user_profil";
import ScatterPlotPage from "./pages/nuagedepoint/Pagenuage";
import QuestionsPage from "./pages/formulaire/question_liste";
import CreateQuestionPage from "./pages/formulaire/create_question";
import UpdateQuestionPage from "./pages/formulaire/update_questio";
import LoginPage from "./pages/auth/login_page";
import ResetPasswordPage from "./pages/auth/forgot_password";
import ResetPasswordForm from "./pages/auth/change_password";
import SignupWithInvitePage from "./pages/auth/sign_up_page";
import OrganismesListPage from "./pages/organisme/pageorganisme";
import StartSurveyPage from "./pages/enquete/start_survey";
import SurveyPage from "./pages/enquete/survey";
import PageParametre from "./pages/parametre/PageParametre";

import NotFoundPage from "./notFoundPage"; // Import du composant NotFoundPage

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/start_survey" element={<StartSurveyPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/nuagedepoint" element={<ScatterPlotPage />} />
        <Route path="/formulaire/create" element={<CreateQuestionPage />} />
        <Route path="/creer_compte" element={<SignupWithInvitePage />} />
        <Route path="/questions/update/:questionId" element={<UpdateQuestionPage />} />
        <Route path="/users/send_invitation" element={<PageUsers />} />
        <Route path="/modifier_motdepasse" element={<ResetPasswordForm />} />
        <Route path="/motdepasse_oublie" element={<ResetPasswordPage />} />
        <Route path="/users/profile/:id" element={<UserProfile />} />
        <Route path="/child-detail/:id" element={<ChildDetailPage />} />

        <Route path="/" element={<Layout />}>
          <Route path="/childs" element={<ChildList />} />
          <Route path="/groups" element={<GroupsListPage />} />
          <Route path="/formulaire" element={<QuestionsPage />} />
          <Route path="/organismes" element={<OrganismesListPage />} />
          <Route path="/users" element={<PageUsers />} />
          <Route path="/parametre" element={<PageParametre />} />
          <Route path="/group_membres" element={<GroupMembersPage />} />
        </Route>

        {/* Route pour les pages non trouvées */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;