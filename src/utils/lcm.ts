import { gcd } from './gcd';

export function lcm(...args: number[]): number {
  let x: number = args[0];
  for (const v of args.slice(1)) {
    x = (x * v) / gcd(x, v);
  }
  return x;
}
