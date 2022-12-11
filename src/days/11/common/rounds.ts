import { Monkey } from './monkey';

export function runRounds(monkeys: Monkey[], n: number) {
  while (n-- > 0) {
    for (const monkey of monkeys) {
      while (monkey.items.length > 0) {
        const base = monkey.items.pop()!;
        const afterInspect = monkey.inspect(base);
        const afterBore = monkey.loseInterest(afterInspect);
        const targetMonkey = monkeys[monkey.getTestTargetMonkey(afterBore)];
        targetMonkey.items.push(afterBore);
      }
    }
  }
}
