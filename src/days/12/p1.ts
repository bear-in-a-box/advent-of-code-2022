import { benchmark } from 'utils/benchmark';

import { GraphStrategy } from './common/strategy';
import { NodeType } from './common/node';
import { runAlgorithm } from './common/runner';

async function run() {
  const strategy: GraphStrategy = {
    canGoThere(a, b) {
      return a.elevation + 1 >= b.elevation;
    },
    isEndNode(node) {
      return node.type === NodeType.End;
    },
    getStartNode({ start }) {
      return start;
    },
  };
  return runAlgorithm(strategy, __dirname);
}

benchmark('day 12, star 1', run);
