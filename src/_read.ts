import basic from "./_basic";
// import * as path from "path";
interface IChapter {
  text: string;
  collapsable: boolean;
  children: Array<any>;
}

export default class main extends basic {
  c创建一个章节模版 = (title): IChapter => ({
    text: title || "章节名称",
    collapsable: false,
    children: [],
  });

  i笔记目录 = (文件名: string): boolean => {
    // 文件名.endsWith(".js"));// 匹配全部 .js 问题太大了，现在只匹配特定文件
    const 配置名 = ["chapter.js", "config.js"];

    return 配置名.some((element) => element == 文件名);
  };

  /**
   *
   * @param root 某路径，如：js
   * @param filesList 和路径下的所有文件，如章节：1，2，3，4
   */
  private g获取配置(root: string, filesList: Array<string>): any {
    const s配置 = filesList.filter(this.i笔记目录);

    const 配置路径 = (() => {
      if (s配置.length === 0)
        throw new Error(`${root} 目录下没有 .js 的配置文件！`);

      if (s配置.length > 1) {
        if (s配置.find((文件名) => 文件名 === "config.js")) return `config.js`;
      }

      return s配置[0];
    })();

    return require(this.g全路径(root, 配置路径));
  }

  /**
   *
   * @param path 依旧是 相对Vuepress 的 相对路径，如：db/sqlite/1
   */
  c获取章节详细笔记(path: string): string[] {
    const 我辛辛苦苦的笔记们 = this.g读取目录内容_去除隐藏(this.g全路径(path)) //
      .filter((笔记名字) => 笔记名字.endsWith(".md")) //
      .map((笔记名字) => `${path}/${笔记名字}`)
      .map((笔记名字) =>
        笔记名字.startsWith("/") ? 笔记名字 : `/${笔记名字}`
      );

    /**
     * 如果 文章前面有数字编号
     *
     * 那就可以用此编好进行排序
     */
    const 获取编号 = (笔记路径: string): number => {
      if (!笔记路径 || !笔记路径.length) return -1;
      let 笔记名 = 笔记路径;

      if (笔记路径.indexOf("/") !== -1) {
        const 路径们 = 笔记路径.split("/");
        笔记名 = 路径们[路径们.length - 1];
      }

      const arr: string[] = 笔记名.match(/^[0-9]+/g);

      if (!arr || !arr.length) return -1;

      return +arr[0];
    };

    return 我辛辛苦苦的笔记们 // 排序，避免 10 > 2
      .sort((a, b) => {
        const aa = 获取编号(a);
        const bb = 获取编号(b);
        // console.log(a, "=>", aa, "|", b, "=>", bb);
        if (aa < 0) return 1;
        if (bb < 0) return -1;

        return 获取编号(a) - 获取编号(b);
      });
  }

  /**
   *
   * @param p 相对路径，如 db , db/basic
   */
  c生成Sidebar对象路径(p: string): Array<IChapter> {
    const 所有文件 = this.g读取目录内容_去除隐藏(this.g全路径(p));
    const config = this.g获取配置(p, 所有文件);

    console.log("配置 > ", config);

    const 侧边栏 = [];

    for (const 章节_目录 of 所有文件) {
      if (!this.i是否是文件夹(this.g全路径(p, 章节_目录))) continue;

      const 章节名称 = config[章节_目录] || 章节_目录;

      const 侧边栏对象 = this.c创建一个章节模版("🎯 " + 章节名称);

      侧边栏对象.children = this.c获取章节详细笔记(`${p}/${章节_目录}`);

      侧边栏.push(侧边栏对象);
    }

    return 侧边栏;
  }
}
