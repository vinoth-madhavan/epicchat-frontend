import React, { useState} from "react";
import '../css/Bot.css';

function Bot({ bot, onSelectionChange}) {
    const [isSelected, setIsSelected] = useState(false);

     const handleClick = () => {
        const newSelectedState = !isSelected;
        setIsSelected(prev => !prev);
        onSelectionChange(bot, newSelectedState);
    };
    return (
        <div className={`bot-thumbnail ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
            {isSelected && <div className="overlay"></div>}
            {isSelected && <div className="tick-mark">✔</div>}
            <img 
                src={bot.profilePicture} 
                alt={bot.name}
                className="bot-image">
            </img>
           <div className="bot-name">{ bot.name }</div> 
        </div>
    );
}
export default Bot;