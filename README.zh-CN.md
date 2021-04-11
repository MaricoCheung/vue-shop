<p align="center">
    <a rel="noopener norferrer" href="https://github.com/MaricoCheung/vue-shop"><img src="https://s1.imagehub.cc/images/2021/04/10/logo037b7154d60556d1.png" width="120" height="120" alt="e-commercemanagement logo"></a>
</p>
<h1 align="center">e-commercemanagement</h1>

<p align="center">基于Vue开发的后台管理项目</p>

<p align="center">
  <a href="https://www.javascript.com/"><img src="https://img.shields.io/badge/language-javascript-critical"></a>
  <img src="https://img.shields.io/badge/build-passing-brightgreen">
  <a href="https://gitee.com/MaricoCheung/vue-shop/releases/v0.1.4"><img src="https://img.shields.io/badge/version-v0.1.4-blue"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
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

   - 打开浏览器输入serve地址

     


## 目录骨架说明

<p>
|-- root<br />
&nbsp;&nbsp;&nbsp;&nbsp;</span>|-- .editorconfig<span style="margin-left: 50px">⚪编辑器习惯</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- .eslintignore<span style="margin-left: 52px">⚪语法检测忽略对象</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- .eslintrc.js<span style="margin-left: 69px">⚪语法检测</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- .gitignore<span style="margin-left: 72px">⚪git仓库上传忽略对象</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- .prettierrc<span style="margin-left: 68px">⚪自定义语法检测</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- app.js<span style="margin-left: 98px">⚪服务器入口</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- babel.config.js<span style="margin-left: 34px">⚪插件配置</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- cheese.log<span style="margin-left: 62px">⚪debug日志</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- Front-Back-API.md<span style="margin-left: 1px">⚪前后端API接口文档</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- LICENSE<br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- package-lock.json<span style="margin-left: 7px">⚪包追踪锁定</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- package.json<span style="margin-left: 42px">⚪包版本管理</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- README.md<br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- README.zh-CN.md<br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- vue.config.js<span style="margin-left: 48px">⚪手动配置webpack</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- config<span style="margin-left: 94px">⚪数据库、jwt、前后端文件通信配置</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- dao<span style="margin-left: 111px">⚪数据访问层（存放对数据库的增删改查操作）</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- DAO.js<span style="margin-left: 106px">⚪提供的公共访问数据库的方法</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- db<span style="margin-left: 120px">⚪数据库脚本</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- dist<span style="margin-left: 112px">⚪发布模式下的静态资源</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- models<span style="margin-left: 84px">⚪存放具体数据库 ORM 模型</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- modules<span style="margin-left: 74px">⚪当前项目模块</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- authorization.js<span style="margin-left: 42px">⚪API权限验证模块</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- database.js<span style="margin-left: 73px">⚪数据库模块（数据库加载基于 nodejs-orm2 库加载）</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- passport.js<span style="margin-left: 75px">⚪基于 passport 模块的登录搭建</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- resextra.js<span style="margin-left: 78px">⚪API 统一返回结果接口</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- node_modules<span style="margin-left: 26px">⚪第三方依赖模块</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- public<span style="margin-left: 92px">⚪根页面</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- routes<span style="margin-left: 90px">⚪服务器响应路由</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- services<span style="margin-left: 79px">⚪服务层（编写业务逻辑，用接口获取数据反馈给前端所需数据）</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- src<span style="margin-left: 116px">⚪源码目录</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- App.vue<span style="margin-left: 92px">⚪根组件</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- main-dev.js<span style="margin-left: 68px">⚪开发模式下的打包入口</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- main-prod.js<span style="margin-left: 60px">⚪发布模式下的打包入口</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- assets<span style="margin-left: 108px">⚪公共样式、图片、字体</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- components<span style="margin-left: 62px">⚪vue单文件组件</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- plugins<span style="margin-left: 102px">⚪第三方插件</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- router<span style="margin-left: 108px">⚪路由请求管理</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- tmp_uploads<span style="margin-left: 46px">⚪临时上传图片</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- uploads<span style="margin-left: 84px">⚪最终上传图片</span>
</p>



## 技术栈

<p align="center">
    <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer" style="margin-right: 10px"><img width="100px" height="100px" src="https://vuejs.org/images/logo.png" alt="Vue logo"></a>
    <a target="_blank" rel="noopener norferrer" href="https://element.eleme.cn/#/zh-CN/component/installation" style="margin-right: 10px"><img src="https://camo.githubusercontent.com/5c4691bfa141b2d01f0f2314a0e6495d3c051a8dd8aea54fc57b81e6fe1b840e/68747470733a2f2f63646e2e7261776769742e636f6d2f456c656d6546452f656c656d656e742f6465762f656c656d656e745f6c6f676f2e737667" data-canonical-src="https://cdn.rawgit.com/ElemeFE/element/dev/element_logo.svg" width="220px" height="220px" alt="Element logo"></a>
    <a target="_blank" href="https://nodejs.org/" rel="nofollow" style="margin-right: 10px"><img alt="Node.js" src="https://camo.githubusercontent.com/720ed473d178f9380291709d2223860ade4f3c7bc368e3fea1ad057b8dc9c6f5/68747470733a2f2f6e6f64656a732e6f72672f7374617469632f696d616765732f6c6f676f2d6c696768742e737667" width="150px" height="150px" data-canonical-src="https://nodejs.org/static/images/logo-light.svg" alt="Node logo"></a>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/babel/babel" style="margin-right: 10px"><img src="https://camo.githubusercontent.com/3b2cbc3b5addf7f175570f9ba87009a4aead529bfa2eb15efa465d8c6d1c3191/68747470733a2f2f7261776769742e636f6d2f626162656c2f6c6f676f2f6d61737465722f626162656c2e737667" alt="Babel logo" width="200px" height="200px" data-canonical-src="https://rawgit.com/babel/logo/master/babel.svg" style="max-width:100%;"></a>
    <a target="_blank" rel="noopener noreferrer" herf="https://github.com/lodash/lodash" style="margin-right: 10px"><img width="100px" height="100px" src="https://lodash.com/assets/img/lodash.svg" alt="Lodash logo" ></a>
    <a target="_blank" rel="noopener noreferrer"  href="https://echarts.apache.org/zh/index.html" style="margin-right: 10px"><img width="300px" height="80px" src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/images/logo.png?_v_=20200710_1" alt="echarts logo"></a>
    <a target="_blank" href="http://expressjs.com/" rel="nofollow" style="margin-right: 10px"><img width="350px" height="120px" src="https://camo.githubusercontent.com/0566752248b4b31b2c4bdc583404e41066bd0b6726f310b73e1140deefcc31ac/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67" alt="Express Logo" data-canonical-src="https://i.cloudup.com/zfY6lL7eFa-3000x3000.png"></a>
    <a target="_blank" href="https://github.com/webpack/webpack"><img width="150px" height="150px" src="https://camo.githubusercontent.com/b0573f87b0786eda63c76f2a9a1358e7a653783c25c03c6c908a00b70c713d78/68747470733a2f2f7765627061636b2e6a732e6f72672f6173736574732f69636f6e2d7371756172652d6269672e737667" alt="Webpack logo" data-canonical-src="https://webpack.js.org/assets/icon-square-big.svg"></a>
</p>

## 协议

本项目根据 [传智教育](http://www.itheima.com/) 的教程实现，采用 [MIT](https://gitee.com/MaricoCheung/vue-shop/blob/master/LICENSE) 开源协议，请勿商业用途及违法犯罪，后果自负