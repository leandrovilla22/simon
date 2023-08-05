// Variables
var sequence = [];
var playerSequence = [];
var level = null;
var point = 0;
var buttonsDisabled = true;
var strictMode = false;
var buttonElements =null; //document.querySelectorAll('.simon-btn');
//var startButton = document.getElementById('start-btn');
const timer = document.getElementsByClassName('timer');
const watch = document.getElementById('watch');
let timerInterval;
let runingTime= 0;

// Button click event listeners
function clicksecuencia(){
for (let h = 0; h < buttonElements.length; h++) {
  buttonElements[h].addEventListener('click', handleButtonClick);
  
}
}
function namePlayer(){
  let namePlayer1 = document.getElementById('namePlayer').value
  console.log(namePlayer1)
  if (namePlayer1===''){
    alert('Ingrese su nombre')
  }
  else{
    startGame();
    startTimer(); // Iniciar el cronómetro al comenzar el juego    
  }
}


// Start the game
function startGame() {
  console.log('estoy aca')
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
  var randomNum = Math.floor(Math.random() * 4);
  sequence.push(randomNum);
  console.log('level' , level, 'sequence', sequence);
}

// Play the sequence
function playSequence() {
  let i = 0;
  
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
    console.log('EL EVENT TARGET ID ES',event.target.id);
    var buttonIndex = getButtonIndex(buttonId);
    playButton(buttonIndex);
    playerSequence.push(buttonIndex);
    checkPlayerSequence();
  }
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
// Play a button
function playButton(buttonIndex) {
  //console.log('playbutton', buttonElements);
  var buttonElement = buttonElements[buttonIndex];
  buttonElement.classList.add('active');
  setTimeout(function() {
    buttonElement.classList.remove('active');
  }, 200);
}

// Check player's sequence
function checkPlayerSequence() {
  console.log('checkPlayerSequence', playerSequence)
  
  if (playerSequence.length === sequence.length) {
    
    if (arraysMatch(playerSequence, sequence)) {
      playerSequence = [];
      jugador = document.getElementById('namePlayer').value
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
        //console.log(point);
        //stopTimer();
        //alert('Reintentalo '+ jugador + ' estas en el Nivel'+ level +' tu puntuacion actual es:' + point );
        const continueGame = confirm('¡Incorrecto! ¿Deseas continuar?');
        if (continueGame) {
          playerSequence = [];
        setTimeout(function() {
        playSequence();
        }, 1000);
        } else {
          stopTimer();
          alert('Reintentalo '+ jugador + ' estas en el Nivel'+ level +' tu puntuacion actual es:' + point );
          
        }
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
      else{
        point ++;
        console.log('Tu puntuacion es:', point);
      }
  }
  return true;
}



// Función para iniciar el cronómetro
function startTimer() {
  timerInterval = setInterval(() => {
    runingTime += 10; // Incremento el tiempo en 10 milisegundos (0.01 segundos)
    calculateTimer();
  }, 10); // Ejecutar cada 10 milisegundos (0.01 segundos)
}

// Función para detener el cronómetro
function stopTimer() {
  clearInterval(timerInterval);
  runingTime = 0;
  calculateTimer();
}

// Actualizar el cronómetro en el reloj
function calculateTimer() {
  const totalSeconds = Math.floor(runingTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  watch.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

//Funciones para el Formulario
function validarFormulario() {
  var nombre = document.getElementById('nombre').value;
  var email = document.getElementById('correo').value;
  var comentario = document.getElementById('textarea').value;

  var nombreValido = /^[A-Za-z\s]+$/.test(nombre);
  var emailValido = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);

  var destinatario ="leandrovilla22@gmail.com";
  var asunto = "Consulta desde el formulario de la página";
  var mailtoLink = "mailto:" + destinatario + "?subject=" + encodeURIComponent(asunto) + "&body=" + encodeURIComponent(comentario);

  if (!nombreValido) {
    alert('Ingrese un nombre válido (solo letras y espacios)');
    return false;
} else if (!emailValido) {
    alert('Ingrese un email válido');
    return false;
} else {
    // Si el formulario es válido, redirigir el navegador hacia el enlace mailto
    window.location.href = mailtoLink;
    return true;
}
}