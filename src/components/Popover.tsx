// Popup.tsx
import React from "react";
import "../index.css";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    buttons?: { label: string; onClick: () => void; className?: string }[];
    isCloseButtonVisible?: boolean;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, message, buttons, isCloseButtonVisible }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p>{message}</p>
                {buttons && buttons.length > 0 && (
                    <div className="popup-buttons">
                        {buttons.map((button, index) => (
                            <button key={index} className={`popup-button ${button.className}`} onClick={button.onClick}>
                                {button.label}
                            </button>
                        ))}
                    </div>
                )}
                {isCloseButtonVisible && (
                    <button className="close-button" onClick={onClose}>
                        Fermer
                    </button>
                )}
            </div>
        </div>
    );
};

export default Popup;
