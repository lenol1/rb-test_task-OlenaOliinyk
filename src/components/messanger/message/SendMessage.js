import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/SendMessage.css';

const SendMessage = ({ selectedChat, userId, onMessageSent }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = async () => {
        try {
            const response = await fetch('http://localhost:5000/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat: selectedChat._id,
                    text: newMessage,
                    person: userId,
                }),
            });

            if (response.ok) {
                const savedMessage = await response.json();
                onMessageSent(savedMessage);
                setNewMessage('');
                setTimeout(handleAnswerMessage, 3000);
            } else {
                console.error('Error sending message:', await response.json());
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleAnswerMessage = async () => {
        try {
            const response = await axios.get('https://api.quotable.io/random');
            const { content } = response.data;

            const quoteMessage = `${content}`;

            const responseMessage = await fetch('http://localhost:5000/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat: selectedChat._id,
                    text: quoteMessage,
                    person: userId,
                    autoAnswer: 1,
                }),
            });

            if (responseMessage.ok) {
                const savedMessage = await responseMessage.json();
                onMessageSent(savedMessage);
            } else {
                console.error('Error sending quote message:', await responseMessage.json());
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    };

    return (
        <div className="input-container">
            <input type="text" placeholder="Type your message" value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)} id="messageInput" />
            <button className="send-button" onClick={handleSendMessage}>
                <img src="/../messanger/send.png" alt="send" id="sendIcon" />
            </button>
        </div>
    );
};

export default SendMessage;