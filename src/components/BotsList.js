import React, { useState, useEffect} from 'react';
import api from '../utils/network';
import Bot from './Bot';
import '../css/BotList.css';

function BotsList() {

  const [botList, setBotList] = useState([]);

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

  const renderedBots = botList.map((bot) => {
    return <Bot key={bot.id} bot= {bot} > </Bot>
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