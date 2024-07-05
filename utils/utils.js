const width = 28;
let tiles = [];
let pacmanCurrentIndex = 67;
let points = 0;
let lives = 2;
let powerUpCount = 4;
let pacmanSpeed = 0;
const grid = document.querySelector(".grid");
const scoreBoard = document.getElementById("score");
const powerUpBoard = document.getElementById("powerUp");
const livesDisplay = document.querySelector(".lives");

function setPacmanCurrentIndex(index) {
  pacmanCurrentIndex = index;
}
function resetTiles() {
  tiles = [];
}
function setPacmanSpeed(newPacmanSpeed) {
  pacmanSpeed = newPacmanSpeed;
}
function setPoints(newPoints) {
  points = newPoints;
}
function setPowerUpCount(newPowerUpCount) {
  powerUpCount = newPowerUpCount;
}
function setLives(no) {
  lives = no;
}

export {
  width,
  tiles,
  pacmanCurrentIndex,
  points,
  lives,
  powerUpCount,
  scoreBoard,
  powerUpBoard,
  livesDisplay,
  pacmanSpeed,
  grid,
  setPacmanCurrentIndex,
  setPoints,
  setPowerUpCount,
  setLives,
  setPacmanSpeed,
  resetTiles,
};
