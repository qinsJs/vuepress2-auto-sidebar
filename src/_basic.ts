import * as fs from "fs";
import * as path from "path";
export default class {
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
    return this.g读取目录内容(dir).filter((文件名) => !文件名.startsWith("."));
  }

  // 获取name前面的 编号
  protected g获取编号(s: string): number {
    if (!s || !s.length) return -1;

    const arr: string[] = s.match(/^[0-9]+/g);

    if (!arr || !arr.length) return -1;

    return +arr[0];
  }

  gVuepressRoot() {
    return path.resolve(__dirname, "../..");
  }

  g全路径(...pathSegments: string[]) {
    return path.resolve(this.gVuepressRoot(), ...pathSegments);
  }
}
