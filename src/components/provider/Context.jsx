"use client";
import { useContext, createContext } from "react";

export const RockPapperScissorsContext = createContext({
  gameData: {
    setUserChoice: () => {},
    setComputerChoice: () => {},
    setResult: () => {},
    setUserScore: () => {},
    setComputerScore: () => {},
    handleUserChoice: () => {},
    resetGame: () => {},
    userChoice: null,
    computerChoice: null,
    result: null,
    userScore: 0,
    computerScore: 0,
  },
});

export const useRockPapperScissorsContext = () =>
  useContext(RockPapperScissorsContext);
