import { Operation } from './operation';

export class Monkey {
  private readonly _inspect: Operation;
  private _inspections: number = 0;

  constructor(
    public readonly index: number,
    public readonly items: number[],
    inspect: Operation,
    private readonly testDivisibleBy: number,
    private readonly testTrueThrowTo: number,
    private readonly testFalseThrowTo: number,
    private readonly losingInterest: boolean
  ) {
    this._inspect = inspect;
  }

  getTestTargetMonkey(worryLevel: number): number {
    if (worryLevel % this.testDivisibleBy === 0) {
      return this.testTrueThrowTo;
    } else {
      return this.testFalseThrowTo;
    }
  }

  inspect(old: number): number {
    this._inspections++;
    return this._inspect(old);
  }

  loseInterest(item: number): number {
    if (!this.losingInterest) {
      return item;
    }
    return Math.floor(item / 3);
  }

  get inspections(): number {
    return this._inspections;
  }
}
