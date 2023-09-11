// pages/index.js
"use client";
import { useState, useEffect } from 'react';

const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

function getRandomChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

export default function Home() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  useEffect(() => {
    const handleResult = () => {
      if (userChoice && computerChoice) {
        if (userChoice === computerChoice) {
          setResult('It\'s a tie!');
        } else if (
          (userChoice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
          (userChoice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
          (userChoice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
          (userChoice === 'lizard' && (computerChoice === 'spock' || computerChoice === 'paper')) ||
          (userChoice === 'spock' && (computerChoice === 'rock' || computerChoice === 'scissors'))
        ) {
          setResult('You win!');
          setUserScore(userScore + 1);
        } else {
          setResult('Computer wins!');
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

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-4xl font-bold mb-4">Rock, Paper, Scissors, Lizard, Spock</h1>
      <div className="flex space-x-4">
        {choices.map((choice) => (
          <button
            key={choice}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleUserChoice(choice)}
            disabled={userChoice}
          >
            {choice}
          </button>
        ))}
      </div>
      {userChoice && (
        <div className="mt-4">
          <p>You chose: {userChoice}</p>
          <p>Computer chose: {computerChoice}</p>
          <p>{result}</p>
          <p>Score: You {userScore} - {computerScore} Computer</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
