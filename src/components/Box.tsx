import React, { CSSProperties } from 'react';

interface BoxProps {
  style?: CSSProperties & {
    '--box-position'?: string;
    '--box-left'?: string;
    '--box-right'?: string;
    '--box-top'?: string;
    '--box-bottom'?: string;
    '--box-background'?: string;
    '--box-boxShadow'?: string;
    '--box-borderRadius'?: string;
    '--box-transform'?: string;
  };
}

const Box: React.FC<BoxProps> = ({ style }) => (
  <div className="box" style={style}></div>
);

export default Box;