export interface WordPair {
  russian: string;
  slovak: string;
  learned: boolean;
  id: string;
}

export const presetWords: WordPair[] = [
  {
    russian: "привет",
    slovak: "ahoj",
    learned: false,
    id: "1"
  },
  {
    russian: "спасибо",
    slovak: "ďakujem",
    learned: false,
    id: "2"
  },
  {
    russian: "пожалуйста",
    slovak: "prosím",
    learned: false,
    id: "3"
  },
  {
    russian: "да",
    slovak: "áno",
    learned: false,
    id: "4"
  },
  {
    russian: "нет",
    slovak: "nie",
    learned: false,
    id: "5"
  },
  {
    russian: "извините",
    slovak: "prepáčte",
    learned: false,
    id: "6"
  },
  {
    russian: "добрый день",
    slovak: "dobrý deň",
    learned: false,
    id: "7"
  },
  {
    russian: "до свидания",
    slovak: "dovidenia",
    learned: false,
    id: "8"
  },
  {
    russian: "как дела",
    slovak: "ako sa máš",
    learned: false,
    id: "9"
  },
  {
    russian: "хорошо",
    slovak: "dobre",
    learned: false,
    id: "10"
  }
];
