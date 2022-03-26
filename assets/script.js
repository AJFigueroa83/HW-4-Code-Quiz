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

// Created the questions to be populated on the quiz //
var sommQuestions = {
    question: ['Which of these is not a red grape?'],
    answers: ['Pinot Noir', 'Pinot Grigio', 'Pinot Meunier', 'Pinot Nero'],
    answer: [1],

    question: ['If a champagne is labeled "Blanc de Blacns", which grape is it made from?'],
    answers: ['Pinot Grigio', 'Chardonnay', 'Sauvignon Blanc', 'Pinot Gris'],
    answer: [1],

    question: ['Which grape is Australia most famously known for?'],
    answers: ['Shiraz', 'Cabernet Sauvignon', 'Pinot Noir', 'Chardonnay'],
    answer: [0],

    question: ['What does "LBV" stand for?'],
    answers: ['Last Bottled Variant', 'Latest Bottled Vine', 'Late Bottled Vintage', 'Last Built Vinyard'],
    answer: [2],

    question: ['What is the main ingredient in producing Cognac?'],
    answers: ['grapes', 'grains', 'barley', 'hops'],
    answer: [0],

    question: ['Where does Cognac come from?'],
    answers: ['Spain', 'United States', 'Italy', 'France'],
    answer: [3],

    question: ['Italy produces a spirit made from grape must. What is it called?'],
    answers: ['Grappa', 'Marx', 'Orujo', 'Porto'],
    answer: [0],

    question: ['What is the main ingredient of Tequila?'],
    answers: ['barley', 'agave', 'aloe', 'grains'],
    answer: [1],

    question: ['Which country is most famously known for their whisky?'],
    answers: ['Ireland', 'Canada', 'Scotland', 'Japan'],
    answer: [2],

    question: ['What is the most widely consumed spirit?'],
    answers: ['vodka', 'tequila', 'rum', 'whiskey'],
    answer: [0],
}

// this function is called when the page loads 
function init() {
    getWins();
    getlosses();
  }

// Attached event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Added reset button
var restartGame = document.querySelector(".restart-game");

function restartGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()
}
// Attached event listener to button
resetButton.addEventListener("click", restartGame);
