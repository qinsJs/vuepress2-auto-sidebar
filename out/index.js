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
var _read_1 = require("./_read");
var fs = require("fs");
var 忽略文件 = ["node_modules"];
var main = /** @class */ (function (_super) {
    __extends(main, _super);
    function main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    main.prototype.遍历文件夹 = function (path, callback) {
        var _this = this;
        var 全路径 = this.g全路径(path);
        // console.log("遍历目录 > ", 全路径);
        if (!this.i是否是文件夹(全路径))
            return;
        var 子目录所有内容 = this.g读取目录内容_去除隐藏(全路径);
        // console.log('子目录所有内容 > ',子目录所有内容);
        子目录所有内容.forEach(function (文件名) {
            var is笔记目录 = 文件名.endsWith(".js");
            if (is笔记目录) {
                console.log("上报", path);
                callback(path); // 笔记目录，就上报上去
            }
            var 路径 = path + "/" + 文件名;
            // console.log(" >>> ", this.g全路径(路径));
            if (_this.i是否是文件夹(_this.g全路径(路径))) {
                _this.遍历文件夹(路径, callback);
            }
        });
    };
    main.prototype.run = function () {
        var 所有文件 = this.g读取目录内容_去除隐藏(this.gVuepressRoot()) //
            .filter(function (fileName) { return !忽略文件.includes(fileName); });
        // console.log(所有文件);
        var 笔记路径们 = [];
        for (var _i = 0, 所有文件_1 = 所有文件; _i < 所有文件_1.length; _i++) {
            var 文件 = 所有文件_1[_i];
            this.遍历文件夹(文件, function (笔记路径) { return 笔记路径们.push(笔记路径); });
        }
        var vuePress侧边栏对象 = {};
        // console.log(notes);
        for (var _a = 0, 笔记路径们_1 = 笔记路径们; _a < 笔记路径们_1.length; _a++) {
            var 笔记路径 = 笔记路径们_1[_a];
            var _笔记路径 = 笔记路径.startsWith("/") ? 笔记路径 : "/" + 笔记路径;
            vuePress侧边栏对象[_笔记路径] = this.c生成Sidebar对象路径(笔记路径);
        }
        console.log(JSON.stringify(vuePress侧边栏对象, null, 2));
        fs.writeFile(this.g全路径(".vuepress/components/sidebar.json"), JSON.stringify(vuePress侧边栏对象, null, 2), console.log);
        return vuePress侧边栏对象;
    };
    return main;
}(_read_1.default));
exports.default = main;
