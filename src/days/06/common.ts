import { readWholeFile } from 'utils/reader';
import { getInputPath } from 'utils/argv';
class Stats {
  private readonly letters = new Map<string, number>();

  increase(c: string): void {
    const current = this.letters.get(c) ?? 0;
    this.letters.set(c, current + 1);
  }

  decrease(c: string): void {
    if (!this.letters.has(c)) {
      return;
    }
    const current = this.letters.get(c)!;
    if (current === 1) {
      this.letters.delete(c);
    } else {
      this.letters.set(c, current - 1);
    }
  }

  get distinct(): boolean {
    for (const v of this.letters.values()) {
      if (v > 1) {
        return false;
      }
    }
    return true;
  }
}

function findMarkerIndex(input: string, length: number): number {
  const stats = new Stats();

  for (let i = 0; i < input.length; i++) {
    const current = input[i];
    stats.increase(current);
    if (i < length) {
      continue;
    }
    const tail = input[i - length];
    stats.decrease(tail);
    if (stats.distinct) {
      return i + 1;
    }
  }
  return -1;
}

export async function runForLength(length: number): Promise<number> {
  const input = await readWholeFile(getInputPath(__dirname));

  return findMarkerIndex(input, length);
}
