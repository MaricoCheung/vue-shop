<p align="center">
    <img alt="logo" src="https://s1.imagehub.cc/images/2021/04/10/logo037b7154d60556d1.png" alt="logo037b7154d60556d1.png" width="120" height="120" style="margin-bottom: 10px;">
</p>
<h1 align="center">e-commercemanagement</h1>

<p align="center">Management Backend project based on the Vue</p>

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

   - Open the browser and enter the address：http://localhost:8081/
   - Then enjoy yourself



## Catalog description

|-- root
    |-- `.editorconfig`                            // vscode writing habits
    |-- `.eslintignore` 
    |-- `.eslintrc.js`                              // grammar monitoring
    |-- `.prettierrc`                                // custom grammar monitoring
    |-- `app.js`                                           // server entrance
    |-- `babel.config.js`                        // plugin configuration
    |--` cheese.log`
    |-- `Front-Back-API.md`                    // API interface document
    |-- LICENSE
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- README.zh-CN.md
    |-- `vue.config.js`                           // manual webpack configuration
    |-- `config`                                          // database, jwt, front-back-end file communication configuration
    |-- `dao`                                                // data access layer
    |   |-- DAO.js
    |-- `db`                                                  // database script
    |-- dist
    |-- `models`                                         // specific database ORM model
    |-- `modules`
    |   |-- authorization.js                                // API permission verification module
    |   |-- database.js                                        // database module
    |   |-- passport.js                                         // login building
    |   |-- resextra.js                                          // API unified return result interface
    |-- `public` 
    |--` routes`
    |-- `services`                                      // service layer
    |-- `src`                                                // source directory
    |   |-- App.vue
    |   |-- main-dev.js                                        // package entry in development mode
    |   |-- main-prod.js                                      // package entry in production mode
    |   |-- assets                                                 // styles, pictures, fonts
    |   |-- components
    |   |-- plugins
    |   |-- router
    |-- `tmp_uploads`                               // upload pictures temporarily
    |-- uploads



## Technology Stack

<p align="center">
    <image src="https://img.shields.io/badge/language-javascript-critical"/>
    <image src="https://img.shields.io/badge/frame-vue%5E2.6.9-green"/>
    <image src="https://img.shields.io/badge/frame-element--ui%5E2.15.1-blue"/>
    <image src="https://img.shields.io/badge/server-express%5E4.16.2-lightgrey"/>
</p>


## License

[MIT](https://gitee.com/MaricoCheung/vue-shop/blob/master/LICENSE) © [MaricoCheung](https://gitee.com/MaricoCheung)

