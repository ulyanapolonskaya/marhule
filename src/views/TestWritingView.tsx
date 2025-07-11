import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { getWords, toggleWordLearned } from '../utils/localStorage';
import type { WordPair } from '../data/presetWords';

interface TestWritingViewProps {
  onBack: () => void;
}

const TestWritingView: React.FC<TestWritingViewProps> = ({ onBack }) => {
  const [words, setWords] = useState<WordPair[]>([]);
  const [currentWord, setCurrentWord] = useState<WordPair | null>(null);
  const [remainingWords, setRemainingWords] = useState<WordPair[]>([]);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
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
      <div className="test-writing-view">
        <div className="empty-state">
          <p>No unlearned words available. Add new words or reset learned status.</p>
          <button className="back-button" onClick={onBack}>Back to Home</button>
        </div>
      </div>
    );
  }

  // currentWord is now managed by state

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!currentWord) return;
    
    // Check if the answer is correct (case insensitive)
    const isCorrect = userInput.trim().toLowerCase() === currentWord.slovak.toLowerCase();
    
    if (isCorrect) {
      setFeedback({ isCorrect: true, message: 'Correct!' });
    } else {
      setFeedback({ 
        isCorrect: false, 
        message: `Wrong! Correct answer is "${currentWord.slovak}"`
      });
    }
  };

  const handleNext = () => {
    setUserInput('');
    setFeedback(null);
    
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
    
    // Reset for next word
    setUserInput('');
    setFeedback(null);
    
    // Select a new random word from the updated unlearned words
    const nextWord = selectRandomWord(updatedUnlearned);
    setCurrentWord(nextWord);
    setRemainingWords(updatedUnlearned.filter(word => word.id !== nextWord?.id));
  };

  return (
    <div className="test-writing-view">
      <div className="test-container">
        <h2 className="russian-word">{currentWord.russian}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="translation">Type the Slovak translation:</label>
            <input
              id="translation"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={!!feedback}
            />
          </div>
          
          {!feedback && (
            <button type="submit" className="submit-button">
              Check Answer
            </button>
          )}
        </form>
        
        {feedback && (
          <div className={`feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
            <p>{feedback.message}</p>
            <div className="post-answer-controls">
              <button className="control-button" onClick={handleMarkLearned}>
                ✅ Mark as Learned
              </button>
              <button className="control-button" onClick={handleNext}>
                ⏭️ Next Word
              </button>
            </div>
          </div>
        )}
      </div>
      
      <button className="back-button" onClick={onBack}>Back to Home</button>
    </div>
  );
};

export default TestWritingView;
