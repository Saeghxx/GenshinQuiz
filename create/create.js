document.addEventListener("DOMContentLoaded", () => {

    const questionsContainer = document.getElementById("questionsContainer");
    const gradingContainer = document.getElementById("gradingContainer");
    const addQuestionBtn = document.getElementById("addQuestionBtn");
    const addGradeBtn = document.getElementById("addGradeBtn");
    const saveQuizBtn = document.getElementById("saveQuizBtn");

    addQuestionBtn.addEventListener("click", addQuestion);
    addGradeBtn.addEventListener("click", addGrade);
    saveQuizBtn.addEventListener("click", saveQuiz);

    document.getElementById('playButton').addEventListener('click', function () {
        const audio = document.getElementById('playAudio');
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    function addQuestion() {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

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

        questionDiv.querySelector(".remove-question").addEventListener("click", () => {
            questionDiv.remove();
        });
    }

    function addChoice(questionDiv) {
        const choicesDiv = questionDiv.querySelector(".choices");

        const choiceDiv = document.createElement("div");
        choiceDiv.classList.add("choice");

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

        removeChoiceBtn.addEventListener("click", () => {
            choiceDiv.remove();
        });

        choicesDiv.appendChild(choiceDiv);
    }

    function addGrade() {
        const gradeDiv = document.createElement("div");
        gradeDiv.classList.add("grade-item");

        gradeDiv.innerHTML = `
            <label>Score ≥</label>
            <input type="number" min="0">
            <label>Mark:</label>
            <input type="text">
            <button class="remove-grade">Remove</button>
        `;

        gradeDiv.querySelector(".remove-grade").addEventListener("click", () => {
            gradeDiv.remove();
        });

        gradingContainer.appendChild(gradeDiv);
    }

    function saveQuiz() {
        const title = document.getElementById("quizTitle").value.trim();
        const description = document.getElementById("quizDescription").value.trim();

        if (!title) {
            alert("Please enter a quiz title.");
            return;
        }

        const quiz = {
            title,
            description,
            questions: []
        };

        quiz.grades = [];

        document.querySelectorAll(".grade-item").forEach(g => {
            const minScore = parseInt(g.querySelector("input[type='number']").value);
            const markText = g.querySelector("input[type='text']").value.trim();

            if (!isNaN(minScore) && markText) {
                quiz.grades.push({ minScore, markText });
            }
        });

        quiz.grades.sort((a, b) => b.minScore - a.minScore);

        document.querySelectorAll(".question").forEach(qDiv => {
            const text = qDiv.querySelector(".questionText").value.trim();
            if (!text) return;

            let question = {
                text,
                type: "single",
                options: []
            };

            let optionId = 1;

            qDiv.querySelectorAll(".choice").forEach(cDiv => {
                const choiceText = cDiv.querySelector("input[type='text']").value.trim();
                const isCorrect = cDiv.querySelector(".mark-btn").classList.contains("correct");

                if (!choiceText) return;

                question.options.push({
                    id: optionId++,
                    text: choiceText,
                    correct: isCorrect
                });
            });

            if (question.options.length > 0) {
                quiz.questions.push(question);
            }
        });

        if (quiz.questions.length === 0) {
            alert("Add at least one question and one choice.");
            return;
        }

        const quizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
        quizzes.push(quiz);
        localStorage.setItem("quizzes", JSON.stringify(quizzes));

        window.location.href = "../quiz/quizzes.html";
    }

});