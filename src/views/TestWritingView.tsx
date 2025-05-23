import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { getWords, toggleWordLearned } from '../utils/localStorage';
import type { WordPair } from '../data/presetWords';

interface TestWritingViewProps {
  onBack: () => void;
}

const TestWritingView: React.FC<TestWritingViewProps> = ({ onBack }) => {
  const [words, setWords] = useState<WordPair[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
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
      <div className="test-writing-view">
        <div className="empty-state">
          <p>No unlearned words available. Add new words or reset learned status.</p>
          <button className="back-button" onClick={onBack}>Back to Home</button>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIndex];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
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
    } else {
      // Reset for next word
      setUserInput('');
      setFeedback(null);
    }
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
