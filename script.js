const contentList = [
  "Type now what I am saying to you now....",
  "Practice makes a man perfect and consistent effort leads to success.",
  "JavaScript is a versatile and widely-used programming language.",
  "Stay focused, keep typing, and improve your speed every day!",
  "Learning to code is like learning a new language with logic."
];

let content = ""; // will be set from list
let typecontent = document.getElementById("typecontent");
let timer = document.getElementById("timer");
let wpm = document.getElementById("wpm");
let errors = document.getElementById("errors");

let startTime = null;
let interval = null;
let isTypingStarted = false;
let errorCount = 0;

function setRandomContent() {
  content = contentList[Math.floor(Math.random() * contentList.length)];
  document.querySelector(".content").textContent = content;
}

function startTimer() {
  startTime = Date.now();
  interval = setInterval(() => {
    let seconds = Math.floor((Date.now() - startTime) / 1000);
    timer.textContent = seconds + "s";
  }, 1000);
}

function updateDisplayedContent(input) {
  let resultHTML = "";
  errorCount = 0;

  for (let i = 0; i < content.length; i++) {
    if (i < input.length) {
      if (input[i] === content[i]) {
        resultHTML += `<span class="correct">${content[i]}</span>`;
      } else {
        resultHTML += `<span class="incorrect">${content[i]}</span>`;
        errorCount++;
      }
    } else {
      resultHTML += content[i];
    }
  }

  document.querySelector(".content").innerHTML = resultHTML;
  errors.textContent = errorCount;
}

function calculateWPM(input) {
  let elapsedMinutes = (Date.now() - startTime) / 60000;
  let wordCount = input.trim().split(" ").filter(w => w !== "").length;
  let wpmResult = Math.round(wordCount / elapsedMinutes);
  wpm.textContent = isNaN(wpmResult) ? 0 : wpmResult;
}

typecontent.addEventListener("input", function () {
  let typedText = typecontent.value;

  if (!isTypingStarted) {
    isTypingStarted = true;
    startTimer();
  }

  updateDisplayedContent(typedText);
  calculateWPM(typedText);

  if (typedText === content) {
    clearInterval(interval);
    alert("Typing Completed!");
  }
});

function resetTest() {
  clearInterval(interval);
  typecontent.value = "";
  timer.textContent = "0s";
  wpm.textContent = "0";
  errors.textContent = "0";
  isTypingStarted = false;
  errorCount = 0;
  setRandomContent(); // choose new content
}

// Initialize on load
setRandomContent();
