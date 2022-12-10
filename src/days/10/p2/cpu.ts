import { Clocked } from './clock';
import { Memory } from './memory';

const TICKS: Record<string, number> = {
  noop: 1,
  addx: 2,
};

export class Instruction {
  private ticks: number;

  constructor(public readonly name: string, public readonly args: string[]) {
    this.ticks = TICKS[name] ?? 1;
  }

  tick() {
    this.ticks--;
  }

  get done() {
    return this.ticks === 0;
  }
}

export class CPU implements Clocked {
  currentInstruction: Instruction | undefined;
  readonly queue: Instruction[] = [];

  constructor(private readonly memory: Memory) {}

  enqueue(instruction: Instruction) {
    this.queue.push(instruction);
  }

  onTick() {
    if (!this.currentInstruction) this.currentInstruction = this.queue.shift();
    if (!this.currentInstruction) return;

    this.currentInstruction.tick();
    if (this.currentInstruction.done) {
      this.effect(this.currentInstruction);
      this.currentInstruction = undefined;
    }
  }

  private effect({ name, args }: Instruction) {
    if (name === 'noop') {
      return;
    }
    if (name === 'addx') {
      const value = Number(args[0]);
      this.memory.x += value;
    }
  }
}
