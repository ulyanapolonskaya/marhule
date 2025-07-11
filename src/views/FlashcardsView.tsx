import React, { useState, useEffect } from 'react';
import { getWords, toggleWordLearned } from '../utils/localStorage';
import type { WordPair } from '../data/presetWords';

interface FlashcardsViewProps {
  onBack: () => void;
}

const FlashcardsView: React.FC<FlashcardsViewProps> = ({ onBack }) => {
  const [words, setWords] = useState<WordPair[]>([]);
  const [currentWord, setCurrentWord] = useState<WordPair | null>(null);
  const [remainingWords, setRemainingWords] = useState<WordPair[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  // We only need the setter function for unlearned words
  const [, setUnlearned] = useState<WordPair[]>([]);

  // Function to select a random word from the remaining words
  const selectRandomWord = (wordsList: WordPair[]) => {
    if (wordsList.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    return wordsList[randomIndex];
  };

  // Load unlearned words and select a random one
  useEffect(() => {
    const allWords = getWords();
    const unlearnedWords = allWords.filter(word => !word.learned);
    setUnlearned(unlearnedWords);
    setWords(unlearnedWords);
    
    if (unlearnedWords.length > 0) {
      const randomWord = selectRandomWord(unlearnedWords);
      setCurrentWord(randomWord);
      setRemainingWords(unlearnedWords.filter(word => word.id !== randomWord?.id));
    }
  }, []);

  // Handle empty words list
  if (words.length === 0 || !currentWord) {
    return (
      <div className="flashcards-view">
        <div className="empty-state">
          <p>No unlearned words available. Add new words or reset learned status.</p>
          <button className="back-button" onClick={onBack}>Back to Home</button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    setIsFlipped(false);
    
    // If we've gone through all words, reset the remaining words list
    if (remainingWords.length === 0) {
      const newRemainingWords = words.filter(word => word.id !== currentWord?.id);
      const nextWord = selectRandomWord(newRemainingWords);
      setCurrentWord(nextWord);
      setRemainingWords(newRemainingWords.filter(word => word.id !== nextWord?.id));
    } else {
      // Otherwise, pick a random word from the remaining words
      const nextWord = selectRandomWord(remainingWords);
      setCurrentWord(nextWord);
      setRemainingWords(remainingWords.filter(word => word.id !== nextWord?.id));
    }
  };

  const handleMarkLearned = () => {
    if (!currentWord) return;
    
    const updatedWords = toggleWordLearned(currentWord.id);
    const updatedUnlearned = updatedWords.filter(word => !word.learned);
    setUnlearned(updatedUnlearned);
    setWords(updatedUnlearned);
    
    // If no more words, don't select a new word
    if (updatedUnlearned.length === 0) {
      setCurrentWord(null);
      setRemainingWords([]);
      return;
    }
    
    // Select a new random word from the updated unlearned words
    const nextWord = selectRandomWord(updatedUnlearned);
    setCurrentWord(nextWord);
    setRemainingWords(updatedUnlearned.filter(word => word.id !== nextWord?.id));
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
