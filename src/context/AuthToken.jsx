import React, { createContext, useState } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto para envolver tu aplicación
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // Función para iniciar sesión y guardar el token
  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token); // Guarda el token en localStorage
  };

  // Función para cerrar sesión
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken'); // Elimina el token de localStorage
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
