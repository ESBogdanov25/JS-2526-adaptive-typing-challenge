const textDisplay = document.getElementById('text-display');
const inputBox = document.getElementById('input-box');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const difficultyIndicator = document.getElementById('difficulty-indicator');
const restartBtn = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress-bar');

const easyTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is fun when you practice every day.",
  "JavaScript makes websites interactive."
];

const mediumTexts = [
  "Adaptive challenges push your skills further with every keystroke.",
  "Complex sentences require focus and accurate typing to succeed.",
  "Practice daily to improve both speed and precision."
];

const hardTexts = [
  "Consistency in typing builds both muscle memory and cognitive reflexes.",
  "Intricate words, unusual punctuation, and tricky spacing test your agility.",
  "High difficulty challenges enhance both speed and accuracy exponentially."
];

let currentText = "";
let startTime, typedChars = 0, correctChars = 0;
let difficulty = "Easy";

function pickText() 
{
    let array;

    if (difficulty === "Easy") array = easyTexts;
    else if (difficulty === "Medium") array = mediumTexts;
    else array = hardTexts;

    return array[Math.floor(Math.random() * array.length)];
}

function startTest() {
    currentText = pickText();
    typedChars = 0;
    correctChars = 0;
    startTime = new Date();

    inputBox.value = "";
    textDisplay.innerHTML = currentText.split('').map(c => `<span>${c}</span>`).join('');
    wpmDisplay.textContent = "WPM: 0";
    accuracyDisplay.textContent = "Accuracy: 0%";
    difficultyIndicator.textContent = `Difficulty: ${difficulty}`;
    progressBar.style.width = "0%";
}

function createConfetti() {
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) 
    {
        const confetti = document.createElement('div');
        
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`;
        confetti.style.animationDuration = 2 + Math.random() * 3 + 's';

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

inputBox.addEventListener('input', () => 
{
    typedChars = inputBox.value.length;
    correctChars = 0;

    let displayHTML = "";

    for (let i = 0; i < currentText.length; i++) 
    {
        if (i < typedChars) 
            {
            if (inputBox.value[i] === currentText[i]) 
            {
                displayHTML += `<span class="correct">${currentText[i]}</span>`;
                correctChars++;
            } 
            else displayHTML += `<span class="incorrect">${currentText[i]}</span>`;
        } 
        else displayHTML += `<span>${currentText[i]}</span>`;
    }

    textDisplay.innerHTML = displayHTML;

    const timeElapsed = (new Date() - startTime) / 60000;
    const wpm = ((typedChars / 5) / timeElapsed).toFixed(1);
    const accuracy = ((correctChars / typedChars) * 100 || 0).toFixed(1);

    wpmDisplay.textContent = `WPM: ${wpm}`;
    accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;

    adjustDifficulty(wpm);

    const progress = Math.min((typedChars / currentText.length) * 100, 100);
    progressBar.style.width = progress + "%";

    if (wpm > 80) createConfetti();
});

function adjustDifficulty(wpm) 
{
    if (wpm > 60) difficulty = "Hard";
    else if (wpm > 30) difficulty = "Medium";
    else difficulty = "Easy";

    difficultyIndicator.textContent = `Difficulty: ${difficulty}`;

    const container = document.querySelector('.container');
    
    if (difficulty === "Easy") container.style.background = 'rgba(0,128,0,0.5)';
    else if (difficulty === "Medium") container.style.background = 'rgba(255,215,0,0.5)';
    else container.style.background = 'rgba(255,0,0,0.5)';
}

restartBtn.addEventListener('click', startTest);

startTest();