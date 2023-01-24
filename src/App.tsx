import React from 'react';
import './App.css';
import DeliveryCalcComponent from '../src/components/DeliveryCalcComponent';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

function App() {
  return (
    <div className="App">

        <Header />
        <DeliveryCalcComponent />
        <Footer />

    </div>
  );
}

export default App;
