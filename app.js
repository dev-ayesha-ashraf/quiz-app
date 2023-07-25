const questions = [
    {
        question: "What is HTML stands for?",
        answer: [
            { text: "Hyper Text Multiple Language", correct: false },
            { text: "Hyper Text Multi Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Text Macro   m Language", correct: false }
        ]
    },
    {
        question: "How many types of heading does an html contain?",
        answer: [
            { text: "Six", correct: true },
            { text: "five", correct: false },
            { text: "Four", correct: false },
            { text: "Three", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to display the data in the tabular form?",
        answer: [
            { text: "tr", correct: false },
            { text: "td", correct: false },
            { text: "tbody", correct: false },
            { text: "table", correct: true }
        ]
    },
    {
        question: "Which tag is used to enter the hyperlink ? ",
        answer: [
            { text: "link tag", correct: false },
            { text: "anchor tag", correct: true },
            { text: "break tag", correct: false },
            { text: "script tag", correct: false }
        ]
    },
    {
        question: "which tag is inserted for line break ?",
        answer: [
            { text: "hr", correct: false },
            { text: "break", correct: false },
            { text: "lb", correct: false },
            { text: "br", correct: true }
        ]
    }
]
const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answerBtn");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}
function resetState() {
    nextBtn.style.display = "none";
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextBtn.style.display = "block"
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length} !`;
    nextBtn.innerHTML = "Play Again"
    nextBtn.style.display = "block"
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}
nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

startQuiz()