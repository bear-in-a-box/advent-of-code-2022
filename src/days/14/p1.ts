import { benchmark } from 'utils/benchmark';
import { readWholeFile } from 'utils/reader';
import { getInputPath } from 'utils/argv';
import { Algorithm, Coords, LineShape } from './algorithm';

async function run() {
  const input = await readWholeFile(getInputPath(__dirname));
  const rawLines = input.split('\n');
  const lines: LineShape[] = rawLines.map((line) =>
    line
      .split(' -> ')
      .map((coords) => coords.split(',', 2).map((v) => +v) as Coords)
  );
  const algorithm = new Algorithm([500, 0], lines);

  return algorithm.run();
}

benchmark('day 14, star 1', run);
