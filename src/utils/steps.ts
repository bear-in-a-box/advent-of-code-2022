export function stepAfterKey(): Promise<void> {
  return new Promise((resolve) => {
    process.stdin.once('data', (data) => {
      if (data[0] === 10) {
        resolve();
      }
    });
  });
}
