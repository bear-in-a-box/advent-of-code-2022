import { lcm } from 'utils/lcm';

import { calculateMonkeyBusiness } from './business';
import { Monkey } from './monkey';
import { fetchMonkeys } from './reader';
import { runRounds } from './rounds';

export async function runAlgorithm(
  rounds: number,
  losingInterest: boolean,
  dirname: string
): Promise<bigint> {
  const monkeys: Monkey[] = await fetchMonkeys(dirname);
  const commonDivisor = lcm(
    ...monkeys.map(({ testDivisibleBy }) => testDivisibleBy)
  );
  for (const monkey of monkeys) {
    if (!losingInterest) {
      monkey.losingInterest = false;
    }
    monkey.commonDivisor = commonDivisor;
  }
  runRounds(monkeys, rounds);
  const monkeyBusiness = calculateMonkeyBusiness(monkeys);
  return monkeyBusiness;
}
