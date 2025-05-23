import React, { useState } from 'react';
import { getWords, toggleWordLearned } from '../utils/localStorage';
import type { WordPair } from '../data/presetWords';
import ExportWords from '../components/ExportWords';

interface DictionaryViewProps {
  onBack: () => void;
}

const DictionaryView: React.FC<DictionaryViewProps> = ({ onBack }) => {
  const [words, setWords] = useState<WordPair[]>(getWords());
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleToggleLearned = (id: string) => {
    const updatedWords = toggleWordLearned(id);
    setWords(updatedWords);
  };

  const filteredWords = words.filter(word => 
    word.russian.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.slovak.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dictionary-view">
      <div className="view-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h2>Dictionary</h2>
        <div className="export-container">
          <ExportWords />
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search words..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="word-list">
        {filteredWords.length > 0 ? (
          filteredWords.map((word) => (
            <div key={word.id} className={`word-item ${word.learned ? 'learned' : ''}`}>
              <div className="word-pair">
                <div className="word russian">{word.russian}</div>
                <div className="word-separator">—</div>
                <div className="word slovak">{word.slovak}</div>
              </div>
              <button 
                className={`learn-toggle ${word.learned ? 'learned' : ''}`}
                onClick={() => handleToggleLearned(word.id)}
              >
                {word.learned ? '✓ Learned' : 'Mark as Learned'}
              </button>
            </div>
          ))
        ) : (
          <div className="no-results">No words found</div>
        )}
      </div>
    </div>
  );
};

export default DictionaryView;
