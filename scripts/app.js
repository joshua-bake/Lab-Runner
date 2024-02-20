const grid = document.querySelector(".grid");
const width = 10;
const cellCount = width * width;
const cells = [];
let carCurrentPosition = 89;
let copCurrentPosition = 69;
let charOneCurrentPosition = 97;
let droneCurrentPosition = 39;
let stanLeeCurrentPosition = 59;
// remove object currentposition once move function created

function createGrid() {
  Array.from(Array(cellCount).keys()).forEach((i) => {
    const cell = document.createElement("div");
    cell.innerText = i; //display grid numbers
    grid.appendChild(cell);
    cells.push(cell);
  });
  addCharOne(charOneCurrentPosition);
  setInterval(move, 400);
  // move();
  // move();
}

createGrid();

// adding objects
function addCharOne(position) {
  cells[position].classList.add("charOne");
}

function removeCharOne(position) {
  cells[position].classList.remove("charOne");
}

function addCar(position) {
  cells[position].classList.add("car");
}

function removeCar(position) {
  cells[position].classList.remove("car");
}

function addCop(position) {
  cells[position].classList.add("cop");
}

function removeCop(position) {
  cells[position].classList.remove("cop");
}

function addDrone(position) {
  cells[position].classList.add("drone");
}

function removeDrone(position) {
  cells[position].classList.remove("drone");
}

function addStanLee(position) {
  cells[position].classList.add("stan-lee");
}

function removeStanLee(position) {
  cells[position].classList.remove("stan-lee");
}

// Function for collision interaction char vs obstacle & obstacle vs char
function collisionDetected() {
  if (carCurrentPosition === charOneCurrentPosition) {
    // for each maybe to pass multiple arguments?...
    console.log("you been hit");
  }
}
// remove all instances of car, starting position for car

function move() {
  removeCar(carCurrentPosition);
  removeCop(copCurrentPosition);
  removeDrone(droneCurrentPosition);
  removeStanLee(stanLeeCurrentPosition);

  if (carCurrentPosition <= 89 && carCurrentPosition > 80) {
    carCurrentPosition--;
  }
  console.log(carCurrentPosition);
  // } else (carCurrentPosition <= 80 && carCurrentPosition < 89) {
  //   carCurrentPosition++;
  // }

  addCar(carCurrentPosition);
  addCop(copCurrentPosition);
  addDrone(droneCurrentPosition);
  addStanLee(stanLeeCurrentPosition);
  collisionDetected(
    carCurrentPosition,
    charOneCurrentPosition,
    copCurrentPosition,
    stanLeeCurrentPosition
  );
}

// making space

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
  collisionDetected(
    carCurrentPosition,
    charOneCurrentPosition,
    copCurrentPosition,
    stanLeeCurrentPosition
  );

  // logging moves will remove once fully test
  console.log(`CharOne current position ${charOneCurrentPosition}`);
}

document.addEventListener("keydown", handleKeyDown);
