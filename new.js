const quizData = [
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS",
  },
  {
    question: "Which language runs in a browser?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does the DOM stand for in web development?",
    options: [
      "Document Object Model",
      "Data Output Method",
      "Dynamic Object Management",
      "Digital Order Map",
    ],
    answer: "Document Object Model",
  },
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");
const progressEl = document.getElementById("progress");

function loadQuestion() {
  const current = quizData[currentQuestion];
  const container = document.querySelector(".quiz-container");

  // Add a unique style for the final question
  if (currentQuestion === quizData.length - 1) {
    container.classList.add("final-question");
  } else {
    container.classList.remove("final-question");
  }

  questionEl.textContent = current.question;
  progressEl.textContent = `Question ${currentQuestion + 1} of ${
    quizData.length
  }`;
  optionsEl.innerHTML = "";

  current.options.forEach((option) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <label>
          <input type="radio" name="answer" value="${option}" />
          <span>${option}</span>
        </label>
      `;
    optionsEl.appendChild(li);
  });

  resultEl.textContent = "";
  resultEl.className = "";
}

function getSelected() {
  const radios = document.querySelectorAll('input[name="answer"]');
  for (const input of radios) {
    if (input.checked) return input.value;
  }
  return null;
}

submitBtn.addEventListener("click", () => {
  const selected = getSelected();
  if (!selected) {
    alert("Please select an answer before submitting.");
    return;
  }

  if (selected === quizData[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    // Quiz done — show score
    questionEl.remove();
    optionsEl.remove();
    submitBtn.remove();
    progressEl.remove();

    resultEl.textContent = `🎉 You scored ${score} out of ${quizData.length}!`;
    resultEl.className = score >= quizData.length / 2 ? "success" : "fail";
  }
});

loadQuestion();
