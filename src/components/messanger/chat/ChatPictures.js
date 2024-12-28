import React, { useState } from "react";
import '../../styles/ChatPictures.css'

const ChatPicture = ({ onIconSelect }) => {
    const icons = [
        '/../userIcons/female0.png', '/../userIcons/female1.png', '/../userIcons/female2.png',
        '/../userIcons/female3.png', '/../userIcons/female4.png', '/../userIcons/male0.png',
        '/../userIcons/male1.png', '/../userIcons/male2.png', '/../userIcons/male3.png',
        '/../userIcons/male4.png'
    ];

    const [selectedIcon, setSelectedIcon] = useState('/../userIcons/female0.png');
    const handleIconClick = (icon) => {
        setSelectedIcon(icon);
        if (onIconSelect) onIconSelect(icon);
    };

    return (
        <div className="chat-picture">
            <h3>Select an Icon for the Chat</h3>
            <div className="icon-grid">
                {icons.map((icon, index) => (
                    <div
                        key={index}
                        className={`icon-item ${selectedIcon === icon ? 'selected' : ''}`}
                        onClick={() => handleIconClick(icon)}>
                        <img src={icon} alt={`Icon ${index}`} className="icon-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatPicture;