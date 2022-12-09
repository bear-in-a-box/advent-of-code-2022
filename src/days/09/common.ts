export type Coords = { x: number; y: number };

export const enum Direction {
  Up = 'U',
  Right = 'R',
  Down = 'D',
  Left = 'L',
}

export class Visits {
  private readonly visited = new Set<string>();

  mark({ x, y }: Coords) {
    this.visited.add(this.getKey(x, y));
  }

  get count() {
    return this.visited.size;
  }

  private getKey(x: number, y: number): string {
    return `${x},${y}`;
  }
}

export class Rope {
  readonly head: Coords = { x: 0, y: 0 };
  readonly tail: Coords = { x: 0, y: 0 };
  readonly tailVisits = new Visits();

  constructor() {
    this.tailVisits.mark(this.tail);
  }

  move(direction: Direction, steps: number): void {
    while (steps--) {
      const last: Coords = { x: this.head.x, y: this.head.y };
      switch (direction) {
        case Direction.Up:
          this.head.y--;
          break;
        case Direction.Down:
          this.head.y++;
          break;
        case Direction.Left:
          this.head.x--;
          break;
        case Direction.Right:
          this.head.x++;
          break;
      }
      this.unstretch(last);
    }
  }

  private get length(): number {
    return Math.sqrt(
      Math.pow(this.tail.x - this.head.x, 2) +
        Math.pow(this.tail.y - this.head.y, 2)
    );
  }

  private unstretch(lastHeadPosition: Coords) {
    const length = this.length;
    if (length < 2) {
      return;
    }
    this.tail.x = lastHeadPosition.x;
    this.tail.y = lastHeadPosition.y;
    this.tailVisits.mark(this.tail);
  }
}
