// tabs

class Tabs {
    constructor(container) {
        this.container = container;
        this.tabs = container.querySelectorAll('.trigger');        
    }
    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', e => {
                this.toggleTabs(e);
                this.toggleContent(e);
            })
        })
    }
    toggleTabs(e) {
        // remove current active classes
        this.tabs.forEach(tab => tab.classList.remove('active'));
        // add new active class to clicked tab
        e.target.classList.add('active');
    }
    toggleContent(e) {
        // remove current active classes
        this.container.querySelectorAll('.content').forEach(item => {
            item.classList.remove('active');
        });
        // add new active class to content
        const selector = e.target.getAttribute('data-target');
        const content = this.container.querySelector(selector);
        content.classList.add('active');

    }
}

// create tabs
const tabs = new Tabs(document.querySelector('.tabs'));
tabs.init();




// guessing game
document.addEventListener('DOMContentLoaded', function () {
    const guessForm = document.getElementById('guessForm');
    const userGuessInput = document.getElementById('userGuess');
    const previousGuesses = document.getElementById('previousGuesses');
    const resultText = document.getElementById('resultText');
    const newGameButton = document.getElementById('newGameButton');

    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let guesses = 0;
    let gameOver = false;


    function playVideo() {
        window.location.href = "../fnafvid.html";
    }
    guessForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (gameOver) return;
    
        let userGuess = parseInt(userGuessInput.value);
    
        if (userGuess === randomNumber) {
            displayResult('Congratulations! You got it right!', 'justRight');
            endGame();
            showNewGameButton(); // Show the button when the user wins
        } else {
            guesses++;
            if (guesses === 10) {
                displayResult('Too many attempts, GAME OVER!!!', 'tooMany');
                endGame();
                // Play fnafvid video when the player loses
                playVideo();
                showNewGameButton(); // Show the button when the user loses
            } else if (userGuess < randomNumber) {
                displayResult('Wrong, that guess was too small', 'tooSmall');
            } else {
                displayResult('Wrong, that guess was too big', 'tooBig');
            }
            displayPreviousGuess(userGuess);
        }
        userGuessInput.value = '';
    });
    
    function displayResult(message, className) {
        resultText.textContent = message;
        resultText.className = className;
    }

    function endGame() {
        guessForm.querySelector('input[type="text"]').disabled = true;
        gameOver = true;
    }

    function displayPreviousGuess(guess) {
        previousGuesses.textContent += `${guess} `;
    }

    function showNewGameButton() {
        newGameButton.style.display = 'block';
    }

    newGameButton.addEventListener('click', function () {
        resetGame();
    });

    function resetGame() {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        guesses = 0;
        gameOver = false;
        userGuessInput.value = '';
        previousGuesses.textContent = 'Previous guesses:';
        resultText.textContent = '';
        guessForm.querySelector('input[type="text"]').disabled = false;
        newGameButton.style.display = 'none';
    }

    // Initially hide the "Start New Game" button
    newGameButton.style.display = 'none';
});



// Coin Flip
let wins = 0;
let losses = 0;
let headsCount = 0;
let tailsCount = 0;

function playVideo() {
    window.location.href = "../fnafvid.html";
}

function tossCoin(choice) {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    let outcome;
    let imagePath;

    // Increment the respective flip count
    if (result === 'Heads') {
        headsCount++;
    } else {
        tailsCount++;
    }

    // Check if either side has reached 10 flips
    if (headsCount === 10 || tailsCount === 10) {
        // Disable the buttons for further flips
        document.getElementById('headsButton').disabled = true;
        document.getElementById('tailsButton').disabled = true;
        
        // Determine the winner based on the number of flips
        if (headsCount === 10) {
            outcome = "Heads wins!";
            imagePath = '../img/heads.jpg';
            playVideo();
        } else {
            outcome = "Tails wins!";
            imagePath = '../img/tails.jpg';
            playVideo();
        }
        
        // Display the win or lose message
        displayResult(outcome, 'winMessage');
    } else {
        // Update the button text with the current count of flips
        document.getElementById('headsButton').textContent = `Heads (${headsCount}/10)`;
        document.getElementById('tailsButton').textContent = `Tails (${tailsCount}/10)`;
        
        // Check if the user's guess matches the result
        if (choice === result) {
            wins++;
            outcome = "You chose wisely!";
            imagePath = choice.toLowerCase() + '.jpg'; // Set the image path based on the choice
        } else {
            losses++;
            outcome = "Sorry, wrong choice";
            imagePath = result.toLowerCase() + '.jpg'; // Set the image path based on the result
        }

        // Update the coin image and result display
        document.getElementById('coinImage').src = '../img/' + imagePath; // Set the src attribute of the coinImage element
        document.getElementById('coinTossResult').innerHTML = `
            <p>You chose ${choice}.</p>
            <p>The toss is ${result}.</p>
            <p>${outcome}</p>
            <p>Wins = ${wins} Losses = ${losses}</p>
        `;
    }
}

function displayResult(message, className) {
    // Create a new paragraph element
    const paragraph = document.createElement('p');
    // Set the text content
    paragraph.textContent = message;
    // Add a class to the paragraph element
    paragraph.classList.add(className);
    // Append the paragraph element to the coinTossResult container
    document.getElementById('coinTossResult').appendChild(paragraph);
}
