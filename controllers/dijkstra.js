import { tiles, width } from "../utils/utils.js";

function indexToCoords(index) {
  return { x: index % width, y: Math.floor(index / width) };
}

function coordsToIndex(x, y) {
  return y * width + x;
}

function getClosest(index) {
  const { x, y } = indexToCoords(index);
  const adjacents = [];

  if (x > 0 && !tiles[coordsToIndex(x - 1, y)].classList.contains("border"))
    adjacents.push(coordsToIndex(x - 1, y));
  if (
    x < width - 1 &&
    !tiles[coordsToIndex(x + 1, y)].classList.contains("border")
  )
    adjacents.push(coordsToIndex(x + 1, y));
  if (y > 0 && !tiles[coordsToIndex(x, y - 1)].classList.contains("border"))
    adjacents.push(coordsToIndex(x, y - 1));
  if (
    y < width - 1 &&
    !tiles[coordsToIndex(x, y + 1)].classList.contains("border")
  )
    adjacents.push(coordsToIndex(x, y + 1));
  return adjacents;
}

function dijkstra(startIndex, endIndex) {
  const distances = Array(tiles.length).fill(Infinity);
  const previous = Array(tiles.length).fill(null);
  const queue = new Set();

  distances[startIndex] = 0;
  queue.add(startIndex);

  while (queue.size > 0) {
    let minNode = null;
    queue.forEach((node) => {
      if (minNode === null || distances[node] < distances[minNode]) {
        minNode = node;
      }
    });

    if (minNode === endIndex) break;

    queue.delete(minNode);
    getClosest(minNode).forEach((neighbor) => {
      const alt = distances[minNode] + 1;
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = minNode;
        queue.add(neighbor);
      }
    });
  }

  const path = [];
  let u = endIndex;
  while (previous[u] !== null) {
    path.unshift(u);
    u = previous[u];
  }
  return path;
}

export { dijkstra };
