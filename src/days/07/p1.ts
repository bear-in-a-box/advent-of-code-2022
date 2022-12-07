import { benchmark } from 'utils/benchmark';
import { readLineByLine } from 'utils/reader';
import { getInputPath } from 'utils/argv';

import { Directory } from './common/node';
import { FS } from './common/fs';
import { dfs } from './common/dfs';

async function run() {
  const fs = new FS();

  const sumQualifyingSizes = (limit: bigint): bigint => {
    let sum: bigint = 0n;

    const check = (dir: Directory) => {
      if (dir.size <= limit) {
        sum += dir.size;
      }
    };

    dfs(fs.root, check);

    return sum;
  };

  await readLineByLine(getInputPath(__dirname), {
    onLine: (line) => fs.parseCommand(line),
  });

  return sumQualifyingSizes(100_000n);
}

benchmark('day 07, star 1', run);
