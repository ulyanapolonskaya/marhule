import React from 'react';
import { exportWords } from '../utils/localStorage';

const ExportWords: React.FC = () => {
  const handleExport = () => {
    const wordsJson = exportWords();
    const blob = new Blob([wordsJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'slovak-vocabulary-words.json';
    document.body.appendChild(a);
    a.click();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <button className="export-button" onClick={handleExport}>
      Export Words
    </button>
  );
};

export default ExportWords;
