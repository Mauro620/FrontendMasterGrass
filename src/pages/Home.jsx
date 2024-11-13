import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { Button, Typography } from '@mui/material';
import Terreno2 from '../assets/Terreno2.jpg'

const Home = () => {
  const scrollToTerrenos = () => {
    document.getElementById('terrenos-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Sección de introducción con imagen y texto */}
      <div className="relative flex items-center justify-start h-screen bg-cover bg-center mx-9 rounded-xl" 
           style={{ backgroundImage: `url(${Terreno2})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl"></div> {/* Overlay oscuro */}
        
        <div className="relative z-10 p-8 max-w-xl text-left">
          <Typography variant="h3" className="text-white font-extrabold">
            Encuentra tu terreno para Ganadería, agricultura, jardinería y más
          </Typography>
          
          <Typography variant="body1" className="text-gray-300 m-11">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            onClick={scrollToTerrenos}
          >
            Encuentra aquí ahora
          </Button>
        </div>
      </div>

      {/* Cards de terrenos (sección de terrenos) */}
      <div id="terrenos-section" className="justify-center flex-grow p-4">
        <Typography variant="h4" className="mb-11">
          Terrenos disponibles
        </Typography>
        <div className="flex flex-wrap gap-4">
          <Card />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
