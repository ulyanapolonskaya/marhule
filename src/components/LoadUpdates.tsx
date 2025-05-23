import React, { useState } from 'react';
import { saveWords } from '../utils/localStorage';
import { presetWords } from '../data/presetWords';
import type { WordPair } from '../data/presetWords';

interface LoadUpdatesProps {
  onWordsUpdated?: (words: WordPair[]) => void;
}

const LoadUpdates: React.FC<LoadUpdatesProps> = ({ onWordsUpdated }) => {
  const [showModal, setShowModal] = useState(false);

  const handleLoadClick = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    try {
      // Replace current words with the deployed preset words
      saveWords(presetWords);
      
      // Notify parent component if callback provided
      if (onWordsUpdated) {
        onWordsUpdated(presetWords);
      }
      
      setShowModal(false);
    } catch (error) {
      console.error('Failed to load updates:', error);
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="load-updates-button" onClick={handleLoadClick}>
        Load Updates
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Update</h3>
            <p>Are you sure you want to update your vocabulary words? This will replace your current word list with the original deployed version.</p>
            <div className="modal-buttons">
              <button className="modal-button cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button className="modal-button confirm" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadUpdates;
