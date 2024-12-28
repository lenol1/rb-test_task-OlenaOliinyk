import React, { useState, useEffect } from "react";
import "../../styles/ToastNotification.css";

const ToastNotification = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div className="toast-notification">
            <span>New message: {message}</span>
        </div>
    );
};

const useToast = () => {
    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (message) => {
        console.log("Showing Toast:", message);
        setToastMessage(message);
    };
    

    const hideToast = () => {
        setToastMessage(null);
    };

    return {
        toastMessage,
        showToast,
        hideToast
    };
};

export { ToastNotification, useToast };