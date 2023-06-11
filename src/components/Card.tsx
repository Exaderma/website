import React from 'react';

type Position = 'relative' | "absolute" | 'fixed';

interface CardProps {
    backgroundColor?: string;
    width?: string | number;
    height?: string | number;
    position?: Position;
    top?: string | number;
    left?: string | number;
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({backgroundColor, width, height, position, top ,left, children}) => {
    return (
      <div
        style={{
          backgroundColor: backgroundColor || '#fff',
          borderRadius: 8,
          padding: 16,
          boxShadow: '0 2px 4px rgba(0,0,0,.2)',
          width: width || '100%',
          height: height || 'auto',
          position: position || 'relative',
          top: top || 0,
          left: left || 0,
        }}
      >
        {children}
      </div>
    );
};
export default Card;