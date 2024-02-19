const grid = document.querySelector(".grid");
const width = 10;
const cellCount = width * width;
const cells = [];
let charOneCurrentPosition = 97;
let stanLeeCurrentPosition = 89;
let carCurrentPosition = 79;
let droneCurrentPosition = 59;
let copCurrentPosition = 49;

function createGrid() {
  Array.from(Array(cellCount).keys()).forEach((i) => {
    const cell = document.createElement("div");
    cell.innerText = i; //display numbers
    grid.appendChild(cell);
    cells.push(cell);
  });
  addCharOne(charOneCurrentPosition);
  addStanLee(stanLeeCurrentPosition);
  addCar(carCurrentPosition);
  addDrone(droneCurrentPosition);
  addCop(copCurrentPosition);
}

createGrid();

// adding characters
function addCharOne(position) {
  cells[position].classList.add("charOne");
}

function addStanLee(position) {
  cells[position].classList.add("stan-lee");
}

function addCar(position) {
  cells[position].classList.add("police-car");
}

function addDrone(position) {
  cells[position].classList.add("drone");
}

function addCop(position) {
  cells[position].classList.add("cop");
}

// obstacle timers and move direction.
function stanLeeTimer() {}

// making space

function removeCharOne(position) {
  cells[position].classList.remove("charOne");
}

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

  // we have a new current position now so add the new burglar
  addCharOne(charOneCurrentPosition);

  // logging moves will remove
  console.log(`CharOne current position ${charOneCurrentPosition}`);
}

document.addEventListener("keydown", handleKeyDown);
