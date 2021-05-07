const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const messageRemainingGuesses = document.querySelector(".remaining");
const numGuessesRemaining = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

// Shows dots as placeholder for letters in the word to guess
const wordPlaceholder = word => {
    for (let letter of word) {
        wordInProgress.innerText += '●';
    }
}
wordPlaceholder(word);


// Captures the input and resets it to blank
guessButton.addEventListener("click", e => {
    e.preventDefault();
    const letter = inputLetter.value;
    console.log(letter);
    inputLetter.value = '';
    message.innerHTML = '';
    const validInput = validateInput(letter);
    console.log(validInput);
    if (validInput) {
        makeGuess(letter);
    }
});

// Validate users input
const validateInput = letter => {
    const acceptedLetter = /[a-zA-Z]/;
    if (letter == "") {
        message.innerHTML = "Please enter a letter from A to Z."
    } else if (letter.length > 1) {
        message.innerHTML = "Please enter only one letter at a time."
    } else if (!acceptedLetter.test(letter)) {
        message.innerHTML = "Only letters from A to Z are valid."
    } else {
        return letter;
    }
}

// Capture letters guessed
const makeGuess = letter => {
    letter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        message.innerHTML = "You have already guessed that letter. Try again."
    } else {
        guessedLetters.push(letter);
    }
    console.log(guessedLetters);
}
