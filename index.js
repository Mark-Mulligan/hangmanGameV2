/* GLOBAL VARAIABLES */
const comWorldList = ["apple", "something", "banana", "kitten", "hangman", "difficutly", 
"football", "sandwich", "often", "hidden", "wallet", "pancake", "bathroom", "apartment", "thermostat", "computer", 
"bamboo", "hierarchy", "landscape", "characterize", "rainforest"];
let currentWord = [];   //computer selected word stored as an array
let board = [];         //stores blanks for user to see on gamboard
let missCount = 0;      //letters guessed incorrectly
let lettersCorrect = 0; //letters guessed correctly
let guessesMade = 0;    //total guessess made
let playerWin = false;  //tracks whether player wins the game or not

/* BUTTONS CLICKS */
setTimeout(function(){ $(".instructions-container").fadeTo(2000, 1);; }, 1000);

$(".start-btn").click(function() {
    $(".instructions-container").fadeOut(500);
    startGame();
})

$('.play-again-btn').click(function() {
    resetGameData();
    $(".game-wrapper").fadeTo(500, 0);
    setTimeout(function() { 
        clearDisplay();
        startGame();
    }, 600);
})

function enableKeyboardButtons () {
    $('.keyboard-btn').click(function(e) {
        $(this).prop('disabled', true);
        updateGuessesMade();
        let playerChoice = e.target.value;
        if (currentWord.includes(playerChoice)) updateWordBlanks(playerChoice); 
        else {
            missCount++;
            $('#letters-missed').html(missCount);
        }
        checkForEndGame();
    });
}

/* COMPUTER FUNCTIONS */
function startGame() {
    comSelectWord();
    createBlanks();
    enableKeyboardButtons();
    $(".game-wrapper").fadeTo(900, 1); 
}

function comSelectWord () {
    let choice = Math.floor(Math.random() * comWorldList.length);
    currentWord = (comWorldList[choice]).split('');
}

  //sets blanks for gameboard based on computer's select word
function createBlanks () {
    for (let i = 0; i < currentWord.length; i++) {
        board.push('_');
    }
    $('.word-blanks').html(arrayToFormattedString(board));
}

/* GAMEBOARD/DISPLAY FUNCTIONS */
function updateWordBlanks (letter) {
    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter) {
            board.splice(i, 1, letter);
            lettersCorrect++;
        }
    }
    $('.word-blanks').html(arrayToFormattedString(board));
}

function updateGuessesMade () {
    guessesMade++;
    $('#guesses-made-count').html(guessesMade);
}

function clearDisplay () {
    $('#letters-missed').html(missCount);
    $('#guesses-made-count').html(guessesMade);
    $('.result-window').addClass('invisible');
    $('.keyboard-btn').prop('disabled', false);
}

/* END GAME FUNCTIONS */
function checkForEndGame () {
    if (lettersCorrect === currentWord.length) {
        handleEndGame(`<h4>Game Over. You Win!</h4>
        <h4>It took you ${guessesMade} guesses to complete the word.</h4>`);
    } else if (missCount > 7) {
        handleEndGame(`Game Over.`);
    }
}

function handleEndGame(text) {
    $('.keyboard-btn').off();
    $('.result-window').removeClass('invisible');
    $('.result-window-text').html(text);
}

/* UTILITY FUNCTIONS */
function arrayToFormattedString (array) {
    let arrayAsString = '';
    for (let i = 0; i < array.length; i++) {
        arrayAsString += `${array[i]} `;
    }
    return arrayAsString;
}

/* RESET DATA FUNCTIONS */
function resetGameData () {
    currentWord = [];
    missCount = 0;
    lettersCorrect = 0;
    guessesMade = 0;
    board = [];
    playerWin = false;
}