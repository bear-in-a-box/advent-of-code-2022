import { Directory } from './node';

export function dfs(root: Directory, check: (dir: Directory) => void) {
  const queue: Directory[] = [root];

  const gather = (base: Directory) => {
    for (const sub of base.children.values()) {
      if (sub instanceof Directory) {
        queue.push(sub);
      }
    }
  };

  while (queue.length !== 0) {
    const current = queue.pop()!;
    check(current);
    gather(current);
  }
}
