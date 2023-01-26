import React from 'react';
import './App.css';
import DeliveryCalcComponent from '../src/components/DeliveryCalcComponent';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

function App() {
  return (
    <div className="bg-white dark:bg-black h-screen">
        <Header />
        <DeliveryCalcComponent />
        <Footer />
    </div>
  );
}

export default App;
