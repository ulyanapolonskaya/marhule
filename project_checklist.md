# Project Checklist

## 1. Project Setup
- [X] Initialize a new project with Vite + React + TypeScript
- [X] Setup Git repository (GitHub)
- [X] Setup .gitignore
- [X] Create initial README.md with project description
- [X] Setup GitHub Pages deployment (create branch gh-pages or configure Actions)

## 2. Basic App Structure & Routing
- [X] Create main App.tsx component
- [X] Define basic routing or view state for:
  - [X] Home screen
  - [X] Practice Flashcards
  - [X] Test Writing
  - [X] Add New Word
  - [X] Learned Words Review
- [X] Create navigation buttons or menu on Home screen

## 3. Preset Words Setup
- [X] Create presetWords.ts with a sample array of word pairs
- [X] Implement utility function to load preset words into localStorage if empty
- [X] On app load, check if localStorage key words exists, if not, initialize with preset words

## 4. Local Storage Utilities
- [X] Create utility functions to:
  - [X] Read words from localStorage
  - [X] Write updated words list to localStorage
- [X] Implement functions to add, update, delete words in storage
- [X] Implement function to mark words as learned/unlearned

## 5. Add New Word Feature
- [X] Create AddWordForm component with input fields for Russian and Slovak words
- [X] Validate inputs (non-empty)
- [X] Save new word pair to local storage on submit
- [X] Show success/failure feedback message
- [X] Clear input fields after adding

## 6. Practice Flashcards
- [X] Create Flashcard component:
  - [X] Show Slovak word front
  - [X] Flip to reveal Russian translation on click/tap
- [X] Implement next button to show next word (random or sequential)
- [X] Add button to mark current word as learned
- [X] Filter words to show only those not learned

## 7. Test Writing Feature
- [X] Create TestTyping component
- [X] Display Russian word
- [X] Input field for user to type Slovak translation
- [X] On submit, check correctness (case insensitive)
- [X] Show feedback: "Correct!" or "Wrong! Correct answer is …"
- [X] Next button to move to the next word
- [X] Mark word as learned button
- [X] Filter words to show only those not learned

## 8. Review Learned Words
- [X] Create component similar to Flashcards but for learned words
- [X] Show Slovak → Russian with flip functionality
- [X] Next button to cycle through learned words randomly or sequentially

## 9. Export Word List
- [X] Add "Export Words" button in appropriate place (e.g., settings or home)
- [X] Implement export function:
  - [X] Read words from localStorage
  - [X] Convert to JSON file and trigger download

## 10. PWA Setup
- [X] Create manifest.json with app name, icons, theme color, etc.
- [X] Register a service worker for caching static assets and offline support
- [ ] Test offline functionality (load app without internet)
- [X] Add "Add to Home Screen" prompt support

## 11. Styling & Responsive Design
- [X] Implement mobile-first styling
- [X] Use CSS Modules, Tailwind CSS, or styled-components (choose one)
- [X] Make buttons big and tappable
- [X] Ensure input fields and text are readable on small screens
- [ ] Test on multiple screen sizes

## 12. Testing & Bug Fixing
- [ ] Manually test all features on desktop and mobile
- [ ] Test offline mode thoroughly
- [ ] Fix layout or functionality bugs
- [ ] Improve UX and accessibility

## 13. Deployment
- [X] Configure build for GitHub Pages (base path if needed)
- [X] Create GitHub Actions workflow (optional) to auto-deploy on push
- [X] Push code and deploy
- [ ] Verify app works online and offline on mobile devices

## 14. Optional Enhancements
- [ ] Add ability to delete words
- [ ] Add "Reset Progress" button
- [ ] Add word search in the list
- [ ] Add dark mode support
- [ ] Add sound pronunciation (if you want to extend)
- [ ] Add cloud sync later if needed
