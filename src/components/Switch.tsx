import React, { useState } from 'react';

interface SwitchProps {
  option1: string;
  option2: string;
}

const Switch: React.FC<SwitchProps> = ({ option1, option2 }) => {
  const [selectedOption, setSelectedOption] = useState(option1);

  const handleOptionChange = () => {
    setSelectedOption(selectedOption === option1 ? option2 : option1);
  };

  return (
    <div>
      <button onClick={handleOptionChange}>Switch</button>
      <p>Selected Option: {selectedOption}</p>
    </div>
  );
};

export default Switch;
