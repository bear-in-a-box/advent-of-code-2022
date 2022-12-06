import { benchmark } from 'utils/benchmark';

import { runForLength } from './common';

const run = () => runForLength(14);

benchmark('day 06, star 2', run);
