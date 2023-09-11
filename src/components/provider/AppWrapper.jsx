"use client";
import React, { useState, useEffect } from "react";
import { RockPapperScissorsContext } from "./Context";

const choices = ["rock", "paper", "scissors", "lizard", "spock"];

function getRandomChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

export const AppWrapper = ({ children }) => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  useEffect(() => {
    const handleResult = () => {
      if (userChoice && computerChoice) {
        if (userChoice === computerChoice) {
          setResult("It's a tie!");
        } else if (
          (userChoice === "rock" &&
            (computerChoice === "scissors" || computerChoice === "lizard")) ||
          (userChoice === "paper" &&
            (computerChoice === "rock" || computerChoice === "spock")) ||
          (userChoice === "scissors" &&
            (computerChoice === "paper" || computerChoice === "lizard")) ||
          (userChoice === "lizard" &&
            (computerChoice === "spock" || computerChoice === "paper")) ||
          (userChoice === "spock" &&
            (computerChoice === "rock" || computerChoice === "scissors"))
        ) {
          setResult("You win!");
          setUserScore(userScore + 1);
        } else {
          setResult("Computer wins!");
          setComputerScore(computerScore + 1);
        }
      }
    };

    handleResult();
  }, [userChoice, computerChoice]);

  const handleUserChoice = (choice) => {
    const computer = getRandomChoice();

    setUserChoice(choice);
    setComputerChoice(computer);
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  const gameData = {
    setUserChoice,
    setComputerChoice,
    setResult,
    setUserScore,
    setComputerScore,
    handleUserChoice,
    resetGame,
    userChoice,
    computerChoice,
    result,
    userScore,
    computerScore,
  };
  return (
    <main className="">
      <RockPapperScissorsContext.Provider value={{ gameData }}>
        {children}
      </RockPapperScissorsContext.Provider>
    </main>
  );
};
