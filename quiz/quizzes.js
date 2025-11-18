// quizzes.js
const app = document.getElementById('app');
let quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');

function showQuizList() {
    app.innerHTML = '<h3>Available Quizzes</h3>';

    if (!quizzes.length) {
        app.innerHTML += '<p>No quizzes found. Create some first.</p>';
        return;
    }

    const listDiv = document.createElement('div');
    listDiv.className = 'quiz-list';

    quizzes.forEach((quiz) => {
        const item = document.createElement('div');
        item.className = 'quiz-item';

        item.innerHTML = `
            <h3>${quiz.title}</h3>
            <p>${quiz.description}</p>
        `;

        const btn = document.createElement('button');
        btn.textContent = 'Take Quiz';
        // тут відкриваємо конкретний тест після кліку
        btn.addEventListener('click', () => showQuiz(quiz));

        item.appendChild(btn);
        listDiv.appendChild(item);
    });

    app.appendChild(listDiv);
}

function showQuiz(quiz) {
    app.innerHTML = `
        <h2>${quiz.title}</h2>
        <p>${quiz.description}</p>
    `;

    const quizContainer = document.createElement('div');
    quizContainer.id = 'quizContainer';
    app.appendChild(quizContainer);

    quiz.questions.forEach((q, i) => {
        const qDiv = document.createElement('div');
        qDiv.className = 'question';

        qDiv.innerHTML = `<h4>${i + 1}. ${q.text}</h4>`;

        q.options.forEach((opt) => {
            const optDiv = document.createElement('div');
            optDiv.className = 'option';

            const input = document.createElement('input');
            input.type = q.type === "multiple" ? "checkbox" : "radio";
            input.name = `q${i}`;
            input.value = opt.id;

            const label = document.createElement('label');
            label.textContent = opt.text;

            optDiv.appendChild(input);
            optDiv.appendChild(label);
            qDiv.appendChild(optDiv);
        });

        quizContainer.appendChild(qDiv);
    });

    const submitBtn = document.createElement('button');
    submitBtn.textContent = "Submit";
    submitBtn.className = "submit-btn";
    submitBtn.addEventListener('click', () => submitQuiz(quiz));

    const backBtn = document.createElement('button');
    backBtn.textContent = "Back";
    backBtn.className = "back-btn";
    backBtn.addEventListener('click', showQuizList);

    app.appendChild(submitBtn);
    app.appendChild(backBtn);
}

function submitQuiz(quiz) {
    const quizContainer = document.getElementById("quizContainer");
    let score = 0;

    quiz.questions.forEach((q, index) => {
        const correctIds = q.options.filter(o => o.correct || o.isCorrect).map(o => o.id);
        const selectedInputs = [...document.querySelectorAll(`input[name="q${index}"]:checked`)];
        const selectedIds = selectedInputs.map(inp => parseInt(inp.value));

        const qDiv = quizContainer.children[index];

        // очищення стилів
        qDiv.querySelectorAll(".option").forEach(o => o.classList.remove("correct", "wrong"));

        const isCorrect =
            correctIds.length === selectedIds.length &&
            correctIds.every(id => selectedIds.includes(id));

        if (isCorrect) score++;

        // підсвітка
        q.options.forEach((opt) => {
            const optDiv = [...qDiv.querySelectorAll(".option")]
                .find(d => d.querySelector("input").value == opt.id);

            if (correctIds.includes(opt.id)) optDiv.classList.add("correct");
            else if (selectedIds.includes(opt.id)) optDiv.classList.add("wrong");
        });
    });

    const resultDiv = document.createElement("div");
    resultDiv.className = "result-box";
    resultDiv.innerHTML = `
        <h3>Your Result:</h3>
        <p>${score} / ${quiz.questions.length}</p>
    `;

    app.appendChild(resultDiv);
}

// запуск
showQuizList();
