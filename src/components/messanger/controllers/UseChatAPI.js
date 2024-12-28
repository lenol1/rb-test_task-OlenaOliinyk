import { useCallback, useState } from "react";

export const UseChatAPI = () => {
    const [chats, setChats] = useState([]);
    const [lastMessages, setLastMessages] = useState({});

    const fetchChats = useCallback(async (query = "") => {
        try {
            const response = await fetch(
                `http://localhost:5000/chats${query ? `?searchTerm=${query}` : ""}`
            );
            const data = await response.json();
            setChats(data);

            const messages = await Promise.all(data.map((chat) => fetchLastMessages(chat._id)));

            const lastMessagesObj = data.reduce((acc, chat, index) => {
                acc[chat._id] = messages[index] || "No messages available";
                return acc;
            }, {});

            setLastMessages(lastMessagesObj);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    }, []);

    const fetchLastMessages = async (chatId) => {
        try {
            const response = await fetch(`http://localhost:5000/message/last/${chatId}`);
            if (!response.ok) {
                throw new Error("Error fetching last message");
            }
            const data = await response.json();

            return data?.result || " ";
        } catch (error) {
            console.error("Error fetching last message:", error);
            return "Error loading message";
        }
    };

    return {
        chats,
        lastMessages,
        fetchChats,
    };
};