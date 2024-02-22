const grid = document.querySelector(".grid");
const width = 10;
const cellCount = width * width;
const cells = [];

let counter = 0;
let charOneCurrentPosition = 96;

function createGrid() {
  Array.from(Array(cellCount).keys()).forEach((i) => {
    const cell = document.createElement("div");

    grid.appendChild(cell);
    cells.push(cell);
  });
}

createGrid();

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
  gameSpeed(600); // increase to slow down or decrease to speed up.
}

function gameOver() {
  // game overlay needs to less transparent and cover majority of the board
  popGameOver.classList.add("active");
  pauseGame();
}

function win() {
  popWin.classList.add("active");
  pauseGame();
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
}

// making space

// audio src

function handleKeyDown(event) {
  removeCharOne(charOneCurrentPosition);

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

  // Check if the new position collides with any obstacle
  if (isCollidingWithObstacle(newCharOnePosition)) {
    gameOver(); // Collision detected with obstacle
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
