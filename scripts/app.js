const grid = document.querySelector(".grid");
const width = 10;
const cellCount = width * width;
const cells = [];

// Immoveable objects
const corridor = [11, 14, 18, 92, 96];
const assassin = [40, 43, 46, 49];
const warden = [70, 74, 79];

let counter = 0;
let charOneCurrentPosition = 97;

function createGrid() {
  Array.from(Array(cellCount).keys()).forEach((i) => {
    const cell = document.createElement("div");

    grid.appendChild(cell);
    cells.push(cell);
  });
}

createGrid();

// making space
// ------------------------------
// audio src

const startButtons = document.querySelectorAll(".start");
const popUps = document.querySelectorAll(".popUp");
const popGameOver = document.querySelector(".gameOverOverlay");
const popWin = document.querySelector(".winOverlay");

//------- Car -------
const carRowIndex = 8;
const carGap = 3;
const carStartIndex = width * carRowIndex;
const cars = Array.from(cells).slice(carStartIndex, carStartIndex + width);

//-------- Cop ---------
const copRowIndex = 6;
const copGap = 4;
const copStartIndex = width * copRowIndex;
const cops = Array.from(cells).slice(copStartIndex, copStartIndex + width);
//-------- StanLee ---------
const stanLeeRowIndex = 5;
const stanLeeGap = 4;
const stanLeeStartIndex = width * stanLeeRowIndex;
const stanLees = Array.from(cells).slice(
  stanLeeStartIndex,
  stanLeeStartIndex + width
);
//-------- Drone ----------
const droneRowIndex = 3;
const droneGap = 3;
const droneStartIndex = width * droneRowIndex;
const drones = Array.from(cells).slice(
  droneStartIndex,
  droneStartIndex + width
);
//-------- Wolf ----------
const wolfRowIndex = 2;
const wolfGap = 4;
const wolfStartIndex = width * wolfRowIndex;
const wolves = Array.from(cells).slice(wolfStartIndex, wolfStartIndex + width);
//------------ Function ------------
function addCharOne(position) {
  cells[position].classList.add("charOne");
}

function removeCharOne(position) {
  cells[position].classList.remove("charOne");
}

function startReset() {
  popUps.forEach((popUp) => popUp.classList.remove("active"));
  addCharOne(charOneCurrentPosition);
  gameSpeed(900); // increase to slow down or decrease to speed up.
  // add background audio
}

function gameOver() {
  popGameOver.classList.add("active");
  pauseGame();
  // add audio for game over
}

function win() {
  popWin.classList.add("active");
  pauseGame();
  // add audio for win
}

function pauseGame() {
  clearInterval(gameInterval);
  removeCharOne(charOneCurrentPosition); // Remove charOne class from current position
  charOneCurrentPosition = 97; // Reset charOne's position back to 97

  // pause any playing audio files
}

let gameInterval;
function gameSpeed(ms) {
  clearInterval(gameInterval);
  gameInterval = setInterval(move, ms);
}

function move() {
  counter++;

  cells.forEach((cell) => cell.classList.remove("car"));

  cars.forEach((car, index) => {
    if (index % carGap === carGap - 1 - (counter % carGap)) {
      car.classList.add("car");

      if (index + width * carRowIndex === charOneCurrentPosition) {
        gameOver();
      }
    }
  });

  cells.forEach((cell) => cell.classList.remove("cop"));

  cops.forEach((cop, index) => {
    if (index % copGap === copGap - 1 - (counter % copGap)) {
      cop.classList.add("cop");

      if (index + width * copRowIndex === charOneCurrentPosition) {
        gameOver();
      }
    }
  });

  cells.forEach((cell) => cell.classList.remove("stan-lee"));

  stanLees.forEach((stanLee, index) => {
    if (index % stanLeeGap === counter % stanLeeGap) {
      stanLee.classList.add("stan-lee");

      if (index + width * stanLeeRowIndex === charOneCurrentPosition) {
        gameOver();
      }
    }
  });

  cells.forEach((cell) => cell.classList.remove("drone"));

  drones.forEach((drone, index) => {
    if (index % droneGap === droneGap - 1 - (counter % droneGap)) {
      drone.classList.add("drone");

      if (index + width * droneRowIndex === charOneCurrentPosition) {
        gameOver();
      }
    }
  });

  cells.forEach((cell) => cell.classList.remove("wolf"));

  wolves.forEach((wolf, index) => {
    if (index % wolfGap === counter % wolfGap) {
      wolf.classList.add("wolf");

      if (index + width * wolfRowIndex === charOneCurrentPosition) {
        gameOver();
      }
    }
  });

  corridor.forEach((index) => {
    cells[index].classList.add("corridor");
  });

  assassin.forEach((index) => {
    cells[index].classList.add("assassin");
  });

  warden.forEach((index) => {
    cells[index].classList.add("warden");
  });
}

function handleKeyDown(event) {
  removeCharOne(charOneCurrentPosition);
  // moving sounds effects
  let newCharOnePosition = charOneCurrentPosition;

  // left is 37
  if (event.keyCode === 37 && charOneCurrentPosition % width !== 0) {
    newCharOnePosition = charOneCurrentPosition - 1;
  }
  // up is 38
  else if (event.keyCode === 38 && charOneCurrentPosition >= width) {
    newCharOnePosition = charOneCurrentPosition - width;
  }
  // right is 39
  else if (
    event.keyCode === 39 &&
    charOneCurrentPosition % width !== width - 1
  ) {
    newCharOnePosition = charOneCurrentPosition + 1;
  }
  // down is 40
  else if (event.keyCode === 40 && charOneCurrentPosition < cellCount - width) {
    newCharOnePosition = charOneCurrentPosition + width;
  }

  // Collision detection with immovable objects
  if (cells[newCharOnePosition].classList.contains("corridor")) {
    //Check if the destination cell contains the corridor
    newCharOnePosition = charOneCurrentPosition;
    //corridor found, do not move the player
  }

  if (cells[newCharOnePosition].classList.contains("assassin")) {
    newCharOnePosition = charOneCurrentPosition;
  }

  if (cells[newCharOnePosition].classList.contains("warden")) {
    newCharOnePosition = charOneCurrentPosition;
  }

  // Check if the new position collides with any obstacle
  if (isCollidingWithObstacle(newCharOnePosition)) {
    gameOver();
    return; // Exit function to prevent further movement
  }

  charOneCurrentPosition = newCharOnePosition;

  if (charOneCurrentPosition <= width) {
    win();
  }

  addCharOne(charOneCurrentPosition);
}

// Function to check if the new position collides with any obstacle
function isCollidingWithObstacle(position) {
  // Check collision with cars
  if (
    cars.some(
      (car) => car.classList.contains("car") && cells.indexOf(car) === position
    )
  ) {
    return true;
  }
  // Check collision with cops
  if (
    cops.some(
      (cop) => cop.classList.contains("cop") && cells.indexOf(cop) === position
    )
  ) {
    return true;
  }
  // Check collision with stan-lees
  if (
    stanLees.some(
      (stanLee) =>
        stanLee.classList.contains("stan-lee") &&
        cells.indexOf(stanLee) === position
    )
  ) {
    return true;
  }
  // Check collision with drones
  if (
    drones.some(
      (drone) =>
        drone.classList.contains("drone") && cells.indexOf(drone) === position
    )
  ) {
    return true;
  }
  // Check collision with wolves
  if (
    wolves.some(
      (wolf) =>
        wolf.classList.contains("wolf") && cells.indexOf(wolf) === position
    )
  ) {
    return true;
  }
  return false; // No collision detected
}

startButtons.forEach((button) => button.addEventListener("click", startReset));

document.addEventListener("keydown", handleKeyDown);
