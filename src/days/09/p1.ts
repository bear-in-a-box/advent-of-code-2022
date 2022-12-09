import { benchmark } from 'utils/benchmark';

import { runAlgorithm } from './runner';

async function run() {
  return await runAlgorithm(1);
}

benchmark('day 09, star 1', run);
