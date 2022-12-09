import { benchmark } from 'utils/benchmark';

import { runAlgorithm } from './runner';

async function run() {
  return await runAlgorithm(9);
}

benchmark('day 09, star 2', run);
