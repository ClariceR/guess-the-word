const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const messageRemainingGuesses = document.querySelector(".remaining");
const numGuessesRemaining = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

// Async function to fetch data from words api
const getWord = async () => {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text();
    const wordArray = words.split("\n");
    let randomIndex = Math.floor(Math.random() * wordArray.length)
    const randomWord = wordArray[randomIndex].trim();
    word = randomWord;
    getPlaceholder(word);
}
getWord();

// Shows dots as placeholder for letters in the word to guess
const getPlaceholder = word => {
    for (let letter of word) {
        wordInProgress.innerText += '●';
    }
}

// Captures the input and resets it to blank
guessButton.addEventListener("click", e => {
    e.preventDefault();
    const letter = inputLetter.value;
    inputLetter.value = '';
    message.innerHTML = '';
    const validInput = validateInput(letter);
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
        showGuessedLetters();
        updateGuesses(letter);
        updateWord(guessedLetters);
    }
}

// Show the guessed letters
const showGuessedLetters = () => {
    guessedLettersList.innerHTML = '';
    for (let letter of guessedLetters) {
        let li = document.createElement("li");
        li.innerHTML = letter;
        guessedLettersList.append(li);
    }
}

// Helper function to replace dot by guessed letter
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

// Update the word in progress
const updateWord = guessedLetters => {
    const wordUpper = word.toUpperCase();
    [...wordUpper].forEach( function(letter, index) {
        if (guessedLetters.includes(letter)) {
            const updatedWord = wordInProgress.innerText.replaceAt(index, letter);
            wordInProgress.innerText = updatedWord;
        } 
    });
    checkWin();
    isGameOver();
}

// Updates guesses
const updateGuesses = guess => {
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)){
        messageRemainingGuesses.innerHTML = `Good guess! The word has the letter ${guess}.`
    } else {
        messageRemainingGuesses.innerHTML = `Oh no! The word doesn't have the letter ${guess}.`
        remainingGuesses -= 1;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was ${word}.`
    } else if (remainingGuesses === 1) {
        messageRemainingGuesses.innerHTML = `<p class="remaining">You have <span>1 guess</span> remaining.</p>`
    } else {
        messageRemainingGuesses.innerHTML = `<p class="remaining">You have <span>${remainingGuesses} guesses</span> remaining.</p>`
    }
}

// Check if player won
const checkWin = () => {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
    }
}

// Starts over the game
const startOver = () => {
    guessButton.classList.add("hide");
    messageRemainingGuesses.classList.add("hide");
    guessedLettersList.classList.add("hide");
    playAgainButton.classList.remove("hide");
}

// Check if the game is over
const isGameOver = () => {
    if (message.classList.contains("win") || remainingGuesses === 0) {
        startOver();
    }
}

// Play again button click event listener
playAgainButton.addEventListener("click", () => {
    message.classList.remove("win");
    wordInProgress.innerText = '';
    message.innerText = '';
    guessedLettersList.innerHTML = '';
    guessedLettersList.classList.remove("hide");
    remainingGuesses = 8;
    guessedLetters = [];
    messageRemainingGuesses.innerHTML = `<p class="remaining">You have <span>${remainingGuesses} guesses</span> remaining.</p>`;
    messageRemainingGuesses.classList.remove("hide");
    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
})