import { benchmark } from 'utils/benchmark';
import { readWholeFile } from 'utils/reader';
import { getInputPath } from 'utils/argv';

type Line = Array<number | Line>;

function isPairInRightOrder(
  a: Line,
  b: Line,
  debug: boolean = false
): boolean | undefined {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const itemA = a[i];
    const itemB = b[i];
    debug &&
      console.log(
        `Comparing ${JSON.stringify(itemA)} with ${JSON.stringify(itemB)}`
      );

    if (itemA === undefined) {
      return true;
    }
    if (itemB === undefined) {
      return false;
    }

    if (typeof itemA === 'number' && typeof itemB === 'number') {
      if (itemA === itemB) {
        continue;
      }
      return itemA < itemB;
    } else {
      const argA = typeof itemA === 'number' ? [itemA] : itemA;
      const argB = typeof itemB === 'number' ? [itemB] : itemB;
      const result = isPairInRightOrder(argA, argB, debug);
      if (typeof result === 'boolean') {
        return result;
      }
    }
  }
}

async function run() {
  let rightPairs: number = 0;
  const debug = false;

  const input = await readWholeFile(getInputPath(__dirname));

  const pairs = input
    .split('\n\n')
    .map((pair) =>
      pair.split('\n').map((line) => JSON.parse(line) as Line)
    ) as [Line, Line][];

  pairs.forEach(([a, b], i) => {
    debug && console.log(i + 1, JSON.stringify(a), JSON.stringify(b));
    if (isPairInRightOrder(a, b, debug) ?? true) {
      debug && console.log(`Pair ${i + 1} in the right order`);
      rightPairs += i + 1;
    }
  });

  return rightPairs;
}

benchmark('day 13, star 1', run);
