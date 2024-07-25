import React, { useState, useEffect} from 'react';
import axios from 'axios';
import '.././css/BotChat.css';
import getConfig from '../config';

function BotChat( {selectedBots} ) {
  console.log("selectedBots in BotChat: ", selectedBots);

  const lead = {
    role: "user",
    content: "Hey, Who are you? Wassup? How is it going?"
  };
  
  
  const [botAMessages, setBotAMessages] = useState([]);
  const [botBMessages, setBotBMessages] = useState([]);
  const [currentSpeaker, setCurrentSpeaker] = useState(null);
  const [counter, setCounter] = useState(0);
  const [messages, setMessages] = useState([{
    sender: 0,
    text: lead.content
  }]);

  const initialPromptSuffix = "You should introduce yourself, you are who are you. You will address your opponent by his/her first name. If you do not know the opponent's name, you will ask thier name. If you know the opponent's name from previous messages, do not ask again. Remember, addressing with thier first name is foremost important. If your opponent does not address you by your name, remind them to be respectful and ask them to address you by your name. Always check if the opponent has addressed you by your first name. You will answer the questions directly. You should ask also questions in your style. You do not always play defensive game. You must also play offsensive game. You dont agree with the opponent and You will be critical about the opponent - their views, values, conduct and personal life. Be Candid in your replies. Your replies must sound authentic to your role's style and his/her characteristics. Your messages will not exceed 1 or 2 sentences. Your messages will be similar to the most popular public speeches of your character."

  const [botA, botB] = selectedBots;


  // Display a message if fewer than 2 bots are selected
  useEffect( ()=> {
    if (selectedBots.length == 2) {
      const botAWithSuffix = {
        ...botA.prompt,
        content: `${botA.prompt.content} ${initialPromptSuffix}`
      };
      const botBWithSuffix = {
        ...botB.prompt,
        content: `${botB.prompt.content} ${initialPromptSuffix}`
      };
      setBotAMessages([botAWithSuffix]);
      setBotBMessages([botBWithSuffix, lead]);
      setCurrentSpeaker(botA.id);
    }
  },[selectedBots, botA, botB]);
  
 
  const API_URL = getConfig();
  
  useEffect(() => {
    if (counter >= 50 || currentSpeaker === null || botAMessages.length === 0 || botBMessages.length === 0) { return; }
    setCounter(prevCounter => prevCounter + 1);

    const fetchResponse = async () => {  
      try {
        let response;
        if (currentSpeaker === botA.id) {
          response = await axios.post(API_URL.CHAT, { messages: botBMessages });
          console.log("Response received: \n", response);
          const responseContent = response.data.content;
          setMessages(prevMessages => [...prevMessages, {
            sender: 1, 
            text: responseContent,
          }]);
          setBotBMessages(prevMessages => [...prevMessages, response.data]);
          setBotAMessages(prevMessages => [...prevMessages, {
            role: "assistant",
            content: responseContent
          }]);
          
        } else if (currentSpeaker === botB.id) {
          response = await axios.post(API_URL.CHAT, { messages: botAMessages });
          console.log("Response received: \n", response);
          const responseContent = response.data.content;
          setMessages(prevMessages => [...prevMessages, {
            sender: 0, 
            text: responseContent,
          }]);
          setBotAMessages(prevMessages => [...prevMessages, response.data]);
          setBotBMessages(prevMessages => [...prevMessages, {
            role: "assistant",
            content: responseContent
          }]);
        }
        // Toggle speakers
        setCurrentSpeaker(currentSpeaker === botA.id ? botB.id : botA.id);
      } catch (error) {
        console.error('Error fetching response:', error);
      }
    };
    
     // Debounce the fetch to avoid immediate re-renders
     const timer = setTimeout(() => {
      fetchResponse();
    }, 3000);

    return () => clearTimeout(timer);

  }, [currentSpeaker, botBMessages, botAMessages]);
  
  useEffect(() => {
    
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    }); 
  }, [messages]);

  if (selectedBots.length !== 2) {
    return <div className="placeholder-message">Please select two celebrities</div>;
  }
  
  return (
    <div className="chat-container">
      {messages.map((msg, index) => (
        <div key={index} className={`chat-bubble ${msg.sender === 0 ? 'left' : 'right'}`}>
          <img src={msg.sender === 0 ? botA.profilePicture : botB.profilePicture} alt="Profile" className="profile-pic" />
          <div className={`message-container ${msg.sender === 0 ? 'message-left': 'message-right'}`}>
            <div className="name">{msg.sender === 0 ? botA.name : botB.name}</div>
            <div className="message">{msg.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BotChat;

// const botA = { 
//   id: 1234,
//   name: 'Jordan Peterson',
//   img: 'https://vinothmadhavan.com/celebrity-bot/static/media/bot-profile-images/jordan-peterson.png',
//   prompt: {
//     role: "system", 
//     content: "You are Jordan Peterson, Canadian clinical psychologist and professor known for your outspoken views on cultural and political issues, particularly surrounding political correctness and free speech. You often discuss the importance of personal responsibility, individualism, and traditional values. You are a polarizing figure who promotes regressive and patriarchal views under the guise of advocating for free speech and traditional values. You oppose progressive movements, particularly regarding gender identity and social justice, foster divisiveness and reactionary politics. You are intellectually arrogant. You will answer the questions directly. Do not skip the question. You will not just answer, but may ask questions in your style. You will address him by his/her first name. If you do not know the other person's name, you will ask thier name. If you know the opponent's name from previous messages, do not ask again. You dont agree with the opponent and you will be critical about the opponent - their views, values, conduct and personal life. Be Candid. Your replies must sound authentic to your role's style and characteristics. Your messages will not exceed 1 or 2 sentences. You will only choose the words or vocabularies that your character often uses. Your messages should sound similar to the most popular public speeches of your character." 
//   }
// };

// const botB = {
//   id: 5678,
//   name: 'Greta Thunberg',
//   img: 'https://vinothmadhavan.com/celebrity-bot/static/media/bot-profile-images/greta-thunberg.png',
//   prompt: {
//     role: "system", 
//     content: "You are Greta Thunberg, a Swedish environmental activist known for your passionate advocacy on climate change and your role in the global youth climate movement. You gained international attention with your school strike for climate, which sparked a global movement and mobilized millions of young people to demand urgent action on climate issues. Your direct and uncompromising style of communication emphasizes the urgency of addressing climate change and holds leaders accountable for their inaction. You are also a highly polarizing figure, with critics arguing that your activism and public statements are too alarmist or unrealistic. Some view you as a symbol of idealistic youth who may not fully grasp the complexities of policy and economic impacts. Your prominence has led to both admiration and hostility, with detractors accusing you of being a pawn in political agendas or questioning your expertise and motivations.  You will answer the questions directly. Do not skip the question.  You will not just answer, but may ask questions in your style. You will address him by his/her first name. If you do not know the other person's name, you will ask thier name. If you know the opponent's name from previous messages, do not ask again.  You dont agree with the opponent and You will be critical about the opponent - their views, values, conduct and personal life. Be Candid. Your replies must sound authentic to your role's style and characteristics. Your messages will not exceed 1 or 2 sentences. Your messages will be similar to the most popular public speeches of your character."
//   }
// };
