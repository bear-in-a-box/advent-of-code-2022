export class Bitset {
  private value: bigint;

  constructor(value: bigint = 0n) {
    this.value = value;
  }

  set(bit: number) {
    this.value |= 1n << BigInt(bit);
    return this;
  }

  clear(bit: number) {
    this.value &= 1n << BigInt(bit);
    return this;
  }

  test(bit: number): boolean {
    const bitValue = 1n << BigInt(bit);
    return (this.value & bitValue) === bitValue;
  }

  and(other: Bitset): Bitset {
    return new Bitset(this.value & other.value);
  }

  equals(other: Bitset): boolean {
    return this.value === other.value;
  }

  isEmpty(): boolean {
    return this.value === 0n;
  }

  toBigInt(): BigInt {
    return this.value.valueOf();
  }
}
