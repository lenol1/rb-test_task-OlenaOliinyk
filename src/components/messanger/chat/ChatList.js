import React, { useEffect, useState } from "react";
import { useChat } from "./../controllers/ChatContext";
import { UseChatAPI } from "./../controllers/UseChatAPI";
import ChatItem from "./ChatItem";
import EditChat from "./../controllers/EditChat";
import RemoveChat from "./../controllers/RemoveChat";
import "../../styles/ChatList.css";

const ChatList = ({ searchTerm }) => {
    const { chats, lastMessages, fetchChats } = UseChatAPI();
    const { selectedChat, setSelectedChat } = useChat();

    const [isEditVisible, setIsEditVisible] = useState(false);
    const [chatToEdit, setChatToEdit] = useState(null);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const [chatToDelete, setChatToDelete] = useState(null);

    useEffect(() => {
        fetchChats(searchTerm);
    }, [searchTerm, fetchChats]);

    const openEditModal = (chat) => {
        setChatToEdit(chat);
        setIsEditVisible(true);
    };

    const openDeleteModal = (chat) => {
        setChatToDelete(chat);
        setIsDeleteVisible(true);
    };

    const formatChatDate = (chat) => {
        const date = new Date(chat.date_of_modification);
        const options = { year: "numeric", month: "short", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
    };

    return (
        <div className="chat-list">
            <h3>Chats</h3>
            {chats.length > 0 ? (
                chats.map((chat) => (
                    <ChatItem key={chat._id} chat={chat} lastMessage={lastMessages[chat._id]}
                        selectedChat={selectedChat} onClick={() => setSelectedChat(chat)}
                        onEdit={openEditModal} onDelete={openDeleteModal} formatChatDate={formatChatDate} />
                ))
            ) : (
                <p> No chats available</p>
            )}

            {isEditVisible && (
                <EditChat chat={chatToEdit} isVisible={isEditVisible} setIsVisible={setIsEditVisible}
                    refreshChats={fetchChats} />
            )}

            {isDeleteVisible && (
                <RemoveChat isVisible={isDeleteVisible} setIsVisible={setIsDeleteVisible}
                    chat={chatToDelete} refreshChats={fetchChats} />
            )}
        </div>
    );
};

export default ChatList;