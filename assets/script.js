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
var submitButton = document.querySelector("#submit-btn");
var clearScoreButton = document.querySelector("#clear-btn");
var initialsField = document.querySelector("#player-name");
var restartButton = document.querySelector("#restart-btn");
var scoreField = document.querySelector("#player-score");
var scores = JSON.parse(localStorage.getItem("#scores")) || [];

var shuffledQuestions = []; 
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerID;

// Created the questions to be populated on the quiz //
var questions = [
    {
    question: 'Which of these is not a red grape?',
    answers: [
        { text: 'Pinot Noir', correct: false },
        { text: 'Pinot Grigio', correct: true },
        { text: 'Pinot Meunier', correct: false },
        { text: 'Pinot Nero', correct: false }]
    },
    {    
    question: 'If a champagne is labeled "Blanc de Blacns", which grape is it made from?',
    answers: [
        { text: 'Pinot Grigio', correct: false },
        { text: 'Chardonnay', correct: true },
        { text: 'Sauvignon Blanc', correct: false },
        { text: 'Pinot Gris', correct: false }]
    },
    {    
    question: 'Which grape is Australia most famously known for?',
    answers: [
        { text: 'Shiraz', correct: true },
        { text: 'Cabernet Sauvignon', correct: false },
        { text: 'Pinot Noir', correct: false }, 
        { text: 'Chardonnay', correct: false }]
    },
    {    
    question: 'What does "LBV" stand for?',
    answers: [
        { text: 'Last Bottled Variant', correct: false },
        { text: 'Latest Bottled Vine', correct: false },
        { text: 'Late Bottled Vintage', correct: true },
        { text: 'Last Built Vinyard', correct: false }]
    },
    {    
    question: 'What is the main ingredient in producing Cognac?',
    answers: [
        { text: 'grapes', correct: true },
        { text: 'grains', correct: false },
        { text: 'barley', correct: false },
        { text: 'hops', correct: false }]
    },
    {    
    question: 'Where does Cognac come from?',
    answers: [
        { text: 'Spain', correct: false },
        { text: 'United States', correct: false },
        { text: 'Italy', correct: false },
        { text: 'France', correct: true }]
    },
    {    
    question: 'Italy produces a spirit made from grape must. What is it called?',
    answers: [
        { text: 'Grappa', correct: true },
        { text: 'Marx', correct: false },
        { text: 'Orujo', correct: false },
        { text: 'Porto', correct: false }]
    },
    {
    question: 'What is the main ingredient of Tequila?',
    answers: [
        { text: 'barley', correct: false },
        { text: 'agave', correct: true },
        { text: 'aloe', correct: false },
        { text: 'grains', correct: false }]
    },
    {
    question: 'Which country is most famously known for their whisky?',
    answers: [
        { text: 'Ireland', correct: false },
        { text: 'Canada', correct: false },
        { text: 'Scotland', correct: true },
        { text: 'Japan', correct: false }]
    },
    {
    question: 'What is the most widely consumed spirit?',
    answers: [
        { text: 'vodka', correct: true },
        { text: 'tequila', correct: false },
        { text: 'rum', correct: false },
        { text: 'whiskey', correct: false }]
    },
]

// added event listeners for start and reset game //
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
    showQuestion(questions[currentQuestionIndex]);
}

function shuffleQuestions() {
    Math.floor(Math.random() * questions.length)
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
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
    var selectedButton = e.target;
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
    currentQuestionIndex ++
    setNextQuestion()
}

Array.from(answerButtonsEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
})

if (shuffledQuestions > currentQuestionIndex + 1) {
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

// this saves score //
function saveScore() {
    clearInterval(timerID);
    timerEl.textContent = "Time: " + timeLeft;
    setTimeout(function () {
        questionContainerEl.classList.add("hide");
        document.getElementById("score-container").classList.remove("hide");
        document.getElementById("your-score").textContent = "Your Final Score is " + timeLeft;
    }, 1000)
}

// get score from local storage //
var loadScores = function () {
    if (!savedScores) {
        return false;
    }
    saveScore = JSON.parse(saveScore);
    var initials = document.querySelector("#initials-field").ariaValueMax;
    var newScore = {
        score: timeLeft,
        initials: initials
    }
    saveScore.push(newScore);
    console.log(saveScore)

    saveScore.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
}

function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hide")
    document.getElementById("score-container").classList.add("hide");

    startContainerEl.classList.add("hide");
    questionContainerEl.classList.add("hide");
    if (typeof initials == "string") {
        var score = {
            initials, timeLeft
        }
        scores.push(score)
    }
    var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";
    for (i = 0; i < scores.length; i++) {
        var section1 = document.createElement("section");
        section1.setAttribute("class", "name-section");
        section1.innerText = scores[i].initials;
        var section2 = document.createElement("section");
        section2.setAttribute("class", "score-section");
        section2.innerText = scores[i].timeLeft;

        highScoreEl.appendChild(section1);
        highScoreEl.appendChild(section2);
    }
    localStorage.setItem("scores", JSON.stringify(scores));
}

submitButton.addEventListener("click", function(event) {
    event.preventDefault()
    var initials = document.querySelector("#initials-field").value;
    showHighScores(initials);
})


// Added reset button
restartButton.addEventListener("click", function() {
    window.location.reload();
});

clearScoreButton.addEventListener("click", function() {
    localStorage.clear();
    document.querySelector("#highscore").innerHTML = "";
})