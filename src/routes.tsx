import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnterToken from "./pages/PageToken";
import ChildList from "./pages/PageChilds";
import Layout from "./components/Layout";

import ChildDetailPage from "./pages/PageChild";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnterToken />} />
        <Route path="/child-list" element={<ChildList />} />
        <Route path="/child-detail/:id" element={<ChildDetailPage />} />

        <Route path="/childs/" element={<Layout/>} />
      </Routes>
    </Router>
  );
}

export default App;
