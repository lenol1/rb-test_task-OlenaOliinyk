import React from "react";
import { useChat } from "./../controllers/ChatContext";
import '../../styles/ChatHeader.css'

const ChatHeader = () => {
    const { selectedChat } = useChat();
    if (!selectedChat) {
        return <div>Select Chat</div>;
    }

    return (
        <div className="chatHeader">
            <img src={selectedChat.picture} alt='userIcon' id='userIcon' />
            <img src="/../messanger/online.png"  id='online' alt="online"/>
            <span id="chatHeader">{selectedChat.firstname} {selectedChat.lastname}</span>
        </div>
    );
}

export default ChatHeader;