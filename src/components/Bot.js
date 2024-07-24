import React from "react";
import '../css/Bot.css';

function Bot({ bot }) {

    return (
        <div className="bot-thumbnail">
            <img 
                src={bot.profile_picture} 
                alt={bot.name}
                className="bot-image">
            </img>
           <div className="bot-name">{ bot.name }</div> 
        </div>
    );
}
export default Bot;