let questions = [];
let currentQuestion = 0;
let score = 0;

// Fetch questions from Open Trivia API
async function fetchQuestions() {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple");
        const data = await response.json();
        questions = data.results.map(q => ({
            question: q.question,
            correctAnswer: q.correct_answer,
            options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
        }));
        loadQuestion();
    } catch (error) {
        document.getElementById("quiz-container").innerHTML = "<p>Error loading questions. Check your internet connection.</p>";
    }
}

function loadQuestion() {
    if (questions.length === 0) return;
    document.getElementById("question").innerHTML = questions[currentQuestion].question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    questions[currentQuestion].options.forEach(option => {
        let button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    let correctAnswer = questions[currentQuestion].correctAnswer;
    if (selectedAnswer === correctAnswer) {
        document.getElementById("feedback").innerText = "Correct!";
        score++;
    } else {
        document.getElementById("feedback").innerText = "Wrong! Correct answer: " + correctAnswer;
    }
    document.getElementById("score").innerText = "Score: " + score + "/" + (currentQuestion + 1);
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        document.getElementById("quiz-container").innerHTML = "<h2>Quiz Completed!</h2><p>Final Score: " + score + "/" + questions.length + "</p>";
    }
}

window.onload = fetchQuestions;
