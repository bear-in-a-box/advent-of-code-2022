export type Coords = [number, number];
export type LineShape = Coords[];

const enum Node {
  Empty = '.',
  Rock = '#',
  Sand = 'o',
  Start = '+',
}

export class Algorithm {
  private readonly startingPoint: Coords;
  private readonly board: Node[][];

  constructor(startingPoint: Coords, rock: LineShape[]) {
    const { lines, deltaX } = Algorithm.normalizeRockLines(rock);
    this.startingPoint = [startingPoint[0] + deltaX, startingPoint[1]];
    this.board = Algorithm.createBoard(lines, this.startingPoint);
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
    while (true) {
      if (this.isOutOfBounds(x, y)) {
        return false;
      }
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

  private isOutOfBounds(x: number, y: number): boolean {
    return x < 0 || x >= this.board[0].length || y > this.board.length;
  }

  private isEmpty(x: number, y: number): boolean {
    return [Node.Empty, undefined].includes(this.board[y]?.[x]);
  }

  private markSand(x: number, y: number) {
    this.board[y][x] = Node.Sand;
  }

  private showBoard() {
    console.log(this.board.map((line) => line.join('')).join('\n'));
  }

  private static createBoard(rock: LineShape[], start: Coords): Node[][] {
    const width =
      Math.max(start[0], ...rock.flatMap((shape) => shape.map(([x]) => x))) + 1;
    const height =
      Math.max(...rock.flatMap((shape) => shape.map(([, y]) => y))) + 1;
    const board = Array(height)
      .fill(undefined)
      .map(() => Array(width).fill(Node.Empty));
    for (const shape of rock) {
      for (let i = 1; i < shape.length; i++) {
        const a = shape[i - 1];
        const b = shape[i];
        Algorithm.drawLine(a, b, board);
      }
    }
    board[start[1]][start[0]] = Node.Start;
    return board;
  }

  private static drawLine(a: Coords, b: Coords, board: Node[][]) {
    if (a[1] === b[1]) {
      for (let x = Math.min(a[0], b[0]); x <= Math.max(a[0], b[0]); x++) {
        board[a[1]][x] = Node.Rock;
      }
    } else if (a[0] === b[0]) {
      for (let y = Math.min(a[1], b[1]); y <= Math.max(a[1], b[1]); y++) {
        board[y][a[0]] = Node.Rock;
      }
    }
  }

  private static normalizeRockLines(rock: LineShape[]): {
    lines: LineShape[];
    deltaX: number;
  } {
    const minX = Math.min(...rock.flatMap((shape) => shape.map(([x]) => x)));
    return {
      deltaX: -minX,
      lines: rock.map((shape) => shape.map(([x, y]) => [x - minX, y])),
    };
  }
}
