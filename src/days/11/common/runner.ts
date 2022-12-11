import { calculateMonkeyBusiness } from './business';
import { Monkey } from './monkey';
import { fetchMonkeys } from './reader';
import { runRounds } from './rounds';

export async function runAlgorithm(
  rounds: number,
  losingInterest: boolean,
  dirname: string
): Promise<bigint> {
  const monkeys: Monkey[] = await fetchMonkeys(losingInterest, dirname);
  runRounds(monkeys, rounds);
  const monkeyBusiness = calculateMonkeyBusiness(monkeys);
  return monkeyBusiness;
}
