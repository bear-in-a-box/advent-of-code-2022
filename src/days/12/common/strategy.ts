import { Node } from './node';

export type GraphStrategy = {
  canGoThere(a: Node, b: Node): boolean;
  isEndNode(node: Node): boolean;
  getStartNode(options: { nodes: Node[][]; start: Node; end: Node }): Node;
};
