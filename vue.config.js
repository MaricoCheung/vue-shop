module.exports = {
  // 解决 webpack 打包没有可用于依赖类型的模块 CssDependency
  css: {
    extract: false
  },
  // 修改webpack打包默认配置，分为开发和发布的两个入口文件
  chainWebpack: config => {
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      // entry 找到默认的打包入口，调用 clear 删除默认的打包入口
      // add 添加新的打包入口
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js')
      // 使用插件，根据开发和发布模式，切换页面标题和第三方资源渲染方式
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })

    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')
      // externals设置 webpack 的 chunk.js 排除项，减少第三方包打包在一起的体积
      config.set('externals',{
        vue:'Vue',
        'vue-router':'VueRouter',
        axios:'axios',
        lodash:'_',
        echarts:'echarts',
        nprogress:'NProgress',
        'vue-quill-editor':'VueQuillEditor'
      })
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
  }
}