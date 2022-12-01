import { hrtime } from 'node:process';

export type Task<T> = () => T;

export type Snapshot = {
  time: bigint;
  rss: number;
  heap: number;
};

const snapshot = (): Snapshot => ({
  time: hrtime.bigint(),
  rss: process.memoryUsage().rss,
  heap: process.memoryUsage().heapUsed,
});

const diff = (start: Snapshot, end: Snapshot): Snapshot => ({
  time: end.time - start.time,
  rss: end.rss - start.rss,
  heap: end.heap - start.heap,
});

export async function benchmark<T>(name: string, task: Task<T>): Promise<T> {
  gc?.();
  const start = snapshot();
  const result = await task();
  const end = snapshot();
  const stats = diff(start, end);
  console.log('Task:', name);
  console.log('Time spent:', (stats.time / 1000n).toString(), 'us');
  console.log('RSS memory:', stats.rss.toString(), 'B');
  console.log('Heap memory:', stats.heap.toString(), 'B');
  console.log('Result:', result);
  return result;
}
