import { benchmark } from 'utils/benchmark';
import { readLineByLine } from 'utils/reader';
import { getInputPath } from 'utils/argv';

function getPriority(char: string): number {
  const code = char.charCodeAt(0);
  if (code >= 97) return code - 97 + 1;
  return code - 65 + 27;
}

function splitRucksack(contents: string): [string, string] {
  const pivot = contents.length / 2;
  return [contents.slice(0, pivot), contents.slice(pivot)];
}

function findCommonItem(compartments: [string, string]): string | undefined {
  return [].find.call(compartments[0], (c) => compartments[1].includes(c));
}

async function run() {
  let totalPriority: number = 0;

  const onLine = (line: string) => {
    const compartments = splitRucksack(line);
    const commonItem = findCommonItem(compartments);
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
