import React from "react";
import ReactDOM from "react-dom/client"; // Asegúrate de importar desde 'react-dom/client'
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Crear el root con React 18+
const root = ReactDOM.createRoot(document.getElementById("root")); // Cambiar a createRoot
root.render(<App />);

reportWebVitals();
