import React from 'react';
import '.././css/App.css';
import BotsList from './BotsList';
import BotChat from './BotChat';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='App-title'>Celebrity Bots</div>
        <div className='App-subheader'>Pit your favourite celebrities against each other</div>
      </header>
      <div className='bots-container'>
        <div className="bot-list-container"><BotsList/></div>
        <div className='bot-chat-container'><BotChat /></div>
      </div>
    </div>
  );
}

export default App;
