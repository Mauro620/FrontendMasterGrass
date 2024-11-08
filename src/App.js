// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TerrenoView from "./pages/TerrenoView";
import CrearTerreno from "./pages/AnadirTerreno";
import { AuthProvider } from "./context/AuthContext"; // Importa el AuthProvider

const App = () => {
  return (
    <AuthProvider>
      {" "}
      {/* Envuelve tu app con el AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terreno" element={<TerrenoView />} />
          <Route path="/add_terreno" element={<CrearTerreno />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
