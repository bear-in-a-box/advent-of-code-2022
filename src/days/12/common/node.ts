export const enum NodeType {
  Start,
  Path,
  End,
}

export class Node {
  visited: boolean = false;
  cost: number = Infinity;
  readonly neighbors: Node[] = [];

  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly type: NodeType,
    public readonly elevation: number
  ) {}
}
