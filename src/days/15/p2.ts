// NODE_OPTIONS=--max-old-space-size=16384

import { benchmark } from 'utils/benchmark';
import { readLineByLine } from 'utils/reader';
import { getInputPath } from 'utils/argv';

type Coords = [number, number];
type Sensor = {
  coords: Coords;
  coverage: number;
  border: Coords[];
};

class Board {
  private readonly sensors: Sensor[] = [];

  constructor(
    private readonly coordStart: number,
    private readonly coordEnd: number
  ) {}

  takeReading(sensor: Coords, beacon: Coords) {
    const distance = Board.distance(sensor, beacon);
    this.sensors.push({
      coords: sensor,
      coverage: distance,
      border: this.getBorder(sensor, distance + 1),
    });
  }

  findTuningFrequency() {
    const result = this.sensors
      .map((sensor) =>
        sensor.border
          .filter((point) => {
            const [x, y] = point;
            if (
              x < this.coordStart ||
              x > this.coordEnd ||
              y < this.coordStart ||
              y > this.coordEnd
            )
              return false;
            return this.sensors.every(
              (sensor) => Board.distance(point, sensor.coords) > sensor.coverage
            );
          })
          .map(([x, y]) => [x, y, x * 4000000 + y])
      )
      .filter((x) => x.length > 0);
    return result;
  }

  private getBorder([sX, sY]: Coords, r: number) {
    const border: Coords[] = [];
    border.push([sX - r, sY]);
    border.push([sX + r, sY]);
    border.push([sX, sY - 1]);
    border.push([sX, sY + 1]);
    for (let x = sX - r + 1, y = sY - 1; x <= sX - 1; x++, y--)
      border.push([x, y]);
    for (let x = sX - r + 1, y = sY + 1; x <= sX - 1; x++, y++)
      border.push([x, y]);
    for (let x = sX + 1, y = sY - r + 1; x <= sX + r - 1; x++, y++)
      border.push([x, y]);
    for (let x = sX + 1, y = sY + r - 1; x <= sX + r - 1; x++, y--)
      border.push([x, y]);
    return border;
  }

  private static distance([x1, y1]: Coords, [x2, y2]: Coords): number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }
}

async function run() {
  const range = () => +process.argv.pop()!;
  const rangeEnd = range();
  const rangeStart = range();
  const board = new Board(rangeStart, rangeEnd);

  const onLine = (line: string) => {
    const { sensorX, sensorY, beaconX, beaconY } = line.match(
      /^Sensor at x=(?<sensorX>[\d-]+), y=(?<sensorY>[\d-]+): closest beacon is at x=(?<beaconX>[\d-]+), y=(?<beaconY>[\d-]+)$/
    )!.groups!;
    board.takeReading([+sensorX, +sensorY], [+beaconX, +beaconY]);
  };

  await readLineByLine(getInputPath(__dirname), { onLine });

  return board.findTuningFrequency();
}

benchmark('day 15, star 2', run);
