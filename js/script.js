const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const messageRemainingGuesses = document.querySelector(".remaining");
const numGuessesRemaining = document.querySelector(".remaining span");
const messageToDisplay = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

const wordPlaceholder = word => {
    for (let letter of word) {
        wordInProgress.innerText += '●';
    }
}

wordPlaceholder(word);
