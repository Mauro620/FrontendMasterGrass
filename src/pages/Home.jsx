import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="body-content flex m-4">
        <Card className="px-4" />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
