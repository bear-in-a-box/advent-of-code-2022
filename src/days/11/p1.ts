import { benchmark } from 'utils/benchmark';

import { Monkey } from './common/monkey';
import { fetchMonkeys } from './common/reader';

async function run() {
  const monkeys: Monkey[] = await fetchMonkeys(__dirname);

  for (let round = 1; round <= 20; round++) {
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

  const monkeyBusiness = monkeys
    .sort((a, b) => b.inspections - a.inspections)
    .slice(0, 2)
    .reduce((acc, { inspections }) => acc * inspections, 1);

  return monkeyBusiness;
}

benchmark('day 11, star 1', run);
