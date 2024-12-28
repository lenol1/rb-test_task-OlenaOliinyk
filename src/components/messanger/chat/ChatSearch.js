import React, { useState, useEffect } from "react";
import AddChat from "./../controllers/AddChat";
import "../../styles/ChatSearch.css";

const ChatSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [chats, setChats] = useState([]);
    const [isAddingChat, setIsAddingChat] = useState(false);

    useEffect(() => {
        async function fetchChats() {
            try {
                const response = await fetch("http://localhost:5000/chats");
                const data = await response.json();
                setChats(data);
            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        }
        fetchChats();
    }, []);

    const chatExists = chats.some(
        (chat) =>
            chat.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            chat.lastname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div>
            <div className="input-wrapper">
                <input type="text" placeholder="Search or start new chat" value={searchTerm}
                    onChange={handleInputChange} id="searchField"
                />
                <img src="/../messanger/search.png" alt='search' className="search-icon" />
                {!chatExists && searchTerm && (
                    <button className="add-chat-btn" onClick={() => setIsAddingChat(true)}>
                        <img src="/../messanger/add.png" alt='add' />
                    </button>
                )}
            </div>
            <AddChat isVisible={isAddingChat} setIsVisible={setIsAddingChat} />
        </div>
    );
};

export default ChatSearch;