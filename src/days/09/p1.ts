import { benchmark } from 'utils/benchmark';
import { readLineByLine } from 'utils/reader';
import { getInputPath } from 'utils/argv';

import { Direction, Rope } from './common';

async function run() {
  const rope = new Rope();

  await readLineByLine(getInputPath(__dirname), {
    onLine: (line) => {
      const [direction, steps] = line.split(' ', 2);
      rope.move(direction as Direction, +steps);
    },
  });

  return rope.tailVisits.count;
}

benchmark('day 09, star 1', run);
