import { benchmark } from 'utils/benchmark';
import { readLineByLine } from 'utils/reader';
import { getInputPath } from 'utils/argv';

import { Directory } from './common/node';
import { FS } from './common/fs';
import { dfs } from './common/dfs';

async function run() {
  const fs = new FS();
  const totalSpace = 70_000_000n;
  const neededSpace = 30_000_000n;

  const findDirSizeToDelete = (): bigint | undefined => {
    const freeSpace: bigint = totalSpace - fs.root.size;

    let minSpaceToDelete: bigint | undefined = undefined;

    const check = (current: Directory) => {
      if (freeSpace + current.size < neededSpace) {
        return;
      }
      if (minSpaceToDelete === undefined || current.size < minSpaceToDelete) {
        minSpaceToDelete = current.size;
      }
    };

    dfs(fs.root, check);

    return minSpaceToDelete;
  };

  await readLineByLine(getInputPath(__dirname), {
    onLine: (line) => fs.parseCommand(line),
  });

  return findDirSizeToDelete();
}

benchmark('day 07, star 2', run);
