import {
  tiles,
  grid,
  livesDisplay,
  powerUpBoard,
  lives,
  powerUpCount,
} from "../utils/utils.js";
import { layout } from "../utils/layout.js";

function createBoard() {
  grid.innerHTML = "";
  for (let i = 0; i < layout.length; i++) {
    const tile = document.createElement("div");
    if (layout[i] === 1) {
      tile.classList.add("pac-dot");
    } else if (layout[i] === 0) {
      tile.classList.add("border");
    }
    grid.appendChild(tile);
    tiles.push(tile);
  }
}

function displayLives() {
  livesDisplay.innerHTML = "Lives:";
  for (let i = 0; i < lives; i++) {
    const life = document.createElement("img");
    life.src = "./images/pacman.png";
    life.alt = "Pacman";
    life.style.width = "25px";
    life.style.height = "25px";
    life.classList.add("life");
    livesDisplay.appendChild(life);
  }
}

function createPowerUps() {
  powerUpBoard.innerHTML = powerUpCount;
  let position;
  for (let i = powerUpCount; i > 0; i--) {
    position = Math.floor(Math.random() * layout.length);
    while (
      tiles[position].classList.contains("border") ||
      layout[position] === 4
    ) {
      position = Math.floor(Math.random() * 400);
    }
    if (tiles[position].classList.contains("pac-dot")) {
      tiles[position].classList.remove("pac-dot");
    }
    tiles[position].classList.add("powerUp");
  }
}

export { createPowerUps, displayLives, createBoard };
