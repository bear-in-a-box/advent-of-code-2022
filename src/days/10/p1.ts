import { benchmark } from 'utils/benchmark';
import { readLineByLine } from 'utils/reader';
import { getInputPath } from 'utils/argv';

import { CPU } from './p1/cpu';

async function run() {
  let sumOfStrengths: number = 0;

  const cpu = new CPU((strength) => (sumOfStrengths += strength));

  await readLineByLine(getInputPath(__dirname), {
    onLine: (line) => {
      cpu.runInstruction(line);
    },
  });

  return sumOfStrengths;
}

benchmark('day 10, star 1', run);
