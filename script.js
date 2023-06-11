// Variables for the game
let score = 100;
let secretNumber;
let isGameOver = false;
let timer;

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to start the timer
function startTimer(duration, display) {
  let timer = duration;
  let minutes, seconds;

  // Update the timer every second
  let interval = setInterval(function () {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;

    // Display the remaining time
    display.textContent = `Time: ${minutes}m ${seconds}s`;

    // Check if the timer reached 0
    if (--timer < 0) {
      // Stop the timer
      clearInterval(interval);
      // Set the game over flag
      isGameOver = true;
      // Display the game over message
      document.getElementById('message').textContent = 'Time is up! Game Over.';
      document.getElementById('message').classList.add('failure');
      // Disable the input and button
      document.getElementById('guessInput').disabled = true;
      document.getElementById('guessButton').disabled = true;
    }
  }, 1000);
}

// Function to start a new game
function newGame() {
  // Reset the variables
  score = 100;
  secretNumber = getRandomNumber(1, 100);
  isGameOver = false;

  // Update the UI
  document.getElementById('score').textContent = 'Score: ' + score;
  document.getElementById('message').textContent = 'Guess a number between 1 and 100.';
  document.getElementById('guessInput').disabled = false;
  document.getElementById('guessButton').disabled = false;

  // Start the timer with the desired time limit (in seconds)
  startTimer(60, document.getElementById('timer'));
}

// Function to check the guess
function checkGuess() {
  if (isGameOver) {
    return;
  }

  // Get the user's guess
  const guess = parseInt(document.getElementById('guessInput').value);

  // Check if the guess is correct
  if (guess === secretNumber) {
    // Update the UI
    document.getElementById('message').textContent = 'Congratulations! You guessed the correct number.';
    document.getElementById('message').classList.add('success');
    document.getElementById('score').textContent = 'Score: ' + score;
    isGameOver = true;
    // Disable the input and button
    document.getElementById('guessInput').disabled = true;
    document.getElementById('guessButton').disabled = true;
  } 
  else {
    // Update the score
    score -= 10; // Decrease the score by 10 for each incorrect guess
  
    // Determine if the secret number is a multiple of any digit
    let digits = [2, 3, 4, 5, 6, 7, 8, 9]; // List of digits to check for multiples
    let multiples = digits.filter((digit) => secretNumber % digit === 0);
  
    // Generate a hint message
    let hint = "The secret number is not a multiple of any digit.";
  
    if (multiples.length > 0) {
      hint = `The secret number is a multiple of ${multiples.join(", ")}.`;
    }
  
    // Check if the score is zero
    if (score <= 0) {
      // Update the UI
      document.getElementById("message").textContent = "Game Over! The correct number was " + secretNumber + ".";
      document.getElementById("message").classList.add("failure");
      document.getElementById("score").textContent = "Score: " + score;
      isGameOver = true;
      // Disable the input and button
      document.getElementById("guessInput").disabled = true;
      document.getElementById("guessButton").disabled = true;
    } else {
      // Update the UI
      document.getElementById("message").textContent = guess > secretNumber ? "Too high! " + hint + " Try again." : "Too low! " + hint + " Try again.";
      document.getElementById("score").textContent = "Score: " + score;
    }
  }
  
  
}

// Event listener for the "Guess" button click
document.getElementById('guessButton').addEventListener('click', checkGuess);

// Start a new game initially
newGame();
