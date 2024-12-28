import React, { useState } from "react";
import ChatPicture from "../chat/ChatPictures";
import "../../../App.css";
import "../../styles/AddChat.css";

const AddChat = ({ isVisible, setIsVisible }) => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        picture: null,
    });
    const [errorMessage, setErrorMessage] = useState("");

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
            const response = await fetch("http://localhost:5000/chats", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (!response.ok) {
                setErrorMessage(result.message || "Error creating chat.");
            } else {
                alert("Chat created successfully!");
                setFormData({ firstname: "", lastname: "", picture: null });
                setErrorMessage("");
                setIsVisible(false);
            }
        } catch (error) {
            setErrorMessage("Server error. Please try again later.");
        }
    };

    if (!isVisible) return null;

    return (
        <div className="addChat">
            <form onSubmit={handleSubmit}>
                <button id="exit_span" onClick={() => setIsVisible(false)} type="button"> x </button>
                <h2>Create New Chat</h2><br />
                <div id="headerData">
                    <input type="text" name="firstname" placeholder="First Name" value={formData.firstname}
                        onChange={handleInputChange} required />
                    <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname}
                        onChange={handleInputChange} required />
                </div>
                <ChatPicture onIconSelect={handleIconSelect} />
                {errorMessage && <p>{errorMessage}</p>}
                <div id="createChat">
                    <button type="submit"
                        disabled={!formData.firstname || !formData.lastname || !formData.picture}>
                        Create Chat
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddChat;