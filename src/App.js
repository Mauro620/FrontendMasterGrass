// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CrearTerreno from "./pages/AnadirTerreno";
import CargarImagenes from "./pages/UploadImages";
import UserProfile from "./pages/UserProfile";
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
          <Route path="/user" element={<UserProfile />} />
          <Route
            path="/terreno/imagenes/:idTerreno"
            element={<CargarImagenes />}
          />
          <Route path="/add_terreno" element={<CrearTerreno />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
