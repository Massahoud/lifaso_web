import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes";
import "./styles/index.css"; // Tailwind et styles globaux
import "./i18n/i18n"; // Chargement des traductions

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
