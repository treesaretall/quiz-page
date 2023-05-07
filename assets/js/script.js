const startButtonEl = document.getElementById("start-button");
const nextButtonEl = document.getElementById("next-button");
const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerButtonEl = document.getElementById('answer-buttons');
const highScoresEl = document.getElementById('highScoresList');
const countdownEl = document.getElementById('countdown');
let secondsLeft = 60;
let score = parseInt(localStorage.getItem('score')) || 0;


startButtonEl.addEventListener('click', startGame)
nextButtonEl.addEventListener('click', function() {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        startButtonEl.innerText = 'Restart';
        startButtonEl.classList.remove('hide');
        nextButtonEl.classList.add('hide');
    }
});

function setTimer() {

    let timerInterval = setInterval(function() {
        secondsLeft--;
        countdownEl.textContent = secondsLeft + " seconds left!"

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            secondsLeft = 60;
            showEndScreen()
        }
    }, 1000)
}

function startGame() {
    startButtonEl.classList.add('hide');
    highScoresEl.classList.add('hide')
    questionContainerEl.classList.remove('hide');
    shuffledQuestions = questions.sort(function() {
        return Math.random() - .5;
    });
    currentQuestionIndex = 0;
    score = 0;
    localStorage.setItem('score', score);
    setNextQuestion();
    setTimer();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    for (var i = 0; i < question.answers.length; i++) {
        var answer = question.answers[i];
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonEl.appendChild(button);
    }
}

function resetState() {
    nextButtonEl.classList.add('hide');
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild(answerButtonEl.firstChild);
    }
}

function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    var answerButtons = answerButtonEl.children;
    for (var i = 0; i < answerButtons.length; i++) {
        setStatusClass(answerButtons[i], answerButtons[i].dataset.correct);
    }
    if (correct){
        score++
        localStorage.setItem('score', score);
    }
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        nextButtonEl.classList.remove('hide');
    } else {
        showEndScreen();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showEndScreen() {
    highScoresEl.classList.remove('hide')
    questionContainerEl.classList.add('hide');
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const score = localStorage.getItem("score");
    const initials = prompt("Enter your initials:");
    highScores.push({ initials, score });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    const highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = highScores
    .map((entry) => {
        return `<li>${entry.initials} - ${entry.score}</li>`;
    })
    .join("");
    startButtonEl.innerHTML="Retry?"
    startButtonEl.classList.remove('hide')
}

const questions = [
    {
        question: 'Which of the following keywords is used to define a variable in Javascript?',
        answers: [
            {text: 'var', correct: false},
            {text: 'let', correct: false},
            {text: 'Both A & B', correct: true},
            {text: 'None of the above', correct: false}
        ]
    },
    {
        question: 'Which of the following methods is used to access HTML elements using Javascript?',
        answers: [
            {text: 'getElementById()', correct: false},
            {text: 'getElementsByClassName()', correct: false},
            {text: 'Both A & B', correct: true},
            {text: 'None of the above', correct: false}
        ]
    },
    {
        question: 'Upon encountering empty statements, what does the Javascript Interpreter do?',
        answers: [
            {text: 'Throws an error', correct: false},
            {text: 'Ignores the Statements', correct: true},
            {text: 'Gives a warning', correct: false},
            {text: 'None of the above', correct: false}
        ]
    },
    {
        question: 'Which of the following methods can be used to display data in some form using Javascript?',
        answers: [
            {text: 'document.write()', correct: false},
            {text: 'console.log()', correct: false},
            {text: 'window.alert()', correct: false},
            {text: 'All of the above', correct: true}
        ]
    },
    {
        question: 'How can a datatype be declared to be a constant type?',
        answers: [
            {text: 'const', correct: true},
            {text: 'var', correct: false},
            {text: 'let', correct: false},
            {text: 'constant', correct: false}
        ]
    },
    {
        question: 'What keyword is used to check whether a given property is valid or not?',
        answers: [
            {text: 'in', correct: true},
            {text: 'is in', correct: false},
            {text: 'exists', correct: false},
            {text: 'lies', correct: false}
        ]
    },
    {
        question: 'What is the use of the <noscript> tag in Javascript?',
        answers: [
            {text: 'The contents are displayed by non-JS-based browsers', correct: true},
            {text: 'Clears all the cookies and cache', correct: false},
            {text: 'Both A and B', correct: false},
            {text: 'None of the Above', correct: false}
        ]
    },
    {
        question: 'When an operators value is NULL, the typeof returned by the unary operator is:',
        answers: [
            {text: 'Boolean', correct: false},
            {text: 'Undefined', correct: false},
            {text: 'Object', correct: true},
            {text: 'Integer', correct: false}
        ]
    },
    
    ]