import React, { useEffect, useState } from 'react';
import '../../styles/ChatWindow.css';
import { useChat } from './../controllers/ChatContext';
import MessageList from './../message/MessageList';
import SendMessage from './../message/SendMessage';
import { fetchUserId } from '../../user/UserId';
import ChatHeader from './ChatHeader';

const ChatWindow = () => {
    const { selectedChat } = useChat();
    const [userId, setUserId] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const initializeUser = async () => {
            const savedUser = localStorage.getItem('userData');
            const userData = savedUser ? JSON.parse(savedUser) : null;
            if (userData?.email) {
                const id = await fetchUserId(userData.email);
                setUserId(id);
            }
        };

        initializeUser();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (selectedChat) {
                    const response = await fetch(`http://localhost:5000/message?chat=${selectedChat._id}`);
                    const data = await response.json();
                    setMessages(data);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [selectedChat]);

    const handleNewMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return (
        <div className="chat-window">
            <div className='receiver'>
                <ChatHeader />
            </div>
            <MessageList messages={messages} userId={userId} />
            <SendMessage selectedChat={selectedChat} userId={userId} onMessageSent={handleNewMessage} />
        </div>
    );
};

export default ChatWindow;