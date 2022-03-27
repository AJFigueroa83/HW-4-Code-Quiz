// creating all variables for the game //
var timerEl = document.querySelector(".timer-count");
var startButton = document.querySelector("#start-btn");
var nextButton = document.querySelector("#next-button");
var questionContainerEl = document.querySelector("#question-container");
var startContainerEl = document.querySelector("#start-container");
var questionEl = document.querySelector("#question");
var answerButtonsEl = document.querySelector("#answer-buttons");
var checkAnswerEl = document.querySelector("#check-answer");
var viewHighScores = document.querySelector("highscores-link");
var submitButton = document.querySelector("submit-btn");
var clearScoreButton = document.querySelector("clear-btn");
var initialsField = document.querySelector("player-name");
var restartButton = document.querySelector("restart-btn");
var scoreField = document.querySelector("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];

var shuffledQuestions, currentQuestionIndex;
var timeLeft = 60
var timerID;

// Created the questions to be populated on the quiz //
var questions = [
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

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});

// function for the timer
function startTimer() {
    timeLeft--;
      timerEl.textContent = "Time: " + timeLeft;
      if (timeLeft <= 0) {
        saveScore();
    }
}
    
// function to start the game //
function startGame() {
    timerID = setInterval(startTimer, 1000);
    startContainerEl.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide");
}

startTimer();
setNextQuestion();

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.array.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
    button.addEventListener("click", selectAnswer)
    answerButtonsEl.appendChild(button)    
    });
}

function resetState() {
    nextButton.classList.add("hide");
    checkAnswerEl.classList.add("hide");
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}
function selectAnswer(e) {
    var selectedButton = e.traget;
    var correct = selectedButton.dataset.correct;
    checkAnswerEl.classList.remove("hide")
    if (correct) {
        checkAnswerEl.innerHTML = "CORRECT!"
    } else {
        checkAnswerEl.innerHTML = "WRONG!";
        if (timeLeft <=0) {
            timeLeft = 0;
        } else {
            // penalty //
            timeLeft -= 10;
        }
    }
}
Array.from(answerButtonsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
})

if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide")
    checkAnswerEl.classList.remove,("hide")
} else {
    startButton.classList.remove("hide")
    saveScore();
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.add("correct");
    element.classList.add("wrong");
}


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




restartButton.addEventListener("click", restartGame);