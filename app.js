import { ghosts } from "./controllers/ghost.js";
import { tiles, pacmanCurrentIndex } from "./utils/utils.js";
import {
  createBoard,
  createPowerUps,
  displayLives,
} from "./components/components.js";
import { pauseGame, startGame, restartGameEvent } from "./controllers/game.js";

const startButton = document.querySelector(".startButton");
const pauseButton = document.querySelector(".pauseButton");
const restartButton = document.querySelector(".restartButton");
createBoard();
displayLives();
createPowerUps();
tiles[pacmanCurrentIndex].classList.add("pac-man");
ghosts.forEach((ghost) => {
  tiles[ghost.currentIndex].classList.remove("pac-dot");
  tiles[ghost.currentIndex].classList.add("ghost");
});
startButton.onclick = startGame;
pauseButton.onclick = pauseGame;
restartButton.onclick = restartGameEvent;
