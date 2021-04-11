<p align="center">
    <a rel="noopener norferrer" href="https://github.com/MaricoCheung/vue-shop"><img src="https://s1.imagehub.cc/images/2021/04/10/logo037b7154d60556d1.png" width="120" height="120" alt="e-commercemanagement logo"></a>
</p>
<h1 align="center">e-commercemanagement</h1>

<p align="center">Management Backend project based on the Vue</p>

<p align="center">
  <a href="https://www.javascript.com/"><img src="https://img.shields.io/badge/language-javascript-critical"></a>
  <img src="https://img.shields.io/badge/build-passing-brightgreen">
  <a href="https://gitee.com/MaricoCheung/vue-shop/releases/v0.1.4"><img src="https://img.shields.io/badge/version-v0.1.4-blue"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
</p>



<p align="center">
  📌<a href="https://github.com/MaricoCheung">Website preview</a>
  &nbsp;
  🇨🇳 <a href="./README.zh-CN.md">中文版介绍</a>
</p>


## Preview

- Login

<p align="center">
	<img src="https://s1.imagehub.cc/images/2021/04/10/previewLogin.png" alt="previewLogin" border="0">
</p>
- Users

<p align="center">
    <img src="https://s1.imagehub.cc/images/2021/04/10/previewUsers.png" alt="previewUsers" border="0">
</p>
- Roles

<p align="center">
    <img src="https://s1.imagehub.cc/images/2021/04/10/previewRoles.png" alt="previewRoles" border="0">
</p>
- Goods

<p align="center">
    <img src="https://s1.imagehub.cc/images/2021/04/11/previewGoods.png" alt="previewGoods" border="0">
</p>

- Orders

<p align="center">
    <img src="https://s1.imagehub.cc/images/2021/04/11/previewOrders.png" alt="previewOrders" border="0">
</p>

- Report

<p align="center">
    <img src="https://s1.imagehub.cc/images/2021/04/10/previewReport.png" alt="previewReport" border="0">
</p>



## Project run

1. Open the command line tool or vscode terminal, and switch to the root directory

2. Install project dependencies

   ```
   npm install
   ```

3. Start the server

   ```
   nodemon .\app.js
   ```

4. Run (open a new terminal in the same directory)

   - Under development mode

     ```
     npm run serve
     ```

   - Under production mode

     ```
     npm run build
     ```

5. Experience function

   - Open the browser and enter the serve address
   - Then enjoy yourself



## Catalog description

<p>
|-- root<br />
&nbsp;&nbsp;&nbsp;&nbsp;</span>|-- .editorconfig<span style="margin-left: 50px">⚪ vscode writing habits</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- .eslintignore<br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- .eslintrc.js<span style="margin-left: 69px">⚪ grammar monitoring</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- .gitignore<br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- .prettierrc<span style="margin-left: 68px">⚪ custom grammar monitoring</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- app.js<span style="margin-left: 98px">⚪ server entrance</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- babel.config.js<span style="margin-left: 34px">⚪ plugin configuration</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- cheese.log<br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- Front-Back-API.md<span style="margin-left: 1px">⚪ API interface document</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- LICENSE<br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- package-lock.json<br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- package.json<br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- README.md<br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- README.zh-CN.md<br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- vue.config.js<span style="margin-left: 48px">⚪ manual webpack configuration</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- config<span style="margin-left: 94px">⚪ database, jwt, front-back-end file communication configuration</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- dao<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- DAO.js<span style="margin-left: 106px">⚪ data access layer</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- db<span style="margin-left: 120px">⚪ database script</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- dist<br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- models<span style="margin-left: 84px">⚪ specific database ORM model</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- modules<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- authorization.js<span style="margin-left: 42px">⚪ API permission verification module</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- database.js<span style="margin-left: 73px">⚪ database module</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- passport.js<span style="margin-left: 75px">⚪ login building</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- resextra.js<span style="margin-left: 78px">⚪ API unified return result interface</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- node_modules<br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- public<br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- routes<br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- services<span style="margin-left: 79px">⚪ service layer</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- src<span style="margin-left: 116px">⚪ source directory</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- App.vue<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- main-dev.js<span style="margin-left: 68px">⚪ package entry in development mode</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- main-prod.js<span style="margin-left: 60px">⚪ package entry in produciton mode</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- assets<span style="margin-left: 108px">⚪ styles, pictures, fonts</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- components<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- plugins<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- router<br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- tmp_uploads<span style="margin-left: 46px">⚪ upload pictures temporarily</span><br />
&nbsp;&nbsp;&nbsp;&nbsp;|-- uploads
</p>

## Technology Stack

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

## License

[MIT](https://gitee.com/MaricoCheung/vue-shop/blob/master/LICENSE) © [MaricoCheung](https://gitee.com/MaricoCheung)

