import { dijkstra } from "./dijkstra.js";
import {
  points,
  scoreBoard,
  pacmanCurrentIndex,
  tiles,
  width,
  setPoints,
} from "../utils/utils.js";
import { gameOver } from "./game.js";
class Ghost {
  constructor(className, startIndex, speed, chasesPacman) {
    this.className = className;
    this.startIndex = startIndex;
    this.currentIndex = startIndex;
    this.speed = speed;
    this.scared = false;
    this.timerId = NaN;
    this.chasesPacman = chasesPacman;
  }
}

const ghosts = [
  new Ghost("red-ghost", 300, 1000, true),
  new Ghost("green-ghost", 100 - width, 800, true),
  new Ghost("greenish-ghost", 543 - width, 700, false),
  new Ghost("purple-ghost", 550 - width, 400, false),
];

function ghostMovement(ghost) {
  const directions = [-1, 1, width, -width];
  let direction = directions[Math.floor(Math.random() * directions.length)];
  let randomMoveTime = 15000;
  let startTime = Date.now();

  ghost.timerId = setInterval(function () {
    if (ghost.scared) {
      do {
        direction = directions[Math.floor(Math.random() * directions.length)];
      } while (
        tiles[ghost.currentIndex + direction] &&
        (tiles[ghost.currentIndex + direction].classList.contains("border") ||
          tiles[ghost.currentIndex + direction].classList.contains("ghost"))
      );
      eatScaredGhost(ghost);
    } else {
      if (Date.now() - startTime < randomMoveTime || !ghost.chasesPacman) {
        do {
          direction = directions[Math.floor(Math.random() * directions.length)];
        } while (
          tiles[ghost.currentIndex + direction] &&
          (tiles[ghost.currentIndex + direction].classList.contains("border") ||
            tiles[ghost.currentIndex + direction].classList.contains("ghost"))
        );
        eatScaredGhost(ghost);
      } else if (ghost.chasesPacman) {
        const path = dijkstra(ghost.currentIndex, pacmanCurrentIndex);

        if (path.length > 1) {
          direction = path[1] - ghost.currentIndex;
        } else {
          do {
            direction =
              directions[Math.floor(Math.random() * directions.length)];
          } while (
            tiles[ghost.currentIndex + direction] &&
            (tiles[ghost.currentIndex + direction].classList.contains(
              "border"
            ) ||
              tiles[ghost.currentIndex + direction].classList.contains("ghost"))
          );
        }
      }
    }

    tiles[ghost.currentIndex].classList.remove(
      ghost.className,
      "ghost",
      "scared-ghost"
    );
    ghost.currentIndex += direction;
    tiles[ghost.currentIndex].classList.add(ghost.className, "ghost");

    if (ghost.scared) {
      tiles[ghost.currentIndex].classList.add("scared-ghost");
    }

    gameOver();
  }, ghost.speed);
}

function eatScaredGhost(ghost) {
  if (tiles[ghost.currentIndex].classList.contains("pac-man") && ghost.scared) {
    clearInterval(ghost.timerId);
    tiles[ghost.currentIndex].classList.remove(
      ghost.className,
      "ghost",
      "scared-ghost"
    );

    ghost.currentIndex = ghost.startIndex;
    setPoints(points + 100);
    scoreBoard.innerHTML = points;
    console.log(ghost.currentIndex);
    tiles[ghost.currentIndex].classList.add(ghost.className, "ghost");
    ghost.scared = false;
    ghostMovement(ghost);
  }
}

function resetGhosts() {
  ghosts.forEach((ghost) => {
    clearInterval(ghost.timerId);
    tiles[ghost.currentIndex].classList.remove(
      ghost.className,
      "ghost",
      "scared-ghost"
    );
    ghost.currentIndex = ghost.startIndex;
    tiles[ghost.currentIndex].classList.add(ghost.className, "ghost");
    ghostMovement(ghost);
  });
}

export { Ghost, ghosts, ghostMovement, resetGhosts, eatScaredGhost };
