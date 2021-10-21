"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var default_1 = /** @class */ (function () {
    function default_1() {
        this.i是否是文件夹 = function (f) {
            try {
                return fs.statSync(f).isDirectory();
            }
            catch (e) {
                console.log("是否为文件夹 ｜ ", e);
                return false;
            }
        };
    }
    default_1.prototype.setRootPtah = function (path) {
        if (this.i文件或文件夹是否存在(path))
            this.rootPtah = path;
    };
    default_1.prototype.i文件或文件夹是否存在 = function (dir) {
        try {
            fs.accessSync(dir, fs.constants.F_OK);
        }
        catch (e) {
            console.log("文件不存在 | ", dir);
            console.log(e);
            return false;
        }
        return true;
    };
    default_1.prototype.g读取目录内容 = function (dir) {
        if (!this.i文件或文件夹是否存在(dir))
            return [];
        return fs.readdirSync(dir);
    };
    default_1.prototype.g读取目录内容_去除隐藏 = function (dir) {
        return this.g读取目录内容(dir)
            .filter(function (文件名) { return !文件名.startsWith("."); })
            .sort(this.sortFunc);
    };
    // 获取name前面的 编号
    default_1.prototype.g获取编号 = function (s) {
        if (!s || !s.length)
            return -1;
        var arr = s.match(/^[0-9]+/g);
        if (!arr || !arr.length)
            return -1;
        return +arr[0];
    };
    default_1.prototype.gVuepressRoot = function () {
        return this.rootPtah || path.resolve(__dirname, "../..");
    };
    default_1.prototype.g全路径 = function () {
        var pathSegments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pathSegments[_i] = arguments[_i];
        }
        return path.resolve.apply(path, __spreadArray([this.gVuepressRoot()], pathSegments));
    };
    default_1.prototype.sortFunc = function (a, b) {
        /**
         * 如果 文章前面有数字编号
         *
         * 那就可以用此编好进行排序
         */
        var 获取编号 = function (笔记路径) {
            if (!笔记路径 || !笔记路径.length)
                return -1;
            if (typeof 笔记路径 !== "string")
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
        var aa = 获取编号(a);
        var bb = 获取编号(b);
        // console.log(a, "=>", aa, "|", b, "=>", bb);
        if (aa < 0)
            return 1;
        if (bb < 0)
            return -1;
        return 获取编号(a) - 获取编号(b);
    };
    return default_1;
}());
exports.default = default_1;
