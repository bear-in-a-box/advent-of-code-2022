import { benchmark } from 'utils/benchmark';
import { readWholeFile } from 'utils/reader';
import { getInputPath } from 'utils/argv';

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function* go(
  xStart: number,
  yStart: number,
  input: number[][],
  direction: Direction
) {
  if (direction === Direction.Down) {
    for (let y = yStart + 1; y < input.length; y++) {
      yield [y, xStart];
    }
  } else if (direction === Direction.Right) {
    for (let x = xStart + 1; x < input[0].length; x++) {
      yield [yStart, x];
    }
  } else if (direction === Direction.Up) {
    for (let y = yStart - 1; y >= 0; y--) {
      yield [y, xStart];
    }
  } else if (direction === Direction.Left) {
    for (let x = xStart - 1; x >= 0; x--) {
      yield [yStart, x];
    }
  }
}

function countVisbileTress(
  xStart: number,
  yStart: number,
  input: number[][],
  direction: Direction
): number {
  const height: number = input[yStart][xStart];
  let count: number = 0;
  for (const [y, x] of go(xStart, yStart, input, direction)) {
    count++;
    if (input[y][x] >= height) {
      break;
    }
  }
  return count;
}

function calculateScenicScore(x: number, y: number, input: number[][]): number {
  let result: number = 1;
  for (const direction of [
    Direction.Up,
    Direction.Right,
    Direction.Down,
    Direction.Left,
  ]) {
    result *= countVisbileTress(x, y, input, direction);
  }
  return result;
}

function findBestTree(heights: number[][]): number {
  return Math.max(
    ...heights.map((yArray, y) =>
      Math.max(
        ...yArray.map((_height, x) => calculateScenicScore(x, y, heights))
      )
    )
  );
}

async function run() {
  const input = await readWholeFile(getInputPath(__dirname));

  const heights: number[][] = input
    .split('\n')
    .map((line) => line.split('').map((v) => +v));

  return findBestTree(heights);
}

benchmark('day 08, star 2', run);
