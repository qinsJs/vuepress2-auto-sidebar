import basic from "./_read";
import * as fs from "fs";

const 忽略文件 = ["node_modules"];

export default class main extends basic {
  constructor(rootPath?: string) {
    super();
    if (!rootPath) {
      throw new Error("必须设置Vuepress的根目录");
    }

    this.setRootPtah(rootPath);
  }

  遍历文件夹(path: string, callback?: (path: string) => {}) {
    const 全路径 = this.g全路径(path);
    // console.log("遍历目录 > ", 全路径);
    if (!this.i是否是文件夹(全路径)) return;

    const 子目录所有内容 = this.g读取目录内容_去除隐藏(全路径);

    // console.log('子目录所有内容 > ',子目录所有内容);

    子目录所有内容.forEach((文件名) => {
      const is笔记目录 = 文件名.endsWith(".js");

      if (is笔记目录) {
        console.log("上报", path);
        callback(path); // 笔记目录，就上报上去
      }

      const 路径 = `${path}/${文件名}`;
      // console.log(" >>> ", this.g全路径(路径));
      if (this.i是否是文件夹(this.g全路径(路径))) {
        this.遍历文件夹(路径, callback);
      }
    });
  }

  run() {
    const 所有文件 = this.g读取目录内容_去除隐藏(this.gVuepressRoot()) //
      .filter((fileName) => !忽略文件.includes(fileName));

    // console.log(所有文件);

    const 笔记路径们 = [];
    for (const 文件 of 所有文件) {
      this.遍历文件夹(文件, (笔记路径) => 笔记路径们.push(笔记路径));
    }

    const vuePress侧边栏对象 = {};
    // console.log(notes);
    for (const 笔记路径 of 笔记路径们) {
      const _笔记路径 = 笔记路径.startsWith("/") ? 笔记路径 : `/${笔记路径}`;

      vuePress侧边栏对象[_笔记路径] = this.c生成Sidebar对象路径(笔记路径);
    }

    console.log(JSON.stringify(vuePress侧边栏对象, null, 2));

    if (this.i文件或文件夹是否存在(this.g全路径(".vuepress/components/"))) {
      fs.writeFile(
        this.g全路径(".vuepress/components/sidebar.json"),
        JSON.stringify(vuePress侧边栏对象, null, 2),
        console.log
      );
    }

    return vuePress侧边栏对象;
  }
}
