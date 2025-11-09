// Отримуємо елементи
const questionsContainer = document.getElementById("questionsContainer");
const gradingContainer = document.getElementById("gradingContainer");
const addQuestionBtn = document.getElementById("addQuestionBtn");
const addGradeBtn = document.getElementById("addGradeBtn");
const saveQuizBtn = document.getElementById("saveQuizBtn");

// Додаємо слухачі подій
addQuestionBtn.addEventListener("click", addQuestion);
addGradeBtn.addEventListener("click", addGrade);
saveQuizBtn.addEventListener("click", saveQuiz);

// --- Add Question ---
function addQuestion() {
    // ... ваш код функції addQuestion ...
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    
    // ... решта коду ...
    questionDiv.innerHTML = `
        <label>Question:</label><br>
        <input type="text" class="questionText" placeholder="Enter question text">
        <button class="remove-question">Remove</button>
        <div class="choices"></div>
        <button class="small-btn addChoiceBtn">+ Add Choice</button>
    `;

    questionsContainer.appendChild(questionDiv);

    const addChoiceBtn = questionDiv.querySelector(".addChoiceBtn");
    addChoiceBtn.addEventListener("click", () => addChoice(questionDiv));

    const removeBtn = questionDiv.querySelector(".remove-question");
    removeBtn.addEventListener("click", () => questionDiv.remove());
}

// --- Add Choice ---
function addChoice(questionDiv) {
    // ... ваш код функції addChoice ...
    const choicesDiv = questionDiv.querySelector(".choices");
    const choiceDiv = document.createElement("div");
    choiceDiv.classList.add("choice");

    // ... решта коду ...
    choiceDiv.innerHTML = `
        <input type="text" placeholder="Choice text">
        <button class="mark-btn">Mark Correct</button>
        <button class="remove-choice">Remove</button>
    `;

    const markBtn = choiceDiv.querySelector(".mark-btn");
    const removeChoiceBtn = choiceDiv.querySelector(".remove-choice");

    markBtn.addEventListener("click", () => {
        questionDiv.querySelectorAll(".mark-btn").forEach(btn => btn.classList.remove("correct"));
        markBtn.classList.add("correct");
    });

    removeChoiceBtn.addEventListener("click", () => choiceDiv.remove());
    choicesDiv.appendChild(choiceDiv);
}

// --- Add Grade ---
function addGrade() {
    // ... ваш код функції addGrade ...
    const gradeDiv = document.createElement("div");
    gradeDiv.classList.add("grade-item");

    // ... решта коду ...
    gradeDiv.innerHTML = `
        <label>Score ≥</label>
        <input type="number" min="0" placeholder="">
        <label>Mark:</label>
        <input type="text" placeholder="">
        <button class="remove-grade">Remove</button>
    `;

    const removeGradeBtn = gradeDiv.querySelector(".remove-grade");
    removeGradeBtn.addEventListener("click", () => gradeDiv.remove());
    gradingContainer.appendChild(gradeDiv);
}

// --- Save Quiz ---
function saveQuiz() {
    // ... ваш код функції saveQuiz, включаючи збереження у localStorage ...
    const title = document.getElementById("quizTitle").value.trim();
    const description = document.getElementById("quizDescription").value.trim();

    const quiz = { title, description, questions: [], grading: [] };

    document.querySelectorAll(".question").forEach(qDiv => {
        const questionText = qDiv.querySelector(".questionText").value.trim();
        const choices = [];

        qDiv.querySelectorAll(".choice").forEach(cDiv => {
            const text = cDiv.querySelector("input[type='text']").value.trim();
            const isCorrect = cDiv.querySelector(".mark-btn").classList.contains("correct");
            if (text) choices.push({ text, isCorrect });
        });

        if (questionText && choices.length > 0) quiz.questions.push({ questionText, choices });
    });

    gradingContainer.querySelectorAll(".grade-item").forEach(gDiv => {
        const minScore = Number(gDiv.querySelector("input[type='number']").value);
        const mark = gDiv.querySelector("input[type='text']").value.trim();
        if (!isNaN(minScore) && mark) quiz.grading.push({ minScore, mark });
    });

    quiz.grading.sort((a, b) => b.minScore - a.minScore);

    if (quiz.questions.length > 0 && title) {
        // Зберігаємо тест у LocalStorage
        const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
        quizzes.push(quiz);
        localStorage.setItem("quizzes", JSON.stringify(quizzes));
        
        // Перенаправляємо користувача
        window.location.href = "../quizzes.html"; 
    } else {
        alert("Будь ласка, введіть назву та додайте хоча б одне питання.");
    }
}