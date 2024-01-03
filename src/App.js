import React, { useEffect } from 'react';
import QuoteMachine from './index';
import logo from './logo.svg';
import './App.css';
import quotes from './quotes.json';  // Add this line

function App() {
  useEffect(() => {
    console.log(quotes);
  }, []);

  return (
    <div className="App">
      <QuoteMachine />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;