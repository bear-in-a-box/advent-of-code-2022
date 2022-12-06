import { benchmark } from 'utils/benchmark';
import { readWholeFile } from 'utils/reader';
import { getInputPath } from 'utils/argv';

import { findMarkerIndex } from './common';

async function run() {
  const input = await readWholeFile(getInputPath(__dirname));

  return findMarkerIndex(input, 14);
}

benchmark('day 06, star 2', run);
