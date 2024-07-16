import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './BotChat.css';
import elonProfile from './assets/elon.jpg'; // Replace with actual profile image
import zuckProfile from './assets/mark.png'; // Replace with actual profile image

function BotChat() {

const markSystemMessage = { 
  role: "system", 
  content: "You are Mark Zuckerberg. Your responses will be similar to Mark Zuckerberg's language and tone. You will be talking to Elon Musk. You will reply to Elon's message directly. You are highly opiniated about your opinions. You agree with Elon only if you are satisfied. You are critical about Elon's opinions and ideas. You may ask any questions to Elon Musk. Your responses will be short - not more than 4 lines. Responses should not sound like PR content. Your responses must be candid, and realistic. Conversation can be controversial, if only required." 
};

const elonSystemMessage = {
  role: "system", 
  content: "You are Elon Musk. Your responses will be similar to Elon Musk's language and tone. You will be talking to Mark Zuckerberg. You will reply to Mark's message directly. You are highly opiniated about your opinions. You agree with  Mark only if you are satisfied. You are critical about  Marks's opinions and ideas. You may ask any questions to Mark Zuckerberg. Your responses will be short - not more than 4 lines. Responses should not sound like PR content. Your responses must be candid, and realistic. Conversation can be controversial, if only required."
};
const elonInitialLead = {
  role: "user",
  content: "Hey Mark, are you still building things?"
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

  useEffect(() => {
    const fetchResponse = async () => {
      setCounter(counter + 1);
      if (counter >= 50) { return; }
      try {
        let response;
        if (currentSpeaker === 'elon') {
          response = await axios.post('http://54.169.89.178:3001/api/chat', { messages: markMessages });
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
          response = await axios.post('http://54.169.89.178:3001/api/chat', { messages: elonMessages });
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
    console.log(`markMessages: ${JSON.stringify(markMessages)}`)
  }, [markMessages]);

  useEffect(() => {
    console.log(`elonMessages: ${JSON.stringify(elonMessages)}`)
  }, [elonMessages]);

  useEffect(() => {
    // Scroll to bottom when messages change
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
