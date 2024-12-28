import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);