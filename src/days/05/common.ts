export type Move = { count: number; from: number; to: number };
export type StackLevel = { index: number; content: string };
export type Arrangement = Record<number, string[]>;

export function parseMoveLine(line: string): Move {
  const matched = line.match(
    /^move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)$/
  );
  const count = Number(matched?.groups?.['count']);
  const from = Number(matched?.groups?.['from']) - 1;
  const to = Number(matched?.groups?.['to']) - 1;
  return { count, from, to };
}

export function parseStackLine(line: string): StackLevel[] {
  if (!line.includes('[')) {
    return [];
  }
  const items: StackLevel[] = [];
  for (let i = 0; i < line.length / 4; i++) {
    const content = line[i * 4 + 1];
    if (content === ' ') {
      continue;
    }
    items.push({ index: i, content });
  }
  return items;
}

export function addToStack(
  arrangement: Arrangement,
  index: number,
  content: string
) {
  ensureStackExists(arrangement, index);
  arrangement[index].unshift(content);
}

export function readMessage(arrangement: Arrangement, size: number): string {
  let result = '';
  for (let i = 0; i < size; i++) {
    result += arrangement[i].pop() || '';
  }
  return result;
}

export function ensureStackExists(arrangement: Arrangement, index: number) {
  if (!arrangement[index]) {
    arrangement[index] = [];
  }
}
