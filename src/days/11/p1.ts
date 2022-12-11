import { benchmark } from 'utils/benchmark';

import { runAlgorithm } from './common/runner';

async function run() {
  return await runAlgorithm(20, true, __dirname);
}

benchmark('day 11, star 1', run);
