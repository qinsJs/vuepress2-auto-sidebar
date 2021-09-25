# 发布 npm

先去 npm 组册账号，并且完成邮箱认证（最好用 💻 而不是 📱）。

不完成邮箱认证，会被拒绝 ❌。

- [前置知识](https://nqdeng.github.io/7-days-nodejs/#2.5)
- [前置知识的备胎](https://www.bookstack.cn/read/7-days-nodejs/section-02_code_management_and_deployment.md#NPM)

## 步骤

1. npm adduser
2. npm publish

3. 添加你注册的账号
4. 发布

adduser 时候，请切换官方源头

```sh
npm config set registry https://registry.npmjs.org/

```

如果你不想看见

```
500 Internal Server Error - PUT http://registry.npm.taobao.org/
```

## 其他

[问题集锦](https://blog.si-yee.com/2020/09/21/%E5%8F%91%E5%B8%83npm%E5%8C%85%E5%A1%AB%E5%9D%91%E5%B0%8F%E8%AE%B0/)

修改回淘宝源

```sh
npm config set registry https://registry.npm.taobao.org
```

[tsconfig.json 配置](https://www.jianshu.com/p/0383bbd61a6b)
