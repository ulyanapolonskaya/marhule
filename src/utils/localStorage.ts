import { presetWords } from '../data/presetWords';
import type { WordPair } from '../data/presetWords';

const STORAGE_KEY = 'slovak-vocabulary-words';

/**
 * Get all word pairs from localStorage
 */
export const getWords = (): WordPair[] => {
  const storedWords = localStorage.getItem(STORAGE_KEY);
  if (!storedWords) {
    return [];
  }
  return JSON.parse(storedWords);
};

/**
 * Save word pairs to localStorage
 */
export const saveWords = (words: WordPair[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
};

/**
 * Initialize localStorage with preset words if empty
 */
export const initializeWords = (): void => {
  const words = getWords();
  if (words.length === 0) {
    saveWords(presetWords);
  }
};

/**
 * Add a new word pair to localStorage
 */
export const addWord = (russian: string, slovak: string): WordPair => {
  const words = getWords();
  const newWord: WordPair = {
    russian,
    slovak,
    learned: false,
    id: Date.now().toString(), // Simple unique ID generation
  };
  saveWords([...words, newWord]);
  return newWord;
};

/**
 * Mark a word as learned/unlearned
 */
export const toggleWordLearned = (id: string): WordPair[] => {
  const words = getWords();
  const updatedWords = words.map((word) => {
    if (word.id === id) {
      return { ...word, learned: !word.learned };
    }
    return word;
  });
  saveWords(updatedWords);
  return updatedWords;
};

/**
 * Delete a word pair from localStorage
 */
export const deleteWord = (id: string): WordPair[] => {
  const words = getWords();
  const updatedWords = words.filter((word) => word.id !== id);
  saveWords(updatedWords);
  return updatedWords;
};

/**
 * Export words as JSON
 */
export const exportWords = (): string => {
  const words = getWords();
  return JSON.stringify(words, null, 2);
};

/**
 * Import words from JSON
 */
export const importWords = (json: string): WordPair[] => {
  try {
    const words = JSON.parse(json) as WordPair[];
    saveWords(words);
    return words;
  } catch (error) {
    console.error('Failed to import words:', error);
    return getWords();
  }
};
