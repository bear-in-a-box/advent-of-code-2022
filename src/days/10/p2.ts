import { benchmark } from 'utils/benchmark';
import { readLineByLine } from 'utils/reader';
import { getInputPath } from 'utils/argv';

import { CPU, Instruction } from './p2/cpu';
import { Memory } from './p2/memory';
import { Clock } from './p2/clock';
import { Display } from './p2/display';

async function run() {
  const memory = new Memory();
  const cpu = new CPU(memory);
  const display = new Display(memory);

  const clock = new Clock();
  clock.addConnection(display);
  clock.addConnection(cpu);

  await readLineByLine(getInputPath(__dirname), {
    onLine: (line) => {
      const [name, ...args] = line.split(' ');
      cpu.enqueue(new Instruction(name, args));
    },
  });

  clock.run(240);

  return display.contents;
}

benchmark('day 10, star 2', run);
