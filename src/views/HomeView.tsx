import React from 'react';

interface HomeViewProps {
  onNavigate: (view: 'home' | 'flashcards' | 'testWriting' | 'addWord' | 'reviewLearned' | 'dictionary') => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="home-view">
      <div className="home-buttons">
        <button 
          className="main-button" 
          onClick={() => onNavigate('flashcards')}
        >
          Practice Flashcards
        </button>
        
        <button 
          className="main-button" 
          onClick={() => onNavigate('testWriting')}
        >
          Test Writing
        </button>
        
        <button 
          className="main-button" 
          onClick={() => onNavigate('reviewLearned')}
        >
          Review Learned Words
        </button>
        
        <button 
          className="add-word-button" 
          onClick={() => onNavigate('addWord')}
        >
          ➕ Add New Word
        </button>
        
        <button
          className="main-button dictionary-button"
          onClick={() => onNavigate('dictionary')}
        >
          📚 Dictionary
        </button>
      </div>
    </div>
  );
};

export default HomeView;
