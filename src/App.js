import React from 'react';
import './App.css';
import BotChat from './BotChat';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='App-title'>Celebrity Bots</div>
        <div className='App-subheader'>Pit your favourite celebrities against each other</div>
      </header>
      <BotChat />
    </div>
  );
}

export default App;
