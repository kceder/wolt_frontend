import React from 'react';
import './App.css';
import DeliveryCalcComponent from '../src/components/DeliveryCalcComponent';
import Header from '../src/components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <DeliveryCalcComponent />
    </div>
  );
}

export default App;
