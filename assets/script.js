// creating all variables for the game //
var intro = document.querySelector(".intro");
var correct = document.querySelector(".correct");
var wrong = document.querySelector(".wrong");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var questionEl = document.querySelector("#questions");
var possibleAnswersEl = document.querySelector("#possibleAnswers")
var screen0Ele = document.querySelector("#screen0");
var screen1Ele = document.querySelector("screen1");

var correctCounter = 0;
var wrongCounter = 0;
var isWin = false
var timer;
var timerCount;

var dynamicElements =[
    screen0Ele,
    screen1Ele,
]

var HIDE_CLASS = "hide";

// Created the questions to be populated on the quiz //
var sommQuestions = [
    {
    question: 'Which of these is not a red grape?',
    answers: ['Pinot Noir', 'Pinot Grigio', 'Pinot Meunier', 'Pinot Nero'],
    answer: [1],
    },
    {    
    question: 'If a champagne is labeled "Blanc de Blacns", which grape is it made from?',
    answers: ['Pinot Grigio', 'Chardonnay', 'Sauvignon Blanc', 'Pinot Gris'],
    answer: [1],
    },
    {    
    question: 'Which grape is Australia most famously known for?',
    answers: ['Shiraz', 'Cabernet Sauvignon', 'Pinot Noir', 'Chardonnay'],
    answer: [0],
    },
    {    
    question: 'What does "LBV" stand for?',
    answers: ['Last Bottled Variant', 'Latest Bottled Vine', 'Late Bottled Vintage', 'Last Built Vinyard'],
    answer: [2],
    },
    {    
    question: 'What is the main ingredient in producing Cognac?',
    answers: ['grapes', 'grains', 'barley', 'hops'],
    answer: [0],
    },
    {    
    question: 'Where does Cognac come from?',
    answers: ['Spain', 'United States', 'Italy', 'France'],
    answer: [3],
    },
    {    
    question: 'Italy produces a spirit made from grape must. What is it called?',
    answers: ['Grappa', 'Marx', 'Orujo', 'Porto'],
    answer: [0],
    },
    {
    question: 'What is the main ingredient of Tequila?',
    answers: ['barley', 'agave', 'aloe', 'grains'],
    answer: [1],
    },
    {
    question: 'Which country is most famously known for their whisky?',
    answers: ['Ireland', 'Canada', 'Scotland', 'Japan'],
    answer: [2],
    },
    {
    question: 'What is the most widely consumed spirit?',
    answers: ['vodka', 'tequila', 'rum', 'whiskey'],
    answer: [0],
    },
]

var currentQuestion = 0

// this function is called when the page loads 
function init() {
    getCorrects();
    getWrongs;
}

// function setState(state) {
//     switch (state) {
//       case 1:
//         populateQuestions();
//         break;
//       default:
//         break;
//     }

//     dynamicElements.forEach(function (ele) {
//         var possibleStatesAttr = ele.getAttribute("data-states");
//         var possibleStates = JSON.parse(possibleStatesAttr);
//         if (possibleStates.includes(state)) {
//             ele.classList.remove(HIDE_CLASS);
//         } else {
//         ele.classList.add(HIDE_CLASS);
//         }
//     });
// }
// function to start the game //


function startGame() {
    isWin = false;
    timerCount = 60;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    displayQuestions()
    startTimer()
}
// function for the timer
function startTimer() {
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        if (isWin && timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
          winGame();
        }
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        loseGame();
      }
    }, 1000);
}

// function populateQuestions() {
//     var questions = sommQuestions[currentQuestion];
//     possibleAnswersEl.innerHTML = "";
//     sommQuestions.textcontent = questions.question;
//     questions.answers.forEach(function(question) {
//         var li = document.createElement('li');
//         li.textContent = question;
//         possibleAnswersEl.appendChild(li);
//     });
//     if (currentQuestion === sommQuestions.length - 1) {
//         currentQuestion = 0;
//     } else {
//         currentQuestion++;
//     }
// }
// Get stored value from client storage, if it exists
function getCorrects() {
    var storedWins = localStorage.getItem("correctCount");
    if (storedWins === null) {
      correctCounter = 0;
    } else {
      correctCounter = storedWins;
    }
    //Render win count to page
    correct.textContent = correctCounter;
}
  
function getWrongs() {
    var storedLosses = localStorage.getItem("wrongCount");
    if (storedLosses === null) {
      wrongCounter = 0;
    } else {
      wrongCounter = storedLosses;
    }
    wrong.textContent = wrongCounter;
}

function winGame() {
    intro.textContent = "YOU WON!!!🏆 ";
    correctCounter++
    startButton.disabled = false;
    setCorrects()
}

function loseGame() {
    intro.textContent = "GAME OVER";
    wrongCounter++
    startButton.disabled = false;
    setWrongs()
}


function setCorrects() {
    correct.textContent = correctCounter;
    localStorage.setItem("correctCount", correctCounter);
}
  
// Updates lose count on screen and sets lose count to client storage
  function setWrongs() {
    wrong.textContent = wrongCounter;
    localStorage.setItem("wrongCount", wrongCounter);
}

// calling the function //
init();

// Added reset button
var restartButton = document.querySelector(".restartButton");

function restartGame() {
  // Resets win and loss counts
  correctCounter = 0;
  wrongCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setCorrects()
  setWrongs()
}


startButton.addEventListener("click", startGame);

restartButton.addEventListener("click", restartGame);