export interface Node {
  readonly name: string;
  parent: Directory | undefined;
  size: bigint;
}

export class File implements Node {
  parent: Directory | undefined;

  constructor(public readonly name: string, public readonly size: bigint) {}
}

export class Directory implements Node {
  parent: Directory | undefined;
  readonly children = new Map<string, Node>();
  _size: bigint = 0n;

  public get size() {
    return this._size;
  }

  constructor(public readonly name: string) {}

  addChild(node: Node) {
    this.children.set(node.name, node);
    node.parent = this;
    this.reportSizeDelta(node.size);
  }

  private reportSizeDelta(value: bigint) {
    this._size += value;
    this.parent?.reportSizeDelta(value);
  }
}
