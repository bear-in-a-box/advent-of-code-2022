import { benchmark } from 'utils/benchmark';
import { readWholeFile } from 'utils/reader';
import { getInputPath } from 'utils/argv';

type Line = Array<number | Line>;

function compare(
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
      const result = compare(argA, argB, debug);
      if (typeof result === 'boolean') {
        return result;
      }
    }
  }
}

async function run() {
  const debug = false;

  const dividerPackets = [[[2]], [[6]]];

  const input = await readWholeFile(getInputPath(__dirname));

  const lines = input
    .split('\n')
    .filter((line) => line.length !== 0)
    .map((line) => JSON.parse(line) as Line);
  lines.push(...dividerPackets);

  const sorted = lines.sort((a, b) => {
    const comparison = compare(a, b, debug);
    switch (comparison) {
      case true:
        return -1;
      case false:
        return 1;
      case undefined:
        return 0;
    }
  });

  debug && console.log(sorted.map((v) => JSON.stringify(v)).join('\n'));

  const indexes = dividerPackets.map((packet) => sorted.indexOf(packet) + 1);

  return indexes[0] * indexes[1];
}

benchmark('day 13, star 2', run);
