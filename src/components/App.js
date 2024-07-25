import React, { useState, useEffect} from 'react';
import '.././css/App.css';
import BotsList from './BotsList';
import BotChat from './BotChat';

function App() {

  const [selectedBots, setSelectedBots] = useState([]);
  const onSelectedBotsChange = (newSelectedBots) => {
    setSelectedBots(newSelectedBots);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className='App-title'>Celebrity Bots</div>
        <div className='App-subheader'>Pit your favourite celebrities against each other</div>
      </header>
      <div className='bots-container'>
        <div className="bot-list-container"><BotsList onSelectedBotsChange={onSelectedBotsChange}/></div>
        <div className='bot-chat-container'><BotChat selectedBots={selectedBots}/></div>
      </div>
    </div>
  );
}

export default App;
