let currentNumber = 0; // The current number in the sequence
let score = 0; // The player's score

let delay = 2000; // 2 seconds delay before showing the number

// Start a new game
function startGame() {
    currentNumber = Math.floor(Math.random() * 4) + 1; // Start with a random number
    score = 0; // Reset score
    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("gameOverMessage").textContent = "";
    document.getElementById("restartButton").style.display = "none";
    displayCurrentNumber();
}

// Display the current number in the sequence
function displayCurrentNumber() {
    let sequenceDisplay = document.getElementById("sequenceDisplay");
    let color;
    
    switch (currentNumber) {
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

    // Show the current number
    sequenceDisplay.innerHTML = `<span style="color: ${color}; font-size: 50px;">${currentNumber}</span>`;

    // Ask the user for input
    askUserForInput();
}

// Prompt the user to input the next number
function askUserForInput() {
    let inputField = document.getElementById("userInput");
    inputField.disabled = false;
    inputField.value = ''; // Clear the previous input
    inputField.focus();

    // Listen for the user's input
    inputField.addEventListener("input", checkUserInput);
}

// Check the user's input and compare it to the current number
function checkUserInput() {
    let userInput = document.getElementById("userInput").value;

    if (userInput === "") return; // Do nothing if the input is empty

    // Check if the user's input matches the current number
    if (parseInt(userInput) === currentNumber) {
        // Correct input, increase score and move to the next round
        score++;
        document.getElementById("score").textContent = `Score: ${score}`;

        // Set the new number for the next round
        currentNumber = Math.floor(Math.random() * 4) + 1;

        // Wait for a moment before displaying the next number
        setTimeout(displayCurrentNumber, 1000);
    } else {
        endGame(); // End the game if the input is incorrect
    }
}

// End the game and show the result
function endGame() {
    document.getElementById("gameOverMessage").textContent = `Game Over! You scored ${score} points.`;
    document.getElementById("restartButton").style.display = "block";
    document.getElementById("userInput").disabled = true;
}

// Initialize the game once the page is loaded
window.onload = function () {
    startGame();
};

