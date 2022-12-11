export type Operation = (x: number) => number;
export type OperationWithMod = (x: number, mod: number) => number;

export function parseOperation(input: string): OperationWithMod {
  const vars = input.match(
    /new = (?<left>old|\d+) (?<operand>[*+]) (?<right>old|\d+)/
  )?.groups;
  if (!vars) {
    throw new Error('Invalid operation input: ' + input);
  }
  const getValueOperation = (group: string): Operation => {
    if (vars[group] === 'old') {
      return (old: number) => old;
    }
    const value = Number(vars[group]);
    return () => value;
  };
  const left: Operation = getValueOperation('left');
  const right: Operation = getValueOperation('right');
  if (vars.operand === '*') {
    return (x: number, mod: number) => (left(x) * right(x)) % mod;
  }
  if (vars.operand === '+') {
    return (x: number, mod: number) => (left(x) + right(x)) % mod;
  }
  return () => NaN;
}
