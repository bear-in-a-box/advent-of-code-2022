export class Bitset {
  private value: bigint;

  constructor(value: bigint = 0n) {
    this.value = value;
  }

  set(bit: number) {
    this.value |= 1n << BigInt(bit);
    return this;
  }

  and(other: Bitset): Bitset {
    return new Bitset(this.value & other.value);
  }

  equals(other: Bitset): boolean {
    return this.value === other.value;
  }

  get isEmpty(): boolean {
    return this.value === 0n;
  }
}
