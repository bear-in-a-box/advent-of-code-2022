import { benchmark } from 'utils/benchmark';
import { readLineByLine } from 'utils/reader';
import { getInputPath } from 'utils/argv';
import { Bitset } from './bitset';

type Section = [number, number];
type Pair<T> = [T, T];

function parseSections(line: string): Pair<Section> {
  const validate = (input: number[][]): input is Pair<Section> => {
    return input.length === 2 && input.every((pair) => pair.length === 2);
  };
  const value = line.split(',').map((pair) => pair.split('-').map((v) => +v));
  if (!validate(value)) {
    throw new Error(`Invalid input: "${line}"`);
  }
  return value;
}

function createBitsetForElf(section: Section): Bitset {
  const bitset = new Bitset();
  for (let i = section[0]; i <= section[1]; i++) {
    bitset.set(i);
  }
  return bitset;
}

function isPairOverlapping(elves: Pair<Section>): boolean {
  const [elfA, elfB] = elves.map(createBitsetForElf);
  return !elfA.and(elfB).isEmpty();
}

async function run() {
  let redundantPairs: number = 0;

  const onLine = (line: string) => {
    const sections = parseSections(line);
    if (isPairOverlapping(sections)) {
      redundantPairs++;
    }
  };

  await readLineByLine(getInputPath(__dirname), { onLine });

  return redundantPairs;
}

benchmark('day 04, star 2', run);
