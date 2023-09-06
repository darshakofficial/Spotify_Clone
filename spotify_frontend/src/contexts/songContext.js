import { createContext } from "react";

const songContext = createContext({
  currentSong: null,
  setCurrentSong: (currentSong) => {},
  soundPlayed: null,
  setSoundPlayed: () => {},
  isPaused: null,
  setIsPaused: () => {},
  likeButton: false,
  setLikeButton: () => {},
});

export default songContext;
