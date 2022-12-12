import { benchmark } from 'utils/benchmark';

import { GraphStrategy } from './common/strategy';
import { runAlgorithm } from './common/runner';

async function run() {
  const strategy: GraphStrategy = {
    canGoThere(a, b) {
      return b.elevation + 1 >= a.elevation;
    },
    isEndNode(node) {
      return node.elevation === 0;
    },
    getStartNode({ end }) {
      return end;
    },
  };
  return runAlgorithm(strategy, __dirname);
}

benchmark('day 12, star 2', run);
