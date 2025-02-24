import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PageChilds from "./pages/PageChilds";
import PageChild from "./pages/PageChild";
import PageToken from "./pages/PageToken";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageChilds />} />
          <Route path="child/:id" element={<PageChild />} />
          <Route path="token" element={<PageToken />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
