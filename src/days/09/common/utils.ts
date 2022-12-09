import { clamp } from 'utils/numbers';

import { Coords } from './types';

function calculateLength(a: Coords, b: Coords): number {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export function calculateMoveVector(a: Coords, b: Coords): Coords {
  const length = calculateLength(a, b);
  if (length < 2) {
    return { x: 0, y: 0 };
  }
  const xDelta = b.x - a.x;
  const yDelta = b.y - a.y;
  return {
    x: clamp(xDelta, -1, 1),
    y: clamp(yDelta, -1, 1),
  };
}
