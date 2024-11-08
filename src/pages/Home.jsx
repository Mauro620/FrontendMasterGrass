import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />
      {/* este div es para el contenido dentro del body */}
      <div className="justify-center flex-grow p-4"> 
        <div className='flex flex-wrap gap-4 '>
          <Card />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
