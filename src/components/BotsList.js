import React, { useState, useEffect} from 'react';
import api from '../utils/network';
import Bot from './Bot';
import '../css/BotList.css';

function BotsList({onSelectedBotsChange}) {

  const [botList, setBotList] = useState([]);
  const [selectedBots, setSelectedBots] = useState([]);

  useEffect(()=> {
    const fetchBotsList = async () => {
      try {
        let botList = await api.fetchBotsList();
        setBotList(botList);
        console.log(botList);
      } catch(error) {
        console.error('Failed to fetch bots list', error);
      }
    }
    fetchBotsList();
  }, []);

  const handleSelectedBots = (bot, isSelected) => {
    setSelectedBots(prevSelectedBots => {
      const newSelectedBots = isSelected ? [...prevSelectedBots, bot] : prevSelectedBots.filter(selectedBot => selectedBot.id !== bot.id);
      return newSelectedBots;
    });
  };
  useEffect(() => {
    onSelectedBotsChange(selectedBots);
  }, [selectedBots, onSelectedBotsChange]);

  const renderedBots = botList.map((bot) => {
    return <Bot key={bot.id} bot= {bot} onSelectionChange={handleSelectedBots}> </Bot>
  });
  return ( <div className='bot-list-component'>
    <div className='bot-list-title'>Choose Bots</div>
    <div className="bot-list">
      {renderedBots}
    </div>
    </div>
  )
};

export default BotsList;