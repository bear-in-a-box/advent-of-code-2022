import { benchmark } from 'utils/benchmark';
import { readWholeFile } from 'utils/reader';
import { getInputPath } from 'utils/argv';
import { Coords, LineShape } from './algorithm';
import { AlgorithmStar2 } from './algorithm-star2';

async function run() {
  const input = await readWholeFile(getInputPath(__dirname));
  const rawLines = input.split('\n');
  const lines: LineShape[] = rawLines.map((line) =>
    line
      .split(' -> ')
      .map((coords) => coords.split(',', 2).map((v) => +v) as Coords)
  );
  const algorithm = new AlgorithmStar2([500, 0], lines);

  return algorithm.run();
}

benchmark('day 14, star 2', run);
