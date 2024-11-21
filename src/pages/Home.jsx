import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImgCard from '../components/Card';
import { Button, Typography } from '@mui/material';
import Terreno2 from '../assets/Terreno2.jpg';

const Home = () => {
  const [filters, setFilters] = useState({
    ubicacion: '',
    precio_min: '',
    precio_max: '',
    tamano_min: '',
    tamano_max: '',
  });
  const [terrenos, setTerrenos] = useState([]);
  const [showPanel, setShowPanel] = useState(true); // Estado para controlar el panel

  // Cargar terrenos al montar el componente
  useEffect(() => {
    const fetchTerrenos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8070/terreno/consultar_terrenos');
        const data = await response.json();
        setTerrenos(data);
      } catch (error) {
        console.error('Error fetching terrenos:', error);
      }
    };
    fetchTerrenos();
  }, []);

  // Filtrar terrenos
  const handleFiltersChange = async (newFilters) => {
    console.log(newFilters);
    setFilters(newFilters);
    setShowPanel(false); // Ocultar el panel al aplicar filtros

    try {
      const queryObject = {
        ubicacion: newFilters.ubicacion,
        precio_min: newFilters.precio_min,
        precio_max: newFilters.precio_max,
        tamano_min: newFilters.tamano_min,
        tamano_max: newFilters.tamano_max,
      };
      const cleanedQueryObject = Object.fromEntries(
        Object.entries(queryObject).filter(([_, value]) => value !== null && value !== undefined && value !== '')
      );
      const queryParams = new URLSearchParams(cleanedQueryObject).toString();
      const response = await fetch(`http://127.0.0.1:8070/terreno/filtrar_terrenos?${queryParams}`);
      const data = await response.json();
      setTerrenos(data);
    } catch (error) {
      console.error('Error filtering terrenos:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onFiltersChange={handleFiltersChange} />

      {/* Mostrar el panel solo si `showPanel` es true */}
      {showPanel && (
        <div
          className="relative flex items-center justify-center h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${Terreno2})` }}
        >
          <div
            className="relative z-10 p-16 w-11/12 max-w-4xl rounded-lg shadow-xl bg-cover bg-center text-white"
            style={{
              backgroundImage: `url(${Terreno2})`,
              backgroundBlendMode: 'overlay',
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}
          >
            <Typography
              variant="h3"
              className="text-white font-bold text-4xl mb-8 tracking-wide pb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Encuentra tu terreno para Ganadería, Agricultura y Más
            </Typography>

            <div className="flex justify-center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() =>
                  document.getElementById('terrenos-section').scrollIntoView({ behavior: 'smooth' })
                }
                className="py-3 px-6 text-lg font-semibold"
              >
                Encuentra aquí ahora
              </Button>
            </div>
          </div>
        </div>
      )}

      <div id="terrenos-section" className="flex flex-col items-center flex-grow p-10">
        <Typography
          variant="h4"
          className="mb-10 text-3xl font-bold text-gray-800 pb-10"
        >
          Terrenos disponibles
        </Typography>
        <div className="flex flex-wrap gap-4 justify-center">
          {terrenos.length > 0 ? (
            terrenos.map((terreno) => (
              <ImgCard key={terreno.idTerreno} terreno={terreno} />
            ))
          ) : (
            <div className="flex items-center justify-center h-48 p-10">
              <div className="flex flex-row gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500 animate-bounce"></div>
                <div className="w-5 h-5 rounded-full bg-blue-500 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-5 h-5 rounded-full bg-blue-500 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
