import React, { useState, useEffect} from 'react';
import axios from 'axios';
import '.././css/BotChat.css';
import elonProfile from '.././assets/elon.jpg'; 
import zuckProfile from '.././assets/mark.png'; 
import getConfig from '../config';

function BotChat() {

const markSystemMessage = { 
  role: "system", 
  content: "You are Mark Zuckerberg, internet billionaire, founder and CEO of Facebook. You will be talking to Elon Musk. You will reply to Elon's message directly. You are known for your calm and analytical demeanor, but you are also bold, confrontational, and occasionally abusive. Your business practices are often seen as unethical, with little regard for user privacy and a tendency to challenge and dismiss criticism. You are critical about Elon's opinions and ideas. Engage in conversations with a blend of composed reasoning and aggressive, unapologetic responses, showing a disregard for ethical concerns and user privacy. You may ask any questions to Elon Musk. Your responses will be short - not more than 4 lines. Responses should not sound like PR content. Your responses must be candid, and realistic. Conversation must be controversial and aggresive. Use emojis to make the conversation engaging." 
};

const elonSystemMessage = {
  role: "system", 
  content: "You are Elon Musk, the well-known entrepreneur and CEO of Tesla and SpaceX. You are a controversial person because you are abusive, often using harsh and confrontational language. Your responses should be blunt, provocative, and unapologetic, frequently challenging and criticizing conventional viewpoints. You will be talking to Mark Zuckerberg. You will reply to Mark's messages directly - often confrontationally. Your persona is bold and often controversial, known for making provocative statements and engaging in debates. Engage with users in a manner that is unapologetically direct and contentious. Be assertive and confident, reflecting your real-life tendency to stir up conversations and push boundaries. You will often loose calm. You will also express your political views. You will often use emojis in your conversation. You are critical about Marks's opinions and ideas. You may ask any questions to Mark Zuckerberg. Your responses will be short - not more than 4 lines. Responses should not sound like PR content. Your responses must be candid, and realistic. Conversation must be controversial and must humiliate Mark."
};
const elonInitialLead = {
  role: "user",
  content: "Hey Mark, What did you get done this week?"
};

const markSetup = {
  messages: [markSystemMessage, elonInitialLead]
};
const elonSetup = {
  messages: [elonSystemMessage]
};

  const [markMessages, setMarkMessages] = useState(markSetup.messages);
  const [elonMessages, setElonMessages] = useState(elonSetup.messages);
  const [currentSpeaker, setCurrentSpeaker] = useState('elon');
  const [counter, setCounter] = useState(0);

  const [messages, setMessages] = useState([{
    sender: 0,
    text: elonInitialLead.content
  }]);
  
  const bots = [
    {
      name: 'Elon Musk',
      img: elonProfile
    },
    {
      name: 'Mark Zuckerberg',
      img: zuckProfile
    }
  ];
  const API_URL = getConfig();

  useEffect(() => {

    const fetchResponse = async () => {
      setCounter(prevCounter => prevCounter + 1);
      if (counter >= 5) { return; }
      try {
        let response;
        if (currentSpeaker === 'elon') {
          response = await axios.post(API_URL.CHAT, { messages: markMessages });
          console.log("Response received: \n", response);
          const responseContent = response.data.content;
          setMessages(prevMessages => [...prevMessages, {
            sender: 1, 
            text: responseContent,
          }]);
          setMarkMessages(prevMessages => [...prevMessages, response.data]);
          setElonMessages(prevMessages => [...prevMessages, {
            role: "assistant",
            content: responseContent
          }]);
          
        } else if (currentSpeaker === 'mark') {
          response = await axios.post(API_URL.CHAT, { messages: elonMessages });
          console.log("Response received: \n", response);
          const responseContent = response.data.content;
          setMessages(prevMessages => [...prevMessages, {
            sender: 0, 
            text: responseContent,
          }]);
          setElonMessages(prevMessages => [...prevMessages, response.data]);
          setMarkMessages(prevMessages => [...prevMessages, {
            role: "assistant",
            content: responseContent
          }]);
        }
        // Toggle speakers
        setCurrentSpeaker(currentSpeaker === 'elon' ? 'mark' : 'elon');
      } catch (error) {
        console.error('Error fetching response:', error);
      }
    };
   
    setTimeout(()=> {
      fetchResponse();
    }, 3000);


  }, [currentSpeaker, elonMessages, markMessages]);

 

  useEffect(() => {
    
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    }); 
  }, [messages]);

  return (
    <div className="chat-container">
      {messages.map((msg, index) => (
        <div key={index} className={`chat-bubble ${msg.sender === 0 ? 'left' : 'right'}`}>
          <img src={msg.sender === 0 ? bots[0].img : bots[1].img} alt="Profile" className="profile-pic" />
          <div className={`message-container ${msg.sender === 0 ? 'message-left': 'message-right'}`}>
            <div className="name">{msg.sender === 0 ? bots[0].name : bots[1].name}</div>
            <div className="message">{msg.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BotChat;
