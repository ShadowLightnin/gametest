// Hide the jump scare button and image initially
document.getElementById('jumpScareButton').style.display = 'none';
document.getElementById('jumpScareImage').style.display = 'none';

// Show the name input box initially
document.getElementById('nameInput').style.display = 'block';

// Update the button text when Enter key is pressed
document.getElementById('nameInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        updateButtonText();
    }
});

// Update button text and show the jump scare button when clicked
document.getElementById('enteredName').addEventListener('click', function() {
    updateButtonText();
});

function updateButtonText() {
    let name = document.getElementById('nameInput').value.trim();
    if (name === '') {
        // If the name is not entered, randomize it
        const names = ['victim', 'subject', 'player'];
        name = names[Math.floor(Math.random() * names.length)];
    }
    const personalizedMessage = `Want to play a game, ${name}?`;
    document.getElementById('jumpScareButton').textContent = personalizedMessage;
    // Hide the name input box
    document.getElementById('nameInput').style.display = 'none';
    // Show the jump scare button
    document.getElementById('jumpScareButton').style.display = 'block';
    // Append the entered name to the existing text in the h1 element
    document.getElementById('enteredName').textContent += ` ${name}`;
}
