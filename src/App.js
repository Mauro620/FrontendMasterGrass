import React from "react";
import PrimarySearchAppBar from "./components/Header";
import Footer from "./components/Footer";
import ImgCard from "./components/Card";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <PrimarySearchAppBar />
      <main className="flex-grow">
        <div className="px-4">
          <ImgCard />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
