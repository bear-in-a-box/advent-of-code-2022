import { benchmark } from 'utils/benchmark';
import { readLineByLine } from 'utils/reader';
import { getInputPath } from 'utils/argv';

async function run() {
  let max: number = -Infinity;
  let current: number = 0;

  const backpackEnded = () => {
    if (current > max) {
      max = current;
    }
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

  return max;
}

benchmark('day 01, star 1', run);
