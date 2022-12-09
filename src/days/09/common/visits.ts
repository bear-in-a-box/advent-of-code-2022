import { Coords } from './types';

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
