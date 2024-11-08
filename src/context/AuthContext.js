// src/context/AuthContext.js
import React, { createContext, useState } from "react";

// Crear el contexto
export const AuthContext = createContext();

// Crear un proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // Función para manejar el login y almacenar el token
  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem("authToken", token); // Opción: guardar en localStorage
  };

  // Función para manejar el logout y eliminar el token
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken"); // Eliminar el token del almacenamiento local
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
