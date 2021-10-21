import * as fs from "fs";
import * as path from "path";
export default class {
  protected rootPtah: string;
  protected setRootPtah(path: string) {
    if (this.i文件或文件夹是否存在(path)) this.rootPtah = path;
  }
  protected i是否是文件夹 = (f: string) => {
    try {
      return fs.statSync(f).isDirectory();
    } catch (e) {
      console.log("是否为文件夹 ｜ ", e);
      return false;
    }
  };

  protected i文件或文件夹是否存在(dir: string): boolean {
    try {
      fs.accessSync(dir, fs.constants.F_OK);
    } catch (e) {
      console.log("文件不存在 | ", dir);
      console.log(e);
      return false;
    }

    return true;
  }

  protected g读取目录内容(dir: string): string[] {
    if (!this.i文件或文件夹是否存在(dir)) return [];
    return fs.readdirSync(dir);
  }

  protected g读取目录内容_去除隐藏(dir: string) {
    return this.g读取目录内容(dir)
      .filter((文件名) => !文件名.startsWith("."))
      .sort(this.sortFunc);
  }

  // 获取name前面的 编号
  protected g获取编号(s: string): number {
    if (!s || !s.length) return -1;

    const arr: string[] = s.match(/^[0-9]+/g);

    if (!arr || !arr.length) return -1;

    return +arr[0];
  }

  gVuepressRoot() {
    return this.rootPtah || path.resolve(__dirname, "../..");
  }

  g全路径(...pathSegments: string[]) {
    return path.resolve(this.gVuepressRoot(), ...pathSegments);
  }

  protected sortFunc(a, b) {
    /**
     * 如果 文章前面有数字编号
     *
     * 那就可以用此编好进行排序
     */
    const 获取编号 = (笔记路径: string): number => {
      if (!笔记路径 || !笔记路径.length) return -1;
      if (typeof 笔记路径 !== "string") return -1;

      let 笔记名 = 笔记路径;

      if (笔记路径.indexOf("/") !== -1) {
        const 路径们 = 笔记路径.split("/");
        笔记名 = 路径们[路径们.length - 1];
      }

      const arr: string[] = 笔记名.match(/^[0-9]+/g);

      if (!arr || !arr.length) return -1;

      return +arr[0];
    };

    const aa = 获取编号(a);
    const bb = 获取编号(b);
    // console.log(a, "=>", aa, "|", b, "=>", bb);
    if (aa < 0) return 1;
    if (bb < 0) return -1;

    return 获取编号(a) - 获取编号(b);
  }
}
