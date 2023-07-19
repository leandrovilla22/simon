// Variables
var sequence = [];
var playerSequence = [];
var level = null;
var buttonsDisabled = true;
var strictMode = false;
var buttonElements =null; //document.querySelectorAll('.simon-btn');
var startButton = document.getElementById('start-btn');

// Start button event listener
//startButton.addEventListener('click', startGame);

// Button click event listeners
function clicksecuencia(){
for (let h = 0; h < buttonElements.length; h++) {
  buttonElements[h].addEventListener('click', handleButtonClick);
}
}
function nameJugador(){
  let nameJugador = document.getElementById('nameJugador').value
  console.log(nameJugador)
  if (nameJugador===''){
    alert('Ingrese su nombre')
  }
  else{
    startGame();
  }
}


// Start the game
function startGame() {
  //console.log('estoy aca')
  buttonElements = document.querySelectorAll('.simon-btn');
  clicksecuencia();
  sequence = [];
  level = 1;
  generateSequence();
  playSequence();
  buttonsDisabled = false;
}

// Generate the sequence
function generateSequence() {
 
  //for (let j = 0; j < level; j++) {

    var randomNum = Math.floor(Math.random() * 4);
    sequence.push(randomNum);
    //cambiaColor();
//  }
  console.log('level' , level, 'sequence', sequence);
}

// Play the sequence
function playSequence() {
  var i = 0;
  var interval = setInterval(function() {
    playButton(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      buttonsDisabled = false;
    }
  }, 1000);
}

// Handle button click
function handleButtonClick(event) {
  if (!buttonsDisabled) {
    var buttonId = event.target.id;
    var buttonIndex = getButtonIndex(buttonId);
    playButton(buttonIndex);
    playerSequence.push(buttonIndex);
    checkPlayerSequence();
  }
}

// Play a button
function playButton(buttonIndex) {
  //console.log('playbutton', buttonElements);
  var buttonElement = buttonElements[buttonIndex];
  buttonElement.classList.add('active');
  setTimeout(function() {
    buttonElement.classList.remove('active');
  }, 500);
}

// Check player's sequence
function checkPlayerSequence() {
  console.log('checkPlayerSequence')
  if (playerSequence.length === sequence.length) {
    if (arraysMatch(playerSequence, sequence)) {
      playerSequence = [];
      level++;
      console.log('Siguiente Nivel')
      generateSequence();
    
      setTimeout(function() {
        console.log('comienza el nivel' , level)
        playSequence();
      }, 1000);
    } else {
      if (strictMode) {
        alert('Game Over!');
        startGame();
      } else {
        alert('Try Again!');
        playerSequence = [];
        setTimeout(function() {
          playSequence();
        }, 1000);
      }
    }
  }
}

// Check if two arrays match
function arraysMatch(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

// Get button index
function getButtonIndex(buttonId) {
  switch (buttonId) {
    case 'green':
      return 0;
    case 'red':
      return 1;
    case 'yellow':
      return 2;
    case 'blue':
      return 3;
  }
}
