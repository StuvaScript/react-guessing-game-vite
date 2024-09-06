import { useState } from "react";
import GuessControl from "./GuessControl";
import GuessMessage from "./GuessMessage";
import GameOver from "./GameOver";

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const MAX_ATTEMPTS = 5;

const NumberGuessingGame = () => {
  const [guessLogic, setGuessLogic] = useState({
    numberToGuess: getRandomNumber(),
    numberOfGuesses: 0,
    latestGuess: null,
  });
  console.log(guessLogic);

  function handleGuess(guess) {
    setGuessLogic({
      ...guessLogic,
      latestGuess: guess,
      numberOfGuesses: guessLogic.numberOfGuesses + 1,
    });
  }

  function handleReset() {
    setGuessLogic({
      numberToGuess: getRandomNumber(),
      numberOfGuesses: 0,
      latestGuess: null,
    });
  }

  const isCorrectGuess = guessLogic.latestGuess === guessLogic.numberToGuess;

  const isGameOver =
    isCorrectGuess || guessLogic.numberOfGuesses === MAX_ATTEMPTS;

  return (
    <div>
      <h2>I&apos;m thinking of a number from 1 to 100.</h2>
      <h2>
        Can you guess the number I am thinking of in {MAX_ATTEMPTS} tries?
      </h2>
      <GuessControl onGuess={handleGuess} />
      {isGameOver && <GameOver hasWon={isCorrectGuess} onReset={handleReset} />}
      {!isGameOver && (
        <GuessMessage
          guess={guessLogic.latestGuess}
          numberToGuess={guessLogic.numberToGuess}
          numberOfGuesses={guessLogic.numberOfGuesses}
        />
      )}
    </div>
  );
};

export default NumberGuessingGame;
