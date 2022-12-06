import { benchmark } from 'utils/benchmark';

import { runForLength } from './common';

const run = () => runForLength(4);

benchmark('day 06, star 1', run);
