const grid = document.querySelector(".grid");
const width = 10;
const cellCount = width * width;
const cells = [];

let counter = 0;

let charOneCurrentPosition = 97;
// need a const variable for starting place to use in startReset function

function createGrid() {
  Array.from(Array(cellCount).keys()).forEach((i) => {
    const cell = document.createElement("div");
    cell.innerText = i; //display grid numbers
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
const stanLeeGap = 3;
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
  gameSpeed(400);
}

function gameOver() {
  popGameOver.classList.add("active");
  pauseGame();
}

function win() {
  popWin.classList.add("active");
  pauseGame();
}

function pauseGame() {
  clearInterval(move);
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
    if (index % copGap === stanLeeGap - 1 - (counter % stanLeeGap)) {
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
}

// making space

// audio src

function handleKeyDown(event) {
  removeCharOne(charOneCurrentPosition);

  // left is 37
  if (event.keyCode === 37 && charOneCurrentPosition % width !== 0) {
    charOneCurrentPosition--;

    // up is 38
  } else if (event.keyCode === 38 && charOneCurrentPosition >= width) {
    charOneCurrentPosition -= width;
    // right is 39
  } else if (
    event.keyCode === 39 &&
    charOneCurrentPosition % width !== width - 1
  ) {
    charOneCurrentPosition++;
    // down is 40
  } else if (
    event.keyCode === 40 &&
    charOneCurrentPosition < cellCount - width
  ) {
    charOneCurrentPosition += width;
  }
  if (charOneCurrentPosition <= width) {
    win();
  }
  // if (!cells[charOneCurrentPosition].classList.contains("car")) {
  //   charOneCurrentPosition = carRowIndex;
  //   gameOver();
  // }

  addCharOne(charOneCurrentPosition);

  // cells.forEach((cell) => cell.classList.contains("car, cop, drone, stanLee")); // bugged works on entire row
  // alert("hitted");
  // if (charOneCurrentPosition === index + width * carRowIndex) {
  //   alert("You hit car"); // need to DEBUG
  // }

  // logging moves will remove once fully test
  console.log(`CharOne current position ${charOneCurrentPosition}`);
}
startButtons.forEach((button) => button.addEventListener("click", startReset));

document.addEventListener("keydown", handleKeyDown);
