// 项目发布阶段需要用到的babel插件
const productPlugins = []

// 判断是开发还是发布模式
if(process.env.NODE_ENV === 'production'){
  // 用 push 加到该数组，去掉代码中的console，避免 build 打包报错
  productPlugins.push("transform-remove-console")
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 发布模式下的插件数组
    ...productPlugins,
    // 路由懒加载
    "@babel/plugin-syntax-dynamic-import"
  ]
}
