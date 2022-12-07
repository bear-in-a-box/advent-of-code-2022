import { Directory, File } from './node';

export class FS {
  public readonly root = new Directory('/');
  private current: Directory = this.root;

  parseCommand(cmd: string) {
    if (cmd === '$ cd /') {
      return;
    }
    if (cmd === '$ ls') {
      this.ls();
      return;
    }
    if (cmd.startsWith('$ cd ')) {
      this.cd(cmd.slice(5));
      return;
    }
    if (cmd.startsWith('dir ')) {
      this.lsDir(cmd.slice(4));
      return;
    }
    if (/^\d/.test(cmd)) {
      const [size, name] = cmd.split(' ', 2);
      this.lsFile(name, BigInt(size));
      return;
    }
  }

  private cd(dir: string) {
    if (dir === '..') {
      this.current = this.current.parent!;
      return;
    }
    const target = this.current.children.get(dir);
    if (!(target instanceof Directory)) {
      throw new Error();
    }
    this.current = target;
  }

  private ls() {
    /* no-op */
  }

  private lsDir(dir: string) {
    if (this.current.children.has(dir)) {
      return;
    }
    const node = new Directory(dir);
    this.current.addChild(node);
  }

  private lsFile(name: string, size: bigint) {
    const file = new File(name, size);
    file.parent = this.current;
    this.current.addChild(file);
  }
}
