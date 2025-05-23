import { useState, useEffect } from 'react';
import './App.css';
import { initializeWords } from './utils/localStorage';

// Views
import HomeView from './views/HomeView';
import FlashcardsView from './views/FlashcardsView';
import TestWritingView from './views/TestWritingView';
import AddWordView from './views/AddWordView';
import ReviewLearnedView from './views/ReviewLearnedView';

// View type for routing
type View = 'home' | 'flashcards' | 'testWriting' | 'addWord' | 'reviewLearned';

function App() {
  // State for view routing
  const [currentView, setCurrentView] = useState<View>('home');
  
  // Initialize words on app load
  useEffect(() => {
    initializeWords();
  }, []);
  
  // Render the current view
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={setCurrentView} />;
      case 'flashcards':
        return <FlashcardsView onBack={() => setCurrentView('home')} />;
      case 'testWriting':
        return <TestWritingView onBack={() => setCurrentView('home')} />;
      case 'addWord':
        return <AddWordView onBack={() => setCurrentView('home')} />;
      case 'reviewLearned':
        return <ReviewLearnedView onBack={() => setCurrentView('home')} />;
      default:
        return <HomeView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🇷🇺➡️🇸🇰 Slovak Vocabulary Trainer</h1>
      </header>
      <main className="app-content">
        {renderView()}
      </main>
      <footer className="app-footer">
        <p>© 2025 Slovak Vocabulary Trainer</p>
      </footer>
    </div>
  );
}

export default App;
