const grid = document.querySelector(".grid");
const width = 10;
const cellCount = width * width;
const cells = [];

let counter = 0;

let charOneCurrentPosition = 97;

function createGrid() {
  Array.from(Array(cellCount).keys()).forEach((i) => {
    const cell = document.createElement("div");
    cell.innerText = i; //display grid numbers
    grid.appendChild(cell);
    cells.push(cell);
  });
  addCharOne(charOneCurrentPosition);
  setInterval(move, 1000);
  // move();
  // move();
}

createGrid();

//------------ Function ------------
function addCharOne(position) {
  cells[position].classList.add("charOne");
}

function removeCharOne(position) {
  cells[position].classList.remove("charOne");
}

const winLocation = 0;

function gameOver() {} // In Progress

// function winArea() {
//   cells[position].classList.contains("win-location");
// }

// function winZone() {
//   cells[position].classList.add("win-location");
// }
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

function move() {
  counter++;

  cells.forEach((cell) => cell.classList.remove("car"));

  cars.forEach((car, index) => {
    if (index % carGap === carGap - 1 - (counter % carGap)) {
      car.classList.add("car");

      if (index + width * carRowIndex === charOneCurrentPosition) {
        console.log("hit by car!!!"); // test passed
        gameOver();
      }
    }
  });

  cells.forEach((cell) => cell.classList.remove("cop"));

  cops.forEach((cop, index) => {
    if (index % copGap === copGap - 1 - (counter % copGap)) {
      cop.classList.add("cop");

      if (index + width * copRowIndex === charOneCurrentPosition) {
        console.log("hit by cop!!!"); // test passed
        gameOver();
      }
    }
  });

  cells.forEach((cell) => cell.classList.remove("stan-lee"));

  stanLees.forEach((stanLee, index) => {
    if (index % copGap === stanLeeGap - 1 - (counter % stanLeeGap)) {
      stanLee.classList.add("stan-lee");

      if (index + width * stanLeeRowIndex === charOneCurrentPosition) {
        console.log("hit by Stan Lee!!!"); // test passed
      }
    }
  });

  cells.forEach((cell) => cell.classList.remove("drone"));

  drones.forEach((drone, index) => {
    if (index % droneGap === droneGap - 1 - (counter % droneGap)) {
      drone.classList.add("drone");

      if (index + width * droneRowIndex === charOneCurrentPosition) {
        console.log("hit by Drone!!!"); // test passed
      }
    }
  });
}

// making space

// audio src

// start game overlay

// win game function win zone
// space

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

  addCharOne(charOneCurrentPosition);

  cells.forEach((cell) => cell.classList.contains("car, cop, drone, stanLee")); // bugged works on entire row

  alert("hitted");

  // if (charOneCurrentPosition === index + width * carRowIndex) {
  //   alert("You hit car"); // need to DEBUG
  // }

  // logging moves will remove once fully test
  console.log(`CharOne current position ${charOneCurrentPosition}`);
}

document.addEventListener("keydown", handleKeyDown);
