import React, { useState, useEffect } from 'react';
import { getWords, toggleWordLearned } from '../utils/localStorage';
import type { WordPair } from '../data/presetWords';

interface FlashcardsViewProps {
  onBack: () => void;
}

const FlashcardsView: React.FC<FlashcardsViewProps> = ({ onBack }) => {
  const [words, setWords] = useState<WordPair[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  // We only need the setter function for unlearned words
  const [, setUnlearned] = useState<WordPair[]>([]);

  // Load unlearned words
  useEffect(() => {
    const allWords = getWords();
    const unlearnedWords = allWords.filter(word => !word.learned);
    setUnlearned(unlearnedWords);
    setWords(unlearnedWords);
  }, []);

  // Handle empty words list
  if (words.length === 0) {
    return (
      <div className="flashcards-view">
        <div className="empty-state">
          <p>No unlearned words available. Add new words or reset learned status.</p>
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

  const handleMarkLearned = () => {
    const updatedWords = toggleWordLearned(currentWord.id);
    const updatedUnlearned = updatedWords.filter(word => !word.learned);
    setUnlearned(updatedUnlearned);
    setWords(updatedUnlearned);
    
    // If no more words, don't change index
    // Otherwise, if we're at the last word, go to the first one
    if (updatedUnlearned.length === 0) {
      return;
    } else if (currentIndex >= updatedUnlearned.length) {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="flashcards-view">
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
        <button className="control-button" onClick={handleMarkLearned}>
          ✅ Mark as Learned
        </button>
        <button className="control-button" onClick={handleNext}>
          ⏭️ Next
        </button>
      </div>

      <button className="back-button" onClick={onBack}>Back to Home</button>
    </div>
  );
};

export default FlashcardsView;
