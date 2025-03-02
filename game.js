let gameSequence = [];
let userSequence = [];
let rounds = 4;
let delay = 3000; // 2 seconds delay between numbers

// Start a new game
function startGame() {
    gameSequence = [];
    userSequence = [];
    rounds = 0;
    document.getElementById("gameOverMessage").textContent = "";
    document.getElementById("restartButton").style.display = "none";
    nextRound();
}

// Generate the next number in the sequence
function generateSequence() {
    let num = Math.floor(Math.random() * 4) + 1; // Generate random number between 1 and 4
    gameSequence.push(num);
}

// Display the current sequence for the user
function displaySequence() {
    let sequenceDisplay = document.getElementById("sequenceDisplay");
    sequenceDisplay.innerHTML = ''; // Clear the previous sequence
    let index = 0;

    let interval = setInterval(function () {
        let number = gameSequence[index];
        let color;
        switch (number) {
            case 1:
                color = "red";
                break;
            case 2:
                color = "green";
                break;
            case 3:
                color = "yellow";
                break;
            case 4:
                color = "blue";
                break;
        }

        sequenceDisplay.innerHTML = `<span style="color: ${color}; font-size: 50px;">${number}</span>`;
        index++;

        if (index >= gameSequence.length) {
            clearInterval(interval);
            askUserForInput();
        }
    }, delay);
}

// Prompt the user to input the next number in the sequence
function askUserForInput() {
    let inputField = document.getElementById("userInput");
    inputField.disabled = false;
    inputField.value = ''; // Clear the previous input

    inputField.focus();
    userSequence = []; // Reset the user's sequence at the start of each round
    inputField.addEventListener("input", checkUserInput);
}

// Check the user's input and compare with the game sequence
function checkUserInput() {
    let userInput = document.getElementById("userInput").value;

    if (userInput === "") return; // Do nothing if the input is empty

    let currentRoundNumber = userSequence.length + 1;

    if (parseInt(userInput) === gameSequence[userSequence.length]) {
        userSequence.push(parseInt(userInput));

        // If the user has correctly input the entire sequence
        if (userSequence.length === gameSequence.length) {
            rounds++;
            generateSequence(); // Add a new number to the sequence
            setTimeout(displaySequence, 1000); // Wait a moment before showing the next sequence
        }
    } else {
        endGame();
    }
}

// End the game and show the result
function endGame() {
    document.getElementById("gameOverMessage").textContent = `Game Over! You completed ${rounds} rounds.`;
    document.getElementById("restartButton").style.display = "block";
    document.getElementById("userInput").disabled = true;
}

// Start the first round of the game
function nextRound() {
    generateSequence();
    displaySequence();
}

// Initialize the game once the page is loaded
window.onload = function () {
    startGame();
};


