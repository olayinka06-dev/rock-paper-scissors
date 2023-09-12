// pages/index.js
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

// setInterval(() => {
  //   const utterance = new SpeechSynthesisUtterance("Rock, Paper, Scissors, Lizard, Spock");
  //   speechSynthesis.speak(utterance)
  // }, 2000);

  const choices = [
    "icon-rock.svg",
    "icon-paper.svg",
    "icon-scissors.svg",
    "icon-lizard.svg",
    "icon-spock.svg",
  ];

  function getRandomChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

const ChoiceImage = ({ userChoice }) => {
  return (
    <div
      className={`border-[7px] bg-white border-solid rounded-full py-4 px-5 ${
        userChoice === "icon-scissors.svg"
          ? "border-[rgb(235,169,33)]"
          : userChoice === "icon-spock.svg"
          ? "px-6 border-[hsl(189,59%,53%)]"
          : userChoice === "icon-paper.svg"
          ? "border-[hsl(230,89%,62%)]"
          : userChoice === "icon-rock.svg"
          ? "border-[hsl(349,71%,52%)] py-5"
          : "border-[hsl(261,73%,60%)] py-5"
      }`}
    >
      <Image
        priority
        width={80}
        height={80}
        src={`/images/${userChoice}`}
        alt="logo"
      />
    </div>
  );
};
const HouseImage = ({ computerChoice }) => {
  return (
    <div
      className={`border-[7px] bg-white border-solid rounded-full py-4 px-5 ${
        computerChoice === "icon-scissors.svg"
          ? "border-[rgb(235,169,33)]"
          : computerChoice === "icon-spock.svg"
          ? "px-6 border-[hsl(189,59%,53%)]"
          : computerChoice === "icon-paper.svg"
          ? "border-[hsl(230,89%,62%)]"
          : computerChoice === "icon-rock.svg"
          ? "border-[hsl(349,71%,52%)] py-5"
          : "border-[hsl(261,73%,60%)] py-7"
      }`}
    >
      <Image
        priority
        width={80}
        height={80}
        src={`/images/${computerChoice}`}
        alt="logo"
      />
    </div>
  );
};

export default function Home() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [stepFour, setStepFour] = useState(false);

  

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
          setResult("You loose!");
          setTimeout(() => {
            setComputerScore(computerScore + 1);
          }, 3500);
        }
      }
    };

    handleResult();
  }, [userChoice, computerChoice]);

  // Save userScore to local storage whenever it changes

  useEffect(() => {
    localStorage.setItem("userScore", JSON.stringify(userScore));
  }, [userScore]);

  useEffect(() => {
    const storedScores = localStorage.getItem("userScore");
    if (storedScores) {
      setUserScore(JSON.parse(storedScores));
    } else {
      setUserScore(0);
    }
  }, []);

  const handleUserChoice = (choice) => {
    const computer = getRandomChoice();

    setUserChoice(choice);
    setComputerChoice(computer);
    setStepOne(false);
    setStepTwo(true);
    setTimeout(() => {
      setStepTwo(false);
    }, 2000);
    setTimeout(() => {
      setStepThree(true);
    }, 2000);
    setTimeout(() => {
      setStepThree(false);
    }, 3000);
    setTimeout(() => {
      setStepFour(true);
    }, 3000);
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
    setStepOne(true);
    setStepFour(false);
  };

  return (
    <section className="bg-[hsl(214, 47%, 23%)] flex justify-center items-center bg w-full h-screen">
      <div className="flex w-full max-w-[600px] gap-5 flex-col items-center">
        <div className="border border-white mb-20 w-full flex justify-between rounded-xl py-4 px-5">
          <div className="flex flex-col ">
            <span className="text-white font-bold text-lg leading-[16px]">
              Rock <br /> Paper <br /> Scissors <br /> Lizard <br /> Spock
            </span>
          </div>
          <div className="flex flex-row items-center gap-3">
            <div className="bg-white px-8 rounded-xl justify-center flex flex-col ga-1 items-center">
              <span className="text-[rgb(78,89,166)]">user</span>
              <h1 className="text-[rgb(85,81,105)] text-[25px]">{userScore}</h1>
            </div>
            <div className="bg-white px-8 rounded-xl justify-center flex flex-col ga-1 items-center">
              <span className="text-[rgb(78,89,166)]">house</span>
              <h1 className="text-[rgb(85,81,105)] text-[25px]">
                {computerScore}
              </h1>
            </div>
          </div>
        </div>

        {stepOne && (
          <div className="relative">
            <img src="/images/bg-pentagon.svg" alt="" />
            {choices.map((choice, i) => (
              <button
                key={i}
                className={`bg-white border-[7px] border-solid rounded-full py-4 px-5 ${
                  i === 2
                    ? "absolute top-[-40px] border-[rgb(235,169,33)] left-[130px]"
                    : i === 4
                    ? "absolute top-[45px] px-6 border-[hsl(189,59%,53%)] left-[-40px]"
                    : i === 1
                    ? "absolute border-[hsl(230,89%,62%)] top-[45px] right-[-40px]"
                    : i === 0
                    ? "absolute border-[hsl(349,71%,52%)] bottom-[-20px] py-5 right-[0px]"
                    : "absolute border-[hsl(261,73%,60%)] py-5 bottom-[-20px] left-[0px]"
                }`}
                onClick={() => handleUserChoice(choice)}
                disabled={userChoice}
              >
                <Image
                  priority
                  width={40}
                  height={40}
                  src={`/images/${choice}`}
                  alt="choice"
                />
              </button>
            ))}
          </div>
        )}

        {userChoice && stepTwo && (
          <div className="flex w-full justify-between items-center">
            <div className="flex gap-2 flex-col">
              <h2 className="text-white text-[25px]">You Picked</h2>
              <ChoiceImage userChoice={userChoice} />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-white text-[25px]">The House Picked</h2>
              <div className="h-40 w-40 rounded-full bg-[rgb(23,34,62)]"></div>
            </div>
          </div>
        )}
        {userChoice && stepThree && (
          <div className="flex w-full justify-between items-center">
            <div className="flex gap-2 flex-col">
              <h2 className="text-white text-[25px]">You Picked</h2>
              <ChoiceImage userChoice={userChoice} />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-white text-[25px]">The House Picked</h2>
              <div className="">
                <HouseImage computerChoice={computerChoice} />
              </div>{" "}
            </div>
          </div>
        )}
        {userChoice && stepFour && (
          <div className="flex w-full justify-between items-center">
            <div className="flex gap-2 flex-col">
              <h2 className="text-white text-[25px]">You Picked</h2>
              <ChoiceImage userChoice={userChoice} />
            </div>
            <div className="">
              <h1 className="text-[25px] text-white">{result}</h1>
              <button
                className="bg-white hover:bg-white text-black font-bold py-2 px-6 rounded mt-4"
                onClick={resetGame}
              >
                Play Again
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-white text-[25px]">The House Picked</h2>
              <div className="">
                <HouseImage computerChoice={computerChoice} />
              </div>{" "}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
