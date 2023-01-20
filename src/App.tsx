import React from 'react';
import './App.css';
import DeliveryCalcComponent from '../src/components/DeliveryCalcComponent';
import Header from '../src/components/Header';

function App() {
  return (
    <div className="App">
      <div className="max-w-screen-md mx-auto rounded-lg border-sky-500 overflow-hidden">
        <Header />
        <DeliveryCalcComponent />
      </div>
    </div>
  );
}

export default App;
