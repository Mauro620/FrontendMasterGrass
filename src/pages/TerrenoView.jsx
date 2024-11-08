import Header from '../components/Header';
import Footer from '../components/Footer';
import TerrenoDetail from '../components/TerrenoDetail';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import React, { useContext } from 'react';

const TerrenoView = () => {
  const { authToken } = useContext(AuthContext);

  if (!authToken) {
    return <Navigate to="/login" />; // Redirige al login si no hay token
  }
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />
      {/* este div es para el contenido dentro del body */}
      <div className="justify-center flex-grow p-4"> 
        <div className='flex flex-wrap gap-4 '>
          <TerrenoDetail />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TerrenoView;
