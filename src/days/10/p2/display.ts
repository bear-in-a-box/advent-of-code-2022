import { Clocked } from './clock';
import { Memory } from './memory';

export class Display implements Clocked {
  private readonly pixels: boolean[] = [];

  constructor(private readonly memory: Memory) {}

  onTick(tick: number) {
    const spritePosition = this.memory.x;
    const rayPosition = tick % 40;
    this.pixels.push(
      rayPosition >= spritePosition - 1 && rayPosition <= spritePosition + 1
    );
  }

  get contents(): string {
    const lines: string[] = [];
    for (let i = 0; i < this.pixels.length; i += 40) {
      const line = this.pixels.slice(i, i + 40);
      lines.push(line.map((x) => (x ? '#' : '.')).join(''));
    }
    return '\n' + lines.join('\n');
  }
}
