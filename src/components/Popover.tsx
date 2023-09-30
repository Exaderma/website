// Popup.tsx
import React from "react";
import "../index.css";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

const Popover: React.FC<PopupProps> = ({ isOpen, onClose, message}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <button className="close-button" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Popover;
