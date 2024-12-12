// Select elements
const p1Display = document.querySelector("#p1-display");
const p2Display = document.querySelector("#p2-display");
const gameInfo = document.querySelector(".info");
const p1Button = document.querySelector(".p1btn");
const p2Button = document.querySelector(".p2btn");
const resetButton = document.querySelector(".reset-btn");
const selectScore = document.querySelector("#select-score");
const hint = document.querySelector(".hint");
const hintInfo = document.querySelector(".hint-info");
const container = document.querySelector(".container");

// Variables
let pageUrl = window.location.href;
let selectedScore = 0;
let p1Score = 0;
let p2Score = 0;

// Functions
const updateGameInfo = (message, player = '') => {
  gameInfo.innerHTML = message;
  if (player) {
    p1Button.disabled = true;
    p2Button.disabled = true;
    if (player === "p1") p1Display.classList.add("green");
    if (player === "p2") p2Display.classList.add("green");
    p1Display.classList.add("red");
    p2Display.classList.add("red");
  }
};

const resetGame = () => {
  gameInfo.innerHTML = `<br>Resetting...<br>`;
  setTimeout(() => {
    gameInfo.innerHTML = `Wait<br>A<br>Second!!!`;
    setTimeout(() => {
      window.location.href = pageUrl;
    }, 1000);
  }, 1000);
};

// Event Listeners
selectScore.addEventListener("change", () => {
  selectedScore = parseInt(selectScore.value);
  selectScore.disabled = true;
  resetButton.textContent = "Reset";
  gameInfo.innerHTML = `Winning score is<br>${selectedScore}`;

  // Handle score increments for both players
  p1Button.addEventListener("click", () => {
    if (p1Score < selectedScore) {
      p1Score++;
      p1Display.textContent = p1Score;
      if (p1Score === selectedScore) {
        updateGameInfo(`Player<br>1<br>Win!!!`, 'p1');
      }
    }
  });

  p2Button.addEventListener("click", () => {
    if (p2Score < selectedScore) {
      p2Score++;
      p2Display.textContent = p2Score;
      if (p2Score === selectedScore) {
        updateGameInfo(`Player<br>2<br>Win!!!`, 'p2');
      }
    }
  });
});

resetButton.addEventListener("click", resetGame);

// Hint Info Interaction
hint.addEventListener("click", (evt) => {
  evt.stopPropagation();
  hint.classList.add("hint-hover");
  hintInfo.style.display = "block";
  hintInfo.style.animation = "rollin 250ms ease-in 50ms 1 normal none";
  setTimeout(() => hintInfo.style.opacity = 1, 250);
  hintInfo.style.bottom = "16px";
  hintInfo.style.right = "16px";
});

container.addEventListener("click", () => {
  hintInfo.style.animation = "rollout 250ms ease-in 50ms 1 normal none";
  setTimeout(() => {
    hint.classList.remove("hint-hover");
    hintInfo.style.display = "none";
    hintInfo.style.bottom = 0;
    hintInfo.style.right = 0;
    hintInfo.style.opacity = 0;
  }, 250);
});
