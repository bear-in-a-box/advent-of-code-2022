import { readWholeFile } from 'utils/reader';
import { getInputPath } from 'utils/argv';

import { Monkey } from './monkey';
import { parseOperation } from './operation';

export async function fetchMonkeys(dirname: string): Promise<Monkey[]> {
  const monkeys: Monkey[] = [];

  const input = await readWholeFile(getInputPath(dirname));
  const lines = input.split('\n');
  for (let line = 0; line < lines.length; line += 7) {
    const index = Number(lines[line].match(/\d+/)?.[0]);
    const items = [...lines[line + 1].matchAll(/\d+/g)].map(([v]) => Number(v));
    const operation = parseOperation(lines[line + 2]);
    const testDivisibleBy = Number(lines[line + 3].match(/\d+/)?.[0]!);
    const testTrueThrowTo = Number(lines[line + 4].match(/\d+/)?.[0]);
    const testFalseThrowTo = Number(lines[line + 5].match(/\d+/)?.[0]);
    monkeys.push(
      new Monkey(
        index,
        items,
        operation,
        testDivisibleBy,
        testTrueThrowTo,
        testFalseThrowTo
      )
    );
  }

  return monkeys;
}
