import { benchmark } from 'utils/benchmark';
import { readWholeFile } from 'utils/reader';
import { getInputPath } from 'utils/argv';

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function* range(input: number[][], direction: Direction) {
  if (direction === Direction.Down) {
    for (let y = 0; y < input.length; y++) {
      yield y;
    }
  } else if (direction === Direction.Right) {
    for (let x = 0; x < input[0].length; x++) {
      yield x;
    }
  } else if (direction === Direction.Up) {
    for (let y = input.length - 1; y >= 0; y--) {
      yield y;
    }
  } else if (direction === Direction.Left) {
    for (let x = input[0].length - 1; x >= 0; x--) {
      yield x;
    }
  }
}

function* getCorrespodingAxises(axis: Direction) {
  switch (axis) {
    case Direction.Down:
      yield Direction.Right;
      yield Direction.Left;
      break;
    case Direction.Right:
      yield Direction.Down;
      yield Direction.Up;
      break;
  }
}

function translateCoords(
  a: number,
  b: number,
  axis: Direction
): [number, number] {
  if (axis === Direction.Down) {
    return [a, b];
  }
  return [b, a];
}

function countVisibleAcrossAxis(
  heights: number[][],
  visibility: boolean[][],
  axis: Direction
): number {
  let visible = 0;

  for (const a of range(heights, axis)) {
    for (const dir of getCorrespodingAxises(axis)) {
      let max: number = -1;
      for (const b of range(heights, dir)) {
        const [y, x] = translateCoords(a, b, axis);
        const height = heights[y][x];
        if (height > max) {
          max = height;
          if (!visibility[y][x]) {
            visible++;
            visibility[y][x] = true;
          }
        }
      }
    }
  }
  return visible;
}

function countVisibleTrees(heights: number[][]): number {
  const visibility: boolean[][] = Array(heights.length)
    .fill(undefined)
    .map(() => Array(heights[0].length).fill(false));

  for (const y of range(heights, Direction.Down)) {
    visibility[y][0] = true;
    visibility[y][heights[0].length - 1] = true;
  }

  for (const x of range(heights, Direction.Right)) {
    visibility[0][x] = true;
    visibility[heights.length - 1][x] = true;
  }

  const visible: number =
    2 * heights.length +
    2 * (heights[0].length - 2) +
    countVisibleAcrossAxis(heights, visibility, Direction.Down) +
    countVisibleAcrossAxis(heights, visibility, Direction.Right);

  return visible;
}

async function run() {
  const input = await readWholeFile(getInputPath(__dirname));

  const heights: number[][] = input
    .split('\n')
    .map((line) => line.split('').map((v) => +v));

  return countVisibleTrees(heights);
}

benchmark('day 08, star 1', run);
