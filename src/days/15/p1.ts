import { benchmark } from 'utils/benchmark';
import { readLineByLine } from 'utils/reader';
import { getInputPath } from 'utils/argv';

type Coords = [number, number];
type Sensor = {
  x: number;
  y: number;
  coverage: number;
};

class Board {
  private readonly sensors: Sensor[] = [];
  private readonly beacons: Coords[] = [];
  private minX: number = Infinity;
  private maxX: number = -Infinity;

  takeReading(sensor: Coords, beacon: Coords) {
    const coverage = Board.distance(sensor, beacon);

    const [x, y] = sensor;
    this.sensors.push({ x, y, coverage });
    this.beacons.push(beacon);

    const [beaconX] = beacon;
    const minX = Math.min(x - coverage, beaconX);
    const maxX = Math.max(x + coverage, beaconX);

    if (minX < this.minX) {
      this.minX = minX;
    }
    if (maxX > this.maxX) {
      this.maxX = maxX;
    }
  }

  getDefinitelyEmptyPositions(y: number): number {
    let result = 0;
    for (let x = this.minX; x <= this.maxX; x++) {
      if (this.isDefinitelyEmpty([x, y])) {
        result++;
      }
    }
    return result;
  }

  private isDefinitelyEmpty(point: Coords): boolean {
    if (
      this.beacons.some(([x, y]) => x === point[0] && y == point[1]) ||
      this.sensors.some(({ x, y }) => x === point[0] && y === point[1])
    ) {
      return false;
    }
    if (
      this.sensors.find(
        ({ x, y, coverage }) => Board.distance(point, [x, y]) <= coverage
      )
    ) {
      return true;
    }
    return false;
  }

  private static distance([x1, y1]: Coords, [x2, y2]: Coords): number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }
}

async function run() {
  const board = new Board();

  const onLine = (line: string) => {
    const { sensorX, sensorY, beaconX, beaconY } = line.match(
      /^Sensor at x=(?<sensorX>[\d-]+), y=(?<sensorY>[\d-]+): closest beacon is at x=(?<beaconX>[\d-]+), y=(?<beaconY>[\d-]+)$/
    )!.groups!;
    board.takeReading([+sensorX, +sensorY], [+beaconX, +beaconY]);
  };

  await readLineByLine(getInputPath(__dirname), { onLine });

  return board.getDefinitelyEmptyPositions(+process.argv.pop()!);
}

benchmark('day 15, star 1', run);
