<p align="center">
    <img alt="logo" src="https://s1.imagehub.cc/images/2021/04/10/logo037b7154d60556d1.png" alt="logo037b7154d60556d1.png" width="120" height="120" style="margin-bottom: 10px;">
</p>
<h1 align="center">e-commercemanagement</h1>

<p align="center">基于Vue开发的后台管理项目</p>

<p align="center">
    <img src="https://img.shields.io/badge/build-passing-brightgreen">
  <a href="https://gitee.com/MaricoCheung/vue-shop/releases/v0.1.4">
    <img src="https://img.shields.io/badge/version-v0.1.4-blue">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>
<p align="center">
  📌<a href="https://github.com/MaricoCheung">网站预览</a>
  &nbsp;
  EN <a href="./README.md">Introduction</a>
</p>


## 预览

- 登录页

<p align="center">
	<img src="https://s1.imagehub.cc/images/2021/04/10/previewLogin.png" alt="previewLogin" border="0">
</p>
- 用户页

<p align="center">
    <img src="https://s1.imagehub.cc/images/2021/04/10/previewUsers.png" alt="previewUsers" border="0">
</p>
- 角色页

<p align="center">
    <img src="https://s1.imagehub.cc/images/2021/04/10/previewRoles.png" alt="previewRoles" border="0">
</p>
- 商品页

<p align="center">
    <img src="https://s1.imagehub.cc/images/2021/04/11/previewGoods.png" alt="previewGoods" border="0">
</p>

- 订单页

<p align="center">
    <img src="https://s1.imagehub.cc/images/2021/04/11/previewOrders.png" alt="previewOrders" border="0">
</p>

- 图表页

<p align="center">
    <img src="https://s1.imagehub.cc/images/2021/04/10/previewReport.png" alt="previewReport" border="0">
</p>


## 本地运行

1. 打开cmd或vscode终端，切换到根目录

2. 安装项目依赖

   ```
   npm install
   ```

3. 启动服务器

   ```
   nodemon .\app.js
   ```

4. 运行（同目录下新开一个终端）

   - 开发模式下

     ```
     npm run serve
     ```

   - 发布模式下

     ```
     npm run build
     ```
   
5. 体验功能

   - 打开浏览器输入地址：http://localhost:8081/

     


## 目录骨架说明

|-- root
    |-- `.editorconfig`                            // 编辑器习惯
    |-- `.eslintignore`                            // 语法检测忽略对象
    |-- `.eslintrc.js`                              // 语法检测
    |-- `.gitignore`                                  // git仓库上传忽略对象
    |-- `.prettierrc`                                // 自定义语法检测
    |-- `app.js`                                           // 服务器入口
    |-- `babel.config.js`                        // 插件配置
    |-- `cheese.log`                                   // debug日志
    |-- `Front-Back-API.md`                    // 前后端API接口文档
    |-- LICENSE
    |-- `package-lock.json`                    // 包追踪锁定
    |-- `package.json`                              // 包版本管理
    |-- README.md
    |-- README.zh-CN.md
    |-- `vue.config.js`                           // 手动配置webpack
    |-- `config`                                          // 数据库、jwt、前后端文件通信配置
    |-- `dao`                                                // 数据访问层（存放对数据库的增删改查操作）
    |   |-- DAO.js                                                  // 提供的公共访问数据库的方法
    |-- `db`                                                  // 数据库脚本
    |-- `dist`                                             // 发布模式下的静态资源
    |-- `models`                                         // 存放具体数据库 ORM 模型
    |-- `modules`                                       // 当前项目模块
    |   |-- authorization.js                                // API权限验证模块
    |   |-- database.js                                        // 数据库模块（数据库加载基于 nodejs-orm2 库加载）
    |   |-- passport.js                                         // 基于 passport 模块的登录搭建
    |   |-- resextra.js                                          // API 统一返回结果接口
    |-- `node_modules`                              // 第三方依赖模块
    |-- `public`                                          // 根页面
    |-- `routes`                                          // 服务器响应路由
    |-- `services`                                      // 服务层（编写业务逻辑，用接口获取数据反馈给前端所需数据）
    |-- `src`                                                // 源码目录
    |   |-- App.vue                                              // 根组件
    |   |-- main-dev.js                                        // 开发模式下的打包入口
    |   |-- main-prod.js                                      // 发布模式下的打包入口
    |   |-- assets                                                 // 公共样式、图片、字体
    |   |-- components                                      // vue单文件组件
    |   |-- plugins                                                // 第三方插件
    |   |-- router                                                 // 路由请求管理
    |-- `tmp_uploads`                               // 临时上传图片
    |-- `uploads`                                       // 最终上传图片



## 技术栈

<p align="center">
    <image src="https://img.shields.io/badge/language-javascript-critical"/>
    <image src="https://img.shields.io/badge/frame-vue%5E2.6.9-green"/>
    <image src="https://img.shields.io/badge/frame-element--ui%5E2.15.1-blue"/>
    <image src="https://img.shields.io/badge/server-express%5E4.16.2-lightgrey"/>
</p>

## 协议

本项目根据 [传智教育](http://www.itheima.com/) 的教程实现，采用 [MIT](https://gitee.com/MaricoCheung/vue-shop/blob/master/LICENSE) 开源协议，请勿商业用途及违法犯罪，后果自负