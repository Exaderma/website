import React, { useState, ChangeEvent } from 'react';

interface EditableFieldProps {
  initialValue: string;
  onSave: (newValue: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ initialValue, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(initialValue);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onSave(editedValue);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedValue(initialValue);
    setIsEditing(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const lines = newValue.split('\n').slice(0, 6);
    const limitedLines = lines.map(line => line.slice(0, 50));
    const limitedValue = limitedLines.join('\n');
    setEditedValue(limitedValue);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <textarea
            value={editedValue}
            onChange={handleInputChange}
            style={{
                width: `100%`,
                maxWidth: '400px',
                maxHeight: '200px',
                minWidth: '200px',
                minHeight: '100px',
                whiteSpace: 'pre-wrap'
              }}
          />
          <button style={{
            backgroundColor: "transparent",
            color: "#4F518C",
            border: "none",
            padding: "0",
            margin: "0",
            fontSize: "1rem",
            cursor: "pointer",
            marginLeft: "20px",
            marginRight: "20px"
          }}
          onClick={handleSaveClick}>Enregistrer</button>
          <button style={{
            backgroundColor: "transparent",
            color: "#953314",
            border: "none",
            padding: "0",
            margin: "0",
            fontSize: "1rem",
            cursor: "pointer"
          }}
          onClick={handleCancelClick}>Annuler</button>
        </>
      ) : (
        <>
          <span>{initialValue}</span>
          <button style={{
            backgroundColor: "transparent",
            color: "#4F518C",
            border: "none",
            padding: "0",
            margin: "0",
            fontSize: "1rem",
            cursor: "pointer",
            marginLeft: "20px"
          }}
          onClick={handleEditClick}>Modifier</button>
        </>
      )}
    </div>
  );
};

export default EditableField;
