import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式
import './assets/css/global.css'
// 导入添加商品的富文本编辑器，及其样式
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 导入请求服务器的顶部进度条，及其样式
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 导入行内树形组件
import TreeTable from 'vue-table-with-tree-grid'
// 导入异步请求axios，配置全局请求根路径，并全局挂载到Vue
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 需要授权的 API ，必须用use回调函数在请求头中使用 `Authorization` 字段提供 `token` 令牌
// 在 request 拦截器中，展示进度条
axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在 response 拦截器中，隐藏进度条
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
// Vue原型后面的$‘’是自定义属性，以下组件均可全局使用
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(VueQuillEditor)

Vue.component('tree-table', TreeTable)

Vue.filter('dateFormat', function(originVal) {
  const date = new Date(originVal)
  const y = date.getFullYear()
  const m = (date.getMonth() + 1 + '').padStart(2, '0')
  const d = (date.getDate() + '').padStart(2, '0')

  const hh = (date.getHours() + '').padStart(2, '0')
  const mm = (date.getMinutes() + '').padStart(2, '0')
  const ss = (date.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
