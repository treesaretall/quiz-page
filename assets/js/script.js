const startButtonEl = document.getElementById("start-button")
const nextButtonEl = document.getElementById("next-button")
const questionContainerEl = document.getElementById('question-container')
const questionEl = document.getElementById('question')
const answerButtonEl = document.getElementById('answer-buttons')

startButtonEl.addEventListener('click', startGame)
nextButtonEl.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButtonEl.classList.add('hide');
    questionContainerEl.classList.remove('hide')
    shuffledQuestions=questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    setNextQuestion()
}

let shuffledQuestions , currentQuestionIndex

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonEl.appendChild(button)
    })
}
function resetState() {
    nextButtonEl.classList.add('hide')
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild
        (answerButtonEl.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton =e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButtonEl.classList.remove('hide')
} else {
    startButtonEl.innerText = 'Restart'
    startButtonEl.classList.remove('hide')
}
}


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')

    } else {
        element.classList.add ('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
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

]