"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _basic_1 = require("./_basic");
var main = /** @class */ (function (_super) {
    __extends(main, _super);
    function main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.c创建一个章节模版 = function (title) { return ({
            text: title || "章节名称",
            collapsable: false,
            children: [],
        }); };
        _this.i笔记目录 = function (文件名) {
            // 文件名.endsWith(".js"));// 匹配全部 .js 问题太大了，现在只匹配特定文件
            var 配置名 = ["chapter.js", "config.js"];
            return 配置名.some(function (element) { return element == 文件名; });
        };
        return _this;
    }
    /**
     *
     * @param root 某路径，如：js
     * @param filesList 和路径下的所有文件，如章节：1，2，3，4
     */
    main.prototype.g获取配置 = function (root, filesList) {
        var s配置 = filesList.filter(this.i笔记目录);
        var 配置路径 = (function () {
            if (s配置.length === 0)
                throw new Error(root + " \u76EE\u5F55\u4E0B\u6CA1\u6709 .js \u7684\u914D\u7F6E\u6587\u4EF6\uFF01");
            if (s配置.length > 1) {
                if (s配置.find(function (文件名) { return 文件名 === "config.js"; }))
                    return "config.js";
            }
            return s配置[0];
        })();
        return require(this.g全路径(root, 配置路径));
    };
    /**
     *
     * @param path 依旧是 相对Vuepress 的 相对路径，如：db/sqlite/1
     */
    main.prototype.c获取章节详细笔记 = function (path) {
        var 我辛辛苦苦的笔记们 = this.g读取目录内容_去除隐藏(this.g全路径(path)) //
            .filter(function (笔记名字) { return 笔记名字.endsWith(".md"); }) //
            .map(function (笔记名字) { return path + "/" + 笔记名字; })
            .map(function (笔记名字) {
            return 笔记名字.startsWith("/") ? 笔记名字 : "/" + 笔记名字;
        });
        /**
         * 如果 文章前面有数字编号
         *
         * 那就可以用此编好进行排序
         */
        var 获取编号 = function (笔记路径) {
            if (!笔记路径 || !笔记路径.length)
                return -1;
            var 笔记名 = 笔记路径;
            if (笔记路径.indexOf("/") !== -1) {
                var 路径们 = 笔记路径.split("/");
                笔记名 = 路径们[路径们.length - 1];
            }
            var arr = 笔记名.match(/^[0-9]+/g);
            if (!arr || !arr.length)
                return -1;
            return +arr[0];
        };
        return 我辛辛苦苦的笔记们 // 排序，避免 10 > 2
            .sort(function (a, b) {
            var aa = 获取编号(a);
            var bb = 获取编号(b);
            // console.log(a, "=>", aa, "|", b, "=>", bb);
            if (aa < 0)
                return 1;
            if (bb < 0)
                return -1;
            return 获取编号(a) - 获取编号(b);
        });
    };
    /**
     *
     * @param p 相对路径，如 db , db/basic
     */
    main.prototype.c生成Sidebar对象路径 = function (p) {
        var 所有文件 = this.g读取目录内容_去除隐藏(this.g全路径(p));
        var config = this.g获取配置(p, 所有文件);
        console.log("配置 > ", config);
        var 侧边栏 = [];
        for (var _i = 0, 所有文件_1 = 所有文件; _i < 所有文件_1.length; _i++) {
            var 章节_目录 = 所有文件_1[_i];
            if (!this.i是否是文件夹(this.g全路径(p, 章节_目录)))
                continue;
            var 章节名称 = config[章节_目录] || 章节_目录;
            var 侧边栏对象 = this.c创建一个章节模版("🎯 " + 章节名称);
            侧边栏对象.children = this.c获取章节详细笔记(p + "/" + 章节_目录);
            侧边栏.push(侧边栏对象);
        }
        return 侧边栏;
    };
    return main;
}(_basic_1.default));
exports.default = main;
