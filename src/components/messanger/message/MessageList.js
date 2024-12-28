import React, { useEffect, useRef } from 'react';
import '../../styles/MessageList.css';
import { useChat } from '../controllers/ChatContext';
import { ToastNotification, useToast } from '../controllers/ToastNotification';

const MessageList = ({ messages, userId }) => {
    const { selectedChat } = useChat();
    const messagesEndRef = useRef(null);
    const { toastMessage, showToast, hideToast } = useToast();
    const lastMessageRef = useRef(null); 

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        if (messages.length > 0) {
            const latestMessage = messages[messages.length - 1];

            if (latestMessage.senderId !== userId && latestMessage !== lastMessageRef.current) {
                showToast(`"${latestMessage.text}"`);
                lastMessageRef.current = latestMessage;
            }
        }
    }, [messages, userId, showToast]);

    const formatDate = (timestamp) => {
        const options = {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return new Date(timestamp).toLocaleString('en-US', options);
    };

    return (
        <div className="messages-container">
            {messages.map((message) => (
                <div key={message._id} className={`message ${message.autoAnswer !== 1 ? 'sent' : 'received'}`}>
                    {message.autoAnswer !== 1 ? (
                        <div className="message-content">
                            <div className="message-text" id="messageOut">{message.text}</div>
                            <div className="message-time">{formatDate(message.date)}</div>
                        </div>
                    ) : (
                        <div className="message-content received">
                            <img src={selectedChat.picture} alt="System" className="system-icon" />
                            <div>
                                <div className="message-text" id="messageIn">{message.text}</div>
                                <div className="message-time">{formatDate(message.date)}</div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            <div ref={messagesEndRef} />
            {toastMessage && <ToastNotification message={toastMessage} onClose={hideToast} />}
        </div>
    );
};

export default MessageList;