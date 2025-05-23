import React, { useState, useEffect } from 'react';
import { getWords, toggleWordLearned } from '../utils/localStorage';
import type { WordPair } from '../data/presetWords';

interface ReviewLearnedViewProps {
  onBack: () => void;
}

const ReviewLearnedView: React.FC<ReviewLearnedViewProps> = ({ onBack }) => {
  const [words, setWords] = useState<WordPair[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Load learned words
  useEffect(() => {
    const allWords = getWords();
    const learnedWords = allWords.filter(word => word.learned);
    setWords(learnedWords);
  }, []);

  // Handle empty words list
  if (words.length === 0) {
    return (
      <div className="review-learned-view">
        <div className="empty-state">
          <p>No learned words available. Practice with flashcards or test writing to mark words as learned.</p>
          <button className="back-button" onClick={onBack}>Back to Home</button>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const handleUnmarkLearned = () => {
    const updatedWords = toggleWordLearned(currentWord.id);
    const learnedWords = updatedWords.filter(word => word.learned);
    setWords(learnedWords);
    
    // If no more words, don't change index
    // Otherwise, if we're at the last word, go to the first one
    if (learnedWords.length === 0) {
      return;
    } else if (currentIndex >= learnedWords.length) {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="review-learned-view">
      <h2>Review Learned Words</h2>
      
      <div className="flashcard-container">
        <div 
          className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="flashcard-front">
            <h2>{currentWord.slovak}</h2>
            <p className="flashcard-hint">Click to reveal translation</p>
          </div>
          <div className="flashcard-back">
            <h2>{currentWord.russian}</h2>
          </div>
        </div>
      </div>

      <div className="flashcard-controls">
        <button className="control-button" onClick={handleUnmarkLearned}>
          ↩️ Mark as Unlearned
        </button>
        <button className="control-button" onClick={handleNext}>
          ⏭️ Next
        </button>
      </div>

      <button className="back-button" onClick={onBack}>Back to Home</button>
    </div>
  );
};

export default ReviewLearnedView;
