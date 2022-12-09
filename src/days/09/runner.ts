import { getInputPath } from 'utils/argv';
import { readWholeFile } from 'utils/reader';

import { Rope } from './common/rope';
import { Direction } from './common/types';

export async function runAlgorithm(tailLength: number): Promise<number> {
  const rope = new Rope(tailLength);

  const input = await readWholeFile(getInputPath(__dirname));
  const moves = input.split('\n').map((line) => line.split(' ', 2));

  for (const [direction, steps] of moves) {
    await rope.move(direction as Direction, +steps);
  }

  return rope.tailVisits.count;
}
