import {
  tiles,
  pacmanCurrentIndex,
  setPacmanCurrentIndex,
  pacmanSpeed,
  points,
  lives,
  scoreBoard,
  powerUpBoard,
  powerUpCount,
  setPoints,
  setPowerUpCount,
  setLives,
  setPacmanSpeed,
  resetTiles,
} from "../utils/utils.js";
import { ghosts, ghostMovement } from "./ghost.js";
import {
  displayLives,
  createBoard,
  createPowerUps,
} from "../components/components.js";
import { movePacman } from "./pacman.js";

function startGame() {
  ghosts.forEach((ghost) => ghostMovement(ghost));
  document.addEventListener("keyup", movePacman);
}

function pauseGame() {
  alert("Game stopped");
  document.removeEventListener("keyup", movePacman);
  clearInterval(pacmanSpeed);
  ghosts.forEach((ghost) => clearInterval(ghost.timerId));
}

function restartGameEvent() {
  clearInterval(pacmanSpeed);
  ghosts.forEach((ghost) => clearInterval(ghost.timerId));
  resetTiles();

  setPacmanCurrentIndex(67);
  console.log(pacmanCurrentIndex);

  console.log(tiles.length);

  setPoints(0);
  scoreBoard.innerHTML = 0;
  setPowerUpCount(4);
  powerUpBoard.innerHTML = powerUpCount;
  setLives(2);
  displayLives();

  createBoard();
  createPowerUps();
  tiles[pacmanCurrentIndex].classList.add("pac-man");
  ghosts.forEach((ghost) => {
    tiles[ghost.currentIndex].classList.remove(
      "ghost",
      "scared-ghost",
      ghost.className
    );
    ghost.currentIndex = ghost.startIndex;
    ghost.scared = false;
    tiles[ghost.currentIndex].classList.add("ghost", ghost.className);
    ghostMovement(ghost);
  });

  document.addEventListener("keyup", movePacman);
  setPacmanSpeed(setInterval(movePacman, 300));
}

function scoreEvent() {
  if (tiles[pacmanCurrentIndex].classList.contains("pac-dot")) {
    setPoints(points + 1);

    tiles[pacmanCurrentIndex].classList.remove("pac-dot");
  }
  if (tiles[pacmanCurrentIndex].classList.contains("powerUp")) {
    setPoints(points + 10);

    ghosts.forEach((ghost) => {
      ghost.scared = true;
      tiles[ghost.currentIndex].classList.add("scared-ghost");
    });
    setTimeout(resetScared, 10000);
    setPowerUpCount(powerUpCount - 1);
    tiles[pacmanCurrentIndex].classList.remove("powerUp");
    powerUpBoard.innerHTML = powerUpCount;
  }
  scoreBoard.innerHTML = points;
  winGame();
}

function winGame() {
  if (
    !tiles.some(
      (tile) =>
        tile.classList.contains("pac-dot") || tile.classList.contains("powerUp")
    )
  ) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    clearInterval(pacmanSpeed);
    document.removeEventListener("keyup", movePacman);
    setTimeout(function () {
      alert("Congratulations! You win! You scored: " + points + " points");
    }, 100);
  }
}

function resetScared() {
  ghosts.forEach((ghost) => {
    ghost.scared = false;
  });
}
function gameOver() {
  if (
    tiles[pacmanCurrentIndex].classList.contains("ghost") &&
    !tiles[pacmanCurrentIndex].classList.contains("scared-ghost")
  ) {
    setLives(lives - 1);
    if (lives === 0) {
      alert("Game Over!");
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      clearInterval(pacmanSpeed);
      displayLives();
      return;
    } else {
      tiles[pacmanCurrentIndex].classList.remove(
        "pac-man",
        "pac-man-up",
        "pac-man-down",
        "pac-man-left",
        "pac-man-right"
      );
      setPacmanCurrentIndex(67);
      tiles[pacmanCurrentIndex].classList.add("pac-man");
      displayLives();
    }
  }
}
export { startGame, pauseGame, restartGameEvent, scoreEvent, gameOver };
