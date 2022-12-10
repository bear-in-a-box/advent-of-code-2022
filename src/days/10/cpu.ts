const TICKS: Record<string, number> = {
  noop: 1,
  addx: 2,
};

export class CPU {
  private ticks: number = 0;
  private readonly registers: Record<string, number> = {
    x: 1,
  };

  constructor(
    public readonly signalStrengthReporter: (strength: number) => void
  ) {}

  public runInstruction(line: string) {
    const [instruction, ...args] = line.split(' ');
    const ticksNeeded = TICKS[instruction] ?? 0;
    let ticksPassed: number = 0;
    while (ticksPassed++ < ticksNeeded) {
      this.ticks++;
      this.reportSignalStrength();
    }
    this.effect(instruction, args);
  }

  private effect(instruction: string, args: string[]) {
    if (instruction === 'noop') {
      return;
    }
    if (instruction === 'addx') {
      const value = Number(args[0]);
      this.registers.x += value;
    }
  }

  private reportSignalStrength() {
    if ((this.ticks + 20) % 40 !== 0) {
      return;
    }
    this.signalStrengthReporter(this.ticks * this.registers.x);
  }
}
