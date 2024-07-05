import {
  width,
  tiles,
  pacmanCurrentIndex,
  setPacmanCurrentIndex,
  pacmanSpeed,
  setPacmanSpeed,
} from "../utils/utils.js";
import { scoreEvent } from "./game.js";

function pacmanStep(step, transform_mode) {
  clearInterval(pacmanSpeed);
  setPacmanSpeed(
    setInterval(function () {
      if (!tiles[pacmanCurrentIndex + step].classList.contains("border")) {
        tiles[pacmanCurrentIndex].classList.remove(
          "pac-man",
          "pac-man-up",
          "pac-man-down",
          "pac-man-right",
          "pac-man-left"
        );

        setPacmanCurrentIndex(pacmanCurrentIndex + step);
        tiles[pacmanCurrentIndex].classList.add("pac-man", transform_mode);
        scoreEvent();
      }
    }, 300)
  );
}
function movePacman(e) {
  let transform_mode;
  switch (e.key) {
    case "ArrowLeft":
    case "4":
    case "a":
      transform_mode = "pac-man-left";
      pacmanStep(-1, transform_mode);

      break;
    case "ArrowRight":
    case "6":
    case "d":
      transform_mode = "pac-man-right";
      pacmanStep(1, transform_mode);
      break;
    case "ArrowUp":
    case "8":
    case "w":
      transform_mode = "pac-man-up";
      pacmanStep(-width, transform_mode);
      break;
    case "ArrowDown":
    case "2":
    case "x":
      transform_mode = "pac-man-down";
      pacmanStep(width, transform_mode);
      break;
  }
}

export { pacmanCurrentIndex, movePacman, scoreEvent };
