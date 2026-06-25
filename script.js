const elements = [
  { name: "Hydrogen", symbol: "H" },
  { name: "Helium", symbol: "He" },
  { name: "Lithium", symbol: "Li" },
  { name: "Beryllium", symbol: "Be" },
  { name: "Boron", symbol: "B" },
  { name: "Carbon", symbol: "C" },
  { name: "Nitrogen", symbol: "N" },
  { name: "Oxygen", symbol: "O" },
  { name: "Fluorine", symbol: "F" },
  { name: "Neon", symbol: "Ne" },
  { name: "Sodium", symbol: "Na" },
  { name: "Magnesium", symbol: "Mg" },
  { name: "Aluminium", symbol: "Al" },
  { name: "Silicon", symbol: "Si" },
  { name: "Phosphorus", symbol: "P" },
  { name: "Sulfur", symbol: "S" },
  { name: "Chlorine", symbol: "Cl" },
  { name: "Potassium", symbol: "K" }
];

let score = 0;
let time = 60;
let timer = null;
let player = "";
let currentQuestion = null;
let correct = 0;
let wrong = 0;

const scoreEl = document.getElementById("score");
const highscoreEl = document.getElementById("highscore");
const timerEl = document.getElementById("timer");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");

let highscore = Number(localStorage.getItem("highscore")) || 0;
highscoreEl.textContent = "สูงสุด: " + highscore;

function beginGame() {
  player = document.getElementById("playerName").value.trim();

  if (player === "") {
    alert("กรุณากรอกชื่อก่อน");
    return;
  }

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  document.getElementById("resultScreen").style.display = "none";

  startGame();
}

function newQuestion() {
  currentQuestion =
    elements[Math.floor(Math.random() * elements.length)];

  questionEl.textContent =
    `สัญลักษณ์ของ ${currentQuestion.name} คืออะไร`;

  let choices = [currentQuestion.symbol];

  while (choices.length < 4) {
    let random =
      elements[Math.floor(Math.random() * elements.length)].symbol;

    if (!choices.includes(random)) {
      choices.push(random);
    }
  }

  choices.sort(() => Math.random() - 0.5);

  answersEl.innerHTML = "";

  choices.forEach(choice => {
    const btn = document.createElement("button");

    btn.className = "answer";
    btn.textContent = choice;

    btn.onclick = () => {

      if (choice === currentQuestion.symbol) {
        score++;
        correct++;

        scoreEl.textContent =
          "คะแนน: " + score;
      } else {
        wrong++;
      }

      newQuestion();
    };

    answersEl.appendChild(btn);
  });
}

function startGame() {

  clearInterval(timer);

  score = 0;
  time = 60;
  correct = 0;
  wrong = 0;

  scoreEl.textContent = "คะแนน: 0";
  timerEl.textContent = time;

  newQuestion();

  timer = setInterval(() => {

    time--;

    timerEl.textContent = time;

    if (time <= 0) {

      clearInterval(timer);

      if (score > highscore) {
        highscore = score;

        localStorage.setItem(
          "highscore",
          highscore
        );

        highscoreEl.textContent =
          "สูงสุด: " + highscore;
      }

      document.getElementById("gameScreen")
        .style.display = "none";

      document.getElementById("resultScreen")
        .style.display = "block";

      document.getElementById("playerResult")
        .innerText = player;

      document.getElementById("finalScore")
        .innerText = score;

      const ctx =
        document.getElementById("resultChart");

      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["ตอบถูก", "ตอบผิด"],
          datasets: [{
            data: [correct, wrong],
            backgroundColor: [
              "#22c55e",
              "#ef4444"
            ]
          }]
        }
      });

    }

  }, 1000);
}

document.getElementById("restart")
  .addEventListener("click", startGame);