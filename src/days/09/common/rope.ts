import { stepAfterKey } from 'utils/steps';

import { Visits } from './visits';
import { Coords, Direction } from './types';
import { calculateMoveVector } from './utils';

export class Rope {
  readonly head: Coords = { x: 0, y: 0 };
  readonly tailNodes: Coords[] = [];
  readonly tailVisits = new Visits();

  constructor(private readonly tailLength: number) {
    this.tailVisits.mark(this.head);
    this.tailNodes.push(
      ...Array(this.tailLength)
        .fill(undefined)
        .map(() => ({ x: 0, y: 0 }))
    );
  }

  async move(direction: Direction, steps: number): Promise<void> {
    if (process.env.DEBUG === '1') {
      console.log('Move in direction', direction, steps);
    }
    while (steps--) {
      const last: Coords = { ...this.head };
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
      this.unstretch();
    }
    if (process.env.DEBUG === '1') {
      await this.drawAndWait(-20, -15, 20, 10);
    }
  }

  private unstretch() {
    for (let i = 0; i < this.tailNodes.length; i++) {
      const current = this.tailNodes[i];
      const previous = i === 0 ? this.head : this.tailNodes[i - 1];
      const vector = calculateMoveVector(current, previous);
      current.x += vector.x;
      current.y += vector.y;
    }
    this.tailVisits.mark(this.tailNodes[this.tailNodes.length - 1]);
  }

  private async drawAndWait(
    xFrom?: number,
    yFrom?: number,
    xTo?: number,
    yTo?: number
  ) {
    const nodes = [this.head, ...this.tailNodes];
    const xMin = xFrom ?? Math.min(...nodes.map(({ x }) => x));
    const xMax = xTo ?? Math.max(...nodes.map(({ x }) => x));
    const yMin = yFrom ?? Math.min(...nodes.map(({ y }) => y));
    const yMax = yTo ?? Math.max(...nodes.map(({ y }) => y));
    for (let y = yMin; y <= yMax; y++) {
      let line: string = '';
      for (let x = xMin; x <= xMax; x++) {
        if (nodes.find(({ x: _x, y: _y }) => _x === x && _y === y)) {
          line += '#';
        } else {
          line += '.';
        }
      }
      console.log(line);
    }
    await stepAfterKey();
  }
}
