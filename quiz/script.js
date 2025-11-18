const container = document.getElementById("container");
const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

quizzes.forEach((quiz, quizIndex) => {
    const quizBlock = document.createElement("div");
    quizBlock.className = "quiz-block";

    const title = document.createElement("h2");
    title.innerText = quiz.title;
    quizBlock.appendChild(title);

    quiz.questions.forEach((question, qIndex) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "questionDiv";
        questionDiv.innerText = question.text;
        quizBlock.appendChild(questionDiv);

        question.options.forEach((option) => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "optionDiv";

            const input = document.createElement("input");
            input.type = "checkbox";
            input.name = `quiz-${quizIndex}-question-${qIndex}`;
            input.value = option.id;
            input.id = `quiz-${quizIndex}-question-${qIndex}-option-${option.id}`;

            const label = document.createElement("label");
            label.htmlFor = input.id;
            label.innerText = option.text;

            optionDiv.appendChild(input);
            optionDiv.appendChild(label);
            quizBlock.appendChild(optionDiv);
        });
    });

    const submitBtn = document.createElement("button");
    submitBtn.innerText = "Submit Quiz";
    submitBtn.addEventListener("click", () => {
        let summary = 0;

        quiz.questions.forEach((question, qIndex) => {
            const selectedOptionIds = Array.from(
                document.querySelectorAll(
                    `input[name="quiz-${quizIndex}-question-${qIndex}"]:checked`
                )
            ).map((el) => Number(el.value));

            const correctOptionIds = question.options
                .filter((o) => o.isCorrect)
                .map((o) => o.id);

            if (
                correctOptionIds.length === selectedOptionIds.length &&
                correctOptionIds.every((id) => selectedOptionIds.includes(id))
            ) {
                summary++;
            }
        });

        alert(`${quiz.title} - Your score: ${summary}/${quiz.questions.length}`);
    });

    quizBlock.appendChild(submitBtn);
    container.appendChild(quizBlock);
});

