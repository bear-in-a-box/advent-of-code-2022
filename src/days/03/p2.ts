import { benchmark } from 'utils/benchmark';
import { readLineByLine } from 'utils/reader';
import { getInputPath } from 'utils/argv';

function getPriority(char: string): number {
  const code = char.charCodeAt(0);
  if (code >= 97) return code - 97 + 1;
  return code - 65 + 27;
}

function findCommonItem(rucksacks: string[]): string | undefined {
  const [first, ...rest] = rucksacks;
  return [].find.call(first, (c) => rest.every((r) => r.includes(c)));
}

async function run() {
  let totalPriority: number = 0;

  const rucksacks: string[] = [];

  const onLine = (line: string) => {
    rucksacks.push(line);
    if (rucksacks.length < 3) {
      return;
    }
    const commonItem = findCommonItem(rucksacks);
    rucksacks.length = 0;
    if (commonItem === undefined) {
      return;
    }
    const priority = getPriority(commonItem);
    totalPriority += priority;
  };

  await readLineByLine(getInputPath(__dirname), { onLine });

  return totalPriority;
}

benchmark('day 03, star 1', run);
