import React from "react";
import "../../styles/RemoveChat.css";

const RemoveChat = ({ isVisible, setIsVisible, chat, refreshChats }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/chats/${chat._id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Error deleting chat");
            }
            alert("Chat deleted successfully!");
            setIsVisible(false);
            refreshChats();
        } catch (error) {
            console.error("Error deleting chat:", error);
            alert("Failed to delete chat. Please try again.");
        }
    };

    if (!isVisible || !chat) return null;

    return (
        <div className="removeChat">
            <div className="confirmationBox">
                <h2>Confirm Deletion</h2>
                <p>
                    Are you sure you want to delete the chat with {chat.firstname}{" "}
                    {chat.lastname}?
                </p><br/>
                <div className="confirmationButtons">
                    <button onClick={handleDelete} id="confirm">Yes, Delete</button>
                    <button onClick={() => setIsVisible(false)} id="cancel">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default RemoveChat;