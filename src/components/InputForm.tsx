import React, { CSSProperties } from 'react';

interface InputProps {
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
  
  const InputForm: React.FC<InputProps> = ({ style }) => (
    <form className="form" style={style}></form>
  );
  
  export default InputForm;