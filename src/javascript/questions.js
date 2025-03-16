const NUMBEROFQUESTIONS = 10;
const NUMBEROFMONSTERS = 6;

// Help function
function getRandomInteger(min, max) { // including min and max
    return Math.round((Math.random() * (max - min)) + min);
}

// Get questions
fetch("../questions/questions.csv")
    .then((response) => response.text())
    .then((text) => preprocessQuestions(text))
    .then((questions) => selectQuestions(questions))
    .then((selectedQuestions) => activateQuestionButtons(selectedQuestions))
    .catch((error) =>
        console.error("Error fetching the CSV file:", error),
    );

function preprocessQuestions(text) {
    return text.split('\n').slice(1);
}

function selectQuestions(questions) {
    let selectedQuestions = [];
    while (selectedQuestions.length < NUMBEROFQUESTIONS) {
        const randomQuestionIndex = getRandomInteger(0, questions.length - 1);
        selectedQuestions.push(questions[randomQuestionIndex]);
    }
    return selectedQuestions;
}

// DOM stuff
let numberOfRightAnswers = 0;
function activateQuestionButtons(questions) {
    const questionButtons = document.getElementsByClassName("questions");
     // For each question...
     for (let i = 0; i < NUMBEROFQUESTIONS; i++) {
        const questionButton = questionButtons[i];
        const question = questions[i].split(',').filter(question => question.trim() !== "");

         // Activate the corresponding question button
         questionButton.addEventListener("click", e => {
            // Make question modal appear
            const questionModal = document.getElementById("question-modal");
            questionModal.style.display = "flex";

            // Create modal components
            createModalComponents(question, i);

            // Remove all question buttons from screen
            for (let i = 0; i < NUMBEROFQUESTIONS; i++) {
                const questionButton = questionButtons[i];
                questionButton.style.display = "none";
            }
         }, { "once": true })
     }
}

function createModalComponents(question, questionIndex) {
    const questionModal = document.getElementById("question-modal");
    questionModal.innerHTML = "";

    // Add question header to question modal
    const questionHeaderElement = document.createElement("h5");
    questionHeaderElement.setAttribute("id", "question-header");
    questionHeaderElement.textContent = `Question (${questionIndex+1}/${NUMBEROFQUESTIONS})`;
    questionModal.appendChild(questionHeaderElement);

    // Add image of a monster to question modal
    const monsterElement = document.createElement("img");
    const randomMonsterNumber = getRandomInteger(1, NUMBEROFMONSTERS);
    monsterElement.setAttribute("id", "question-monster");
    monsterElement.setAttribute("src", `/assets/monster-${randomMonsterNumber}.svg`);
    monsterElement.setAttribute("alt", `monster ${randomMonsterNumber}`);
    questionModal.appendChild(monsterElement);

    // create question box
    const questionBoxElement = document.createElement("div");
    questionBoxElement.setAttribute("id", "question-box");
    questionModal.appendChild(questionBoxElement);

    // Add question to question modal
    const questionElement = document.createElement("h5");
    questionElement.setAttribute("id", "question");
    questionElement.textContent = question[0];
    questionBoxElement.appendChild(questionElement);

    // Add wrong and right answers to question modal
    // question[1] is always the right answer
    const randomRightAnswer = getRandomInteger(1, question.length - 1);
    let currentWrongAnswerIndex = 2;
    for (let i = 1; i <= question.length - 1; i++) {
        const answerButton = document.createElement("button");
        answerButton.setAttribute("id", `answer-${i}`);
        answerButton.setAttribute("class", "answers");
        if (i == randomRightAnswer) {
            answerButton.textContent = question[1];
        } else {
            answerButton.textContent = question[currentWrongAnswerIndex];
            currentWrongAnswerIndex++;
        }
        questionBoxElement.appendChild(answerButton);

        // Initialize right and wrong answer buttons
        answerButton.addEventListener("click", () => {
            // Add all question buttons back to screen
            const questionButtons = document.getElementsByClassName("questions");
            for (let j = 0; j < NUMBEROFQUESTIONS; j++) {
                const questionButton = questionButtons[j];
                questionButton.style.display = "block";      
            }

            // Determine if answer is correct
            if (i == randomRightAnswer) {
                questionButtons[questionIndex].classList.add("correct-questions");
                numberOfRightAnswers += 1;
            } else {
                questionButtons[questionIndex].classList.add("incorrect-questions");
            }
            questionModal.style.display = "none";
        });
    }
}