import React from "react";
import "../../styles/ChatList.css";

const ChatItem = ({
    chat,
    lastMessage,
    selectedChat,
    onClick,
    onEdit,
    onDelete,
    formatChatDate,
}) => {
    return (
        <div
            key={chat._id}
            className={`chat-item ${selectedChat && selectedChat._id === chat._id ? "selected" : ""}`}
            onClick={onClick}>
            <img src={chat.picture} alt="Chat icon" id="userIcon" />
            <img src="/../messanger/online.png" alt="Online" id="online" />
            <div className="defaultData">
                <span id="userData"> {chat.firstname} {chat.lastname}</span>
                <span id="lastMessage">{lastMessage || "Loading..."}</span>
            </div>
            <div className="chatController">
                <span id="chatDate">{formatChatDate(chat)}</span>
                <div className="editForm">
                    <button className="editButton"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(chat);
                        }} id="edit">
                        <img src="/../messanger/edit.png" alt="Edit" className="chat-icon" />
                    </button>
                    <button className="editButton"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(chat);
                        }} id="edit">
                        <img src="/../messanger/delete.png" alt="Delete" className="chat-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatItem;