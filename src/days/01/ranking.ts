export class Ranking {
  private data: number[] = [];

  constructor(private capacity: number) {}

  add(value: number) {
    const index = this.findIndex(value);
    this.data.splice(index, 0, value);
    this.limit();
  }

  private findIndex(value: number): number {
    if (this.data.length === 0) {
      return 0;
    }
    const index = this.data.findIndex((v) => v < value);
    if (index === -1) {
      return this.data.length;
    }
    return index;
  }

  private limit() {
    if (this.data.length > this.capacity) {
      this.data.length = this.capacity;
    }
  }

  sum() {
    return this.data.reduce((acc, v) => acc + v, 0);
  }
}
