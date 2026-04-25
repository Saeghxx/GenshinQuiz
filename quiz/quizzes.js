document.addEventListener("DOMContentLoaded", () => {

    const app = document.getElementById('app');
    let quizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');

    document.getElementById('playButton').addEventListener('click', function () {
        const audio = document.getElementById('playAudio');
        if (audio.paused) audio.play();
        else audio.pause();
    });

    function showQuizList() {
        app.innerHTML = `
        <div>
            <div class="quiz-title"><h5>Available Quizzes</h5></div>
        </div>`;

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
                <div class="quiz-title">${quiz.title}</div>
                <div class="quiz-description">${quiz.description}</div>
            `;

            const btn = document.createElement('button');
            btn.textContent = 'Take Quiz';
            btn.addEventListener('click', () => showQuiz(quiz));

            item.appendChild(btn);
            listDiv.appendChild(item);
        });

        app.appendChild(listDiv);
    }

    function showQuiz(quiz) {
        app.innerHTML = `
            <div class="quiz-title">${quiz.title}</div>
            <div class="quiz-description">${quiz.description}</div>
        `;

        const quizContainer = document.createElement('div');
        quizContainer.id = 'quizContainer';
        app.appendChild(quizContainer);

        quiz.questions.forEach((q, i) => {
            const qDiv = document.createElement('div');
            qDiv.className = 'question';
            qDiv.innerHTML = `<h4>${i + 1}. ${q.text}</h4>`;

            q.options.forEach(opt => {
                const optDiv = document.createElement('div');
                optDiv.className = 'option';

                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `q${i}`;
                input.value = opt.id;
                input.style.display = "none";

                const label = document.createElement('label');
                label.textContent = opt.text;

                optDiv.appendChild(input);
                optDiv.appendChild(label);

                optDiv.addEventListener('click', () => {
                    qDiv.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
                    input.checked = true;
                    optDiv.classList.add('selected');
                });

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

            qDiv.querySelectorAll(".option").forEach(o => {
                o.classList.remove("correct", "wrong");
                o.classList.add("disabled");
            });

            const isCorrect =
                correctIds.length === selectedIds.length &&
                correctIds.every(id => selectedIds.includes(id));

            if (isCorrect) score++;

            q.options.forEach(opt => {
                const optDiv = [...qDiv.querySelectorAll(".option")]
                    .find(d => d.querySelector("input").value == opt.id);

                if (correctIds.includes(opt.id)) optDiv.classList.add("correct");
                else if (selectedIds.includes(opt.id)) optDiv.classList.add("wrong");
            });
        });

        let mark = "Your score: " + score + " out of " + quiz.questions.length;

        if (quiz.grades && quiz.grades.length > 0) {
            for (let g of quiz.grades) {
                if (score >= g.minScore) {
                    mark = g.markText;
                    break;
                }
            }
        }

        showModalResult(mark);

        document.querySelector('.back-btn').addEventListener('click', showQuizList);
    }

    function showModalResult(text) {
        const closeBtn = document.createElement("div");
        closeBtn.className = "close-btn";
        closeBtn.textContent = "✖";
        closeBtn.addEventListener("click", () => overlay.remove());

        const overlay = document.createElement("div");
        overlay.id = "modalOverlay";

        const modal = document.createElement("div");
        modal.className = "modal-box";

        modal.innerHTML = `<h2>Your Result</h2><p>${text}</p>`;
        modal.appendChild(closeBtn);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    showQuizList();

});