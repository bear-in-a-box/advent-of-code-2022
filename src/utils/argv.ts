import path from 'node:path';

export const getInputPath = (dirname: string) =>
  path.join(dirname, process.argv.find((v) => v.endsWith('.txt')) || '404.txt');
