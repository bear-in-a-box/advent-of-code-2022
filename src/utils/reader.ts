import { once } from 'node:events';
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

export async function readLineByLine(
  file: string,
  options: {
    onLine: (line: string) => void;
    onFinish?: () => void;
  }
): Promise<void> {
  const reader = createInterface({
    input: createReadStream(file),
    crlfDelay: Infinity,
  });

  reader.on('line', options.onLine);

  await once(reader, 'close');

  options.onFinish?.();
}
