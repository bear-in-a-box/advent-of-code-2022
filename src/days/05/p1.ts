import { benchmark } from 'utils/benchmark';
import { readLineByLine } from 'utils/reader';
import { getInputPath } from 'utils/argv';

import type { Arrangement } from './common';
import {
  addToStack,
  ensureStackExists,
  parseMoveLine,
  parseStackLine,
  readMessage,
} from './common';

function move(
  arrangement: Arrangement,
  from: number,
  to: number,
  count: number = 1
) {
  ensureStackExists(arrangement, from);
  ensureStackExists(arrangement, to);
  while (count-- > 0) {
    const popped = arrangement[from].pop();
    if (popped) {
      arrangement[to].push(popped);
    }
  }
}

async function run() {
  let lines = {
    size: NaN,
    stacks: Array<string>(),
    readingStacks: true,
  };
  const arrangement: Arrangement = {};

  const finishReadingStacks = () => {
    lines.readingStacks = false;
  };

  const onLine = (line: string) => {
    if (line.length === 0) {
      return finishReadingStacks();
    }
    if (!lines.readingStacks) {
      const { from, to, count } = parseMoveLine(line);
      return move(arrangement, from, to, count);
    }
    if (isNaN(lines.size)) {
      lines.size = Math.ceil(line.length / 4);
    }
    const stackLevel = parseStackLine(line);
    for (const { content, index } of stackLevel) {
      addToStack(arrangement, index, content);
    }
  };

  await readLineByLine(getInputPath(__dirname), { onLine });

  const message = readMessage(arrangement, lines.size);

  return message;
}

benchmark('day 05, star 1', run);
