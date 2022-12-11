import { benchmark } from 'utils/benchmark';

import { runAlgorithm } from './common/runner';

async function run() {
  return await runAlgorithm(10_000, false, __dirname);
}

benchmark('day 11, star 2', run);
