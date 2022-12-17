import { Coords, LineShape, Node } from './algorithm';

export class AlgorithmStar2 {
  private readonly board = new Map<number, Map<number, Node>>();
  private readonly height: number;

  constructor(private readonly startingPoint: Coords, rock: LineShape[]) {
    this.createBoard(rock);
    this.height = AlgorithmStar2.calculateHeight(rock);
  }

  run() {
    let sandNodes: number = 0;
    while (this.dropSand()) {
      sandNodes++;
    }
    this.showBoard();
    return sandNodes;
  }

  private dropSand(): boolean {
    let [x, y] = this.startingPoint;
    if (!this.isEmpty(x, y)) {
      return false;
    }
    while (true) {
      if (this.isPlaceToFallDown(x, y)) {
        y++;
        continue;
      }
      if (this.isPlaceToFallLeft(x, y)) {
        x--;
        y++;
        continue;
      }
      if (this.isPlaceToFallRight(x, y)) {
        x++;
        y++;
        continue;
      }
      this.markSand(x, y);
      return true;
    }
  }

  private isPlaceToFallDown(x: number, y: number): boolean {
    return this.isEmpty(x, y + 1);
  }

  private isPlaceToFallLeft(x: number, y: number): boolean {
    return this.isEmpty(x - 1, y + 1);
  }

  private isPlaceToFallRight(x: number, y: number): boolean {
    return this.isEmpty(x + 1, y + 1);
  }

  private isEmpty(x: number, y: number): boolean {
    return [Node.Empty, Node.Start, undefined].includes(this.get(x, y));
  }

  private get(x: number, y: number): Node {
    if (y === this.height + 1) {
      return Node.Rock;
    }
    return this.board.get(y)?.get(x) ?? Node.Empty;
  }

  private set(x: number, y: number, node: Node) {
    if (!this.board.has(y)) {
      this.board.set(y, new Map());
    }
    this.board.get(y)!.set(x, node);
  }

  private markSand(x: number, y: number) {
    this.set(x, y, Node.Sand);
  }

  private showBoard() {
    // @todo some day maybe
  }

  private createBoard(rock: LineShape[]) {
    for (const shape of rock) {
      for (let i = 1; i < shape.length; i++) {
        const a = shape[i - 1];
        const b = shape[i];
        this.drawLine(a, b);
      }
    }
    this.set(this.startingPoint[0], this.startingPoint[1], Node.Start);
  }

  private drawLine(a: Coords, b: Coords) {
    if (a[1] === b[1]) {
      for (let x = Math.min(a[0], b[0]); x <= Math.max(a[0], b[0]); x++) {
        this.set(x, a[1], Node.Rock);
      }
    } else if (a[0] === b[0]) {
      for (let y = Math.min(a[1], b[1]); y <= Math.max(a[1], b[1]); y++) {
        this.set(a[0], y, Node.Rock);
      }
    }
  }

  private static calculateHeight(rock: LineShape[]) {
    return Math.max(...rock.flatMap((shape) => shape.map(([, y]) => y))) + 1;
  }
}
