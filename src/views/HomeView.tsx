import React from 'react';
import ExportWords from '../components/ExportWords';

interface HomeViewProps {
  onNavigate: (view: 'home' | 'flashcards' | 'testWriting' | 'addWord' | 'reviewLearned') => void;
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
        
        <div className="export-container">
          <ExportWords />
        </div>
      </div>
    </div>
  );
};

export default HomeView;
