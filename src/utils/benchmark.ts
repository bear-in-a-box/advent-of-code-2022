import { hrtime } from 'node:process';

export type Task<T> = () => T;

export type Snapshot = {
  time: bigint;
  memory: number;
};

const snapshot = (): Snapshot => ({
  time: hrtime.bigint(),
  memory: process.memoryUsage().rss,
});

const diff = (start: Snapshot, end: Snapshot): Snapshot => ({
  time: end.time - start.time,
  memory: end.memory - start.memory,
});

export async function benchmark<T>(name: string, task: Task<T>): Promise<T> {
  const start = snapshot();
  const result = await task();
  const end = snapshot();
  const stats = diff(start, end);
  console.log('Task:', name);
  console.log('Time spent:', (stats.time / 1000n).toString(), 'us');
  console.log('Memory used:', stats.memory.toString(), 'B');
  console.log('Result:', result);
  return result;
}
