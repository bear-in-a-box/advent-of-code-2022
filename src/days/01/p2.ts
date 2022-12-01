import { benchmark } from 'utils/benchmark';
import { readLineByLine } from 'utils/reader';
import { getInputPath } from 'utils/argv';

import { Ranking } from './ranking';

async function run() {
  const ranking = new Ranking(3);
  let current: number = 0;

  const backpackEnded = () => {
    ranking.add(current);
    current = 0;
  };

  const appendNextFood = (calories: number) => {
    current += calories;
  };

  const onLine = (line: string) => {
    if (line.length === 0) {
      backpackEnded();
      return;
    }
    appendNextFood(+line);
  };

  await readLineByLine(getInputPath(__dirname), {
    onLine,
    onFinish: backpackEnded,
  });

  return ranking.sum();
}

benchmark('day 01, star 2', run);
