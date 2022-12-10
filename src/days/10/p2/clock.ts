export interface Clocked {
  onTick(tick: number): void;
}

export class Clock {
  private ticks: number = 0;
  private connections: Clocked[] = [];

  addConnection(connection: Clocked) {
    this.connections.push(connection);
  }

  run(limit: number) {
    for (this.ticks = 0; this.ticks < limit; this.ticks++) {
      for (const connection of this.connections) {
        connection.onTick(this.ticks);
      }
    }
  }
}
