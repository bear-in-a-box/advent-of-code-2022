import { Node, NodeType } from './node';
import { GraphStrategy } from './strategy';

function getNodeType(letter: string): NodeType {
  if (letter === 'S') {
    return NodeType.Start;
  }
  if (letter === 'E') {
    return NodeType.End;
  }
  return NodeType.Path;
}

function getElevationValue(letter: string): number {
  if (letter === 'S') {
    return getElevationValue('a');
  }
  if (letter === 'E') {
    return getElevationValue('z');
  }
  return letter.charCodeAt(0) - 'a'.charCodeAt(0);
}

export function createGraph(input: string[][]): {
  nodes: Node[][];
  start: Node;
  end: Node;
} {
  let start: Node | undefined;
  let end: Node | undefined;
  const nodes: Node[][] = input.map((line, y) =>
    line.map((v, x) => {
      const type = getNodeType(v);
      const elevation = getElevationValue(v);
      const node: Node = new Node(x, y, type, elevation);
      if (!start && type === NodeType.Start) {
        start = node;
      }
      if (!end && type === NodeType.End) {
        end = node;
      }
      return node;
    })
  );
  if (!start) {
    throw new Error('Invalid graph, no start point');
  }
  if (!end) {
    throw new Error('Invalid graph, no end point');
  }
  return { nodes, start, end };
}

export function fillNeighbors(nodes: Node[][], strategy: GraphStrategy) {
  for (let y = 0; y < nodes.length; y++) {
    const line = nodes[y];
    for (let x = 0; x < line.length; x++) {
      const node = line[x];

      const up = nodes[y - 1]?.[x];
      const down = nodes[y + 1]?.[x];
      const left = nodes[y][x - 1];
      const right = nodes[y][x + 1];

      for (const candidate of [up, down, left, right]) {
        if (!candidate) {
          continue;
        }
        if (strategy.canGoThere(node, candidate)) {
          node.neighbors.push(candidate);
        }
      }
    }
  }
}

export function findEndNodes(start: Node, strategy: GraphStrategy): Node[] {
  const results: Node[] = [];
  const queue: Node[] = [start];
  start.visited = true;
  start.cost = 0;
  while (queue.length !== 0) {
    const node = queue.shift()!;
    for (const neighbor of node.neighbors) {
      if (neighbor.visited) {
        continue;
      }
      neighbor.visited = true;
      if (node.cost + 1 < neighbor.cost) {
        neighbor.cost = node.cost + 1;
      }
      if (strategy.isEndNode(neighbor)) {
        results.push(neighbor);
        continue;
      }
      queue.push(neighbor);
    }
  }
  return results;
}
