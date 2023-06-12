import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../App.css';

interface PopoverProps {
  content: React.ReactNode;
}

const Popup: React.FC<PopoverProps> = ({ content }) => {
    const [isPopoverOpen, setPopoverOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          popoverRef.current &&
          !popoverRef.current.contains(event.target as Node) &&
          buttonRef.current !== event.target
        ) {
          setPopoverOpen(false);
        }
      };
  
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);
  
    const togglePopover = () => {
      setPopoverOpen(!isPopoverOpen);
    };
  
    return (
      <div>
        <button ref={buttonRef} onClick={togglePopover} className="popover-button" type="button">
          i
        </button>
  
        {isPopoverOpen && (
          <div ref={popoverRef} className="popover" role="tooltip">
            {content}
          </div>
        )}
      </div>
    );
  };
export default Popup