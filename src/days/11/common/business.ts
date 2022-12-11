import { Monkey } from './monkey';

export function calculateMonkeyBusiness(monkeys: Monkey[]): bigint {
  return monkeys
    .sort((a, b) => {
      if (a.inspections > b.inspections) {
        return -1;
      }
      if (b.inspections > a.inspections) {
        return 1;
      }
      return 0;
    })
    .slice(0, 2)
    .reduce((acc, { inspections }) => acc * BigInt(inspections), 1n);
}
