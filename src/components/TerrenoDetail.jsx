// TerrenoDetail.jsx
import React from "react";
import { Button, Rating, IconButton } from "@mui/material";
import { LocationOn, FavoriteBorder, Share } from "@mui/icons-material";

const TerrenoDetail = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow-md rounded-lg space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Terreno en Envigado</h1>
        <div className="flex items-center space-x-2">
          <IconButton aria-label="add to favorites">
            <FavoriteBorder />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </div>
      </div>

      {/* Imagen y galería */}
      <div className="grid grid-cols-3 gap-4">
        <img
          src="https://via.placeholder.com/400x300"
          alt="Principal"
          className="col-span-2 w-full h-64 object-cover rounded-lg"
        />
        <div className="space-y-2">
          <img src="https://via.placeholder.com/150" alt="1" className="w-full h-32 object-cover rounded-lg" />
          <img src="https://via.placeholder.com/150" alt="2" className="w-full h-32 object-cover rounded-lg" />
        </div>
      </div>

      {/* Ubicación */}
      <div className="flex items-center space-x-2">
        <LocationOn className="text-gray-500" />
        <p className="text-gray-600">Envigado, Colombia</p>
      </div>

      {/* Detalles */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Descripción</h2>
        <p className="text-gray-700">
          Este terreno cuenta con un espacio amplio para actividades al aire libre y está rodeado de naturaleza. Ideal
          para alquiler temporal.
        </p>

        <h2 className="text-lg font-semibold">Características</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Tamaño: 5000 m²</li>
          <li>Tipo de Pasto: Bermuda</li>
          <li>Precio por noche: $50 USD</li>
        </ul>

        <h2 className="text-lg font-semibold">Reseñas</h2>
        <div className="flex items-center space-x-2">
          <Rating name="read-only" value={4} readOnly />
          <span className="text-gray-600">(25 Reseñas)</span>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex space-x-4 mt-6">
        <Button variant="contained" color="primary" className="bg-blue-500 hover:bg-blue-600 text-white">
          Reservar
        </Button>
        <Button variant="outlined" color="primary">
          Contactar al propietario
        </Button>
      </div>
    </div>
  );
};

export default TerrenoDetail;