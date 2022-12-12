import { getInputPath } from 'utils/argv';
import { readWholeFile } from 'utils/reader';

import { createGraph, fillNeighbors, findEndNodes } from './graph';
import { GraphStrategy } from './strategy';

export async function runAlgorithm(strategy: GraphStrategy, dirname: string) {
  const input = await readWholeFile(getInputPath(dirname));
  const { nodes, start, end } = createGraph(
    input.split('\n').map((v) => v.split(''))
  );
  fillNeighbors(nodes, strategy);
  const [result] = findEndNodes(
    strategy.getStartNode({ nodes, start, end }),
    strategy
  )
    .map(({ cost }) => cost)
    .sort((a, b) => a - b);
  return result;
}
