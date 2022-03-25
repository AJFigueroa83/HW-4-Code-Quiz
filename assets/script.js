// creating all variables for the game //
var intro = document.querySelector(".intro");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");


var winCounter = 0;
var loseCounter = 0;
var timer;
var timerCount;

// this function is called when the page loads 
function init() {
    getWins();
    getlosses();
  }

// Attached event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Added reset button
var restartGame = document.querySelector(".restart-game");

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()
}
// Attached event listener to button
resetButton.addEventListener("click", resetGame);
