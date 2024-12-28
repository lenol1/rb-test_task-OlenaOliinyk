import React, { useState, useEffect } from "react";
import ChatPicture from "./../chat/ChatPictures";
import "../../../App.css";
import "../../styles/EditChat.css";

const EditChat = ({ chat, isVisible, setIsVisible, refreshChats }) => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        picture: null,
    });
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (isVisible && chat) {
            setFormData({
                firstname: chat.firstname,
                lastname: chat.lastname,
                picture: chat.picture,
            });
        }
    }, [isVisible, chat]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleIconSelect = (iconPath) => {
        setFormData({ ...formData, picture: iconPath });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.picture) {
            setErrorMessage("Please select an icon for the chat.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/chats/${chat._id}`, {
                method: "PUT",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (!response.ok) {
                setErrorMessage(result.message || "Error updating chat.");
            } else {
                setErrorMessage("");
                setIsVisible(false);
                if (refreshChats) refreshChats();
            }
        } catch (error) {
            setErrorMessage("Server error. Please try again later.");
        }
    };

    if (!isVisible) return null;

    return (
        <div className="editChat">
            <form onSubmit={handleSubmit}>
                <button id="exit_spanEdit" onClick={() => setIsVisible(false)} type="button"> x </button>
                <h2>Edit Chat</h2>
                <div id="headerData">
                    <input type="text" name="firstname" placeholder="First Name" value={formData.firstname}
                        onChange={handleInputChange} required />
                    <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname}
                        onChange={handleInputChange} required />
                </div><br/>
                <ChatPicture onIconSelect={handleIconSelect} selectedIcon={formData.picture} />
                {errorMessage && <p>{errorMessage}</p>}
                <div id="editChat">
                    <button type="submit"
                        disabled={!formData.firstname || !formData.lastname || !formData.picture}>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditChat;