import React from "react";
import ReactDOM from "react-dom/client";
import LifasoLandingPage from "./App";
import "./styles/index.css"; // Tailwind et styles globaux
// Chargement des traductions

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LifasoLandingPage/>
  </React.StrictMode>
);
