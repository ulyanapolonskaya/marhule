import React, { useState } from 'react';
import { addWord } from '../utils/localStorage';

interface AddWordViewProps {
  onBack: () => void;
}

const AddWordView: React.FC<AddWordViewProps> = ({ onBack }) => {
  const [russian, setRussian] = useState('');
  const [slovak, setSlovak] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!russian.trim() || !slovak.trim()) {
      setMessage('Both fields are required');
      return;
    }
    
    // Add the word
    addWord(russian.trim(), slovak.trim());
    
    // Reset form and show success message
    setRussian('');
    setSlovak('');
    setMessage('Word added successfully!');
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className="add-word-view">
      <h2>Add New Word</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="russian">Russian Word:</label>
          <input
            id="russian"
            type="text"
            value={russian}
            onChange={(e) => setRussian(e.target.value)}
            autoFocus
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="slovak">Slovak Translation:</label>
          <input
            id="slovak"
            type="text"
            value={slovak}
            onChange={(e) => setSlovak(e.target.value)}
          />
        </div>
        
        <button type="submit" className="submit-button">
          Save Word
        </button>
      </form>
      
      {message && (
        <div className="message">
          <p>{message}</p>
        </div>
      )}
      
      <button className="back-button" onClick={onBack}>Back to Home</button>
    </div>
  );
};

export default AddWordView;
