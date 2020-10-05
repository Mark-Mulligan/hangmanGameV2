/* GLOBAL VARAIABLES */
const comWorldList = ["apple", "something", "banana", "kitten", "hangman", "difficutly", 
"football", "sandwich", "often", "hidden", "wallet", "pancake", "bathroom", "apartment", "thermostat", "computer", 
"bamboo", "hierarchy", "landscape", "characterize", "rainforest"];
let currentWord = "";
let board = [];
let missCount = 0;
let lettersCorrect = 0;
let playerChoice = "";
let guessesMade = 0;
let playerWin = false;

/* BUTTONS CLICKS */
setTimeout(function(){ $(".instructions-container").fadeTo(2000, 1);; }, 1000);

$(".start-btn").click(function() {
    console.log('btn-clicked');
    startGame();
    $(".instructions-container").fadeOut(500);
    $(".game-wrapper").fadeTo(2000, 1);
})

$('.play-again-btn').click(function() {
    resetGameData();
    $(".game-wrapper").fadeTo(500, 0);
    setTimeout(function() { 
        clearDisplay();
        startGame();
        $(".game-wrapper").fadeTo(900, 1); 
    }, 1500);
})

function enableKeyboardButtons () {
    $('.keyboard-btn').click(function(e) {
        $(this).prop('disabled', true);
        updateGuessesMade();
        playerChoice = e.target.value;
        if (checkPlayerChoice()) updateWordBlanks(playerChoice); 
        else {
            missCount++;
            $('#letters-missed').html(missCount);
        }
        checkForEndGame();
    });
}

/* PLAYER FUNCTIONS */
function checkPlayerChoice () {
    let array = currentWord.split('');
    return (array.includes(playerChoice));
}

/* COMPUTER FUNCTIONS */
function startGame() {
    comSelectWord();
    createBlanks();
    enableKeyboardButtons();
}

function comSelectWord () {
    let choice = Math.floor(Math.random() * comWorldList.length);
    currentWord = comWorldList[choice];
}

  //sets blanks for gameboard based on computer's select word
function createBlanks () {
    for (let i = 0; i < currentWord.length; i++) {
        board.push('_');
    }
    $('.word-blanks').html(covertArrayToString(board));
}

/* GAMEBOARD/DISPLAY FUNCTIONS */
function updateWordBlanks (letter) {
    let array = currentWord.split('');
    for (let i = 0; i < array.length; i++) {
        if (array[i] === letter) {
            board.splice(i, 1, letter);
            lettersCorrect++;
        }
    }
    $('.word-blanks').html(covertArrayToString(board));
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
function covertArrayToString (array) {
    let arrayAsString = '';
    for (let i = 0; i < array.length; i++) {
        arrayAsString += `${array[i]} `;
    }
    return arrayAsString;
}

/* RESET DATA FUNCTIONS */
function resetGameData () {
    currentWord = "";
    playerChoice = "";
    missCount = 0;
    lettersCorrect = 0;
    guessesMade = 0;
    board = [];
    playerWin = false;
}