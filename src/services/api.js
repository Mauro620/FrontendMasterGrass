// src/services/api.js
import { config } from "../apiConfig";
import "./index.css";

const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${config.API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...config.headers,
        ...options.headers, // Permite agregar encabezados adicionales, como tokens
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error;
  }
};

// Ejemplo de función para obtener datos de usuarios
export const getUsers = () => {
  return fetchData("/users");
};

// Ejemplo de función para crear un usuario
export const createUser = (userData) => {
  return fetchData("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};
