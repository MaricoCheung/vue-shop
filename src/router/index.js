import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由懒加载，把路由组件按组分块打包，把一次性加载组件 为 按访问加载组件【提高页面加载性能】

// import Login from '../components/Login.vue'
const Login = () => import(/* webpackChunkName:"login" */ '../components/Login.vue')

// import Home from '../components/Home.vue'
const Home = () => import(/* webpackChunkName:"home_welcome" */ '../components/Home.vue')
// import Welcome from '../components/Welcome.vue'
const Welcome = () => import(/* webpackChunkName:"home_welcome" */ '../components/Welcome.vue')

// import Users from '../components/user/Users.vue'
const Users = () => import(/* webpackChunkName:"users" */'../components/user/Users.vue')

// import Rights from '../components/power/Rights.vue'
const Rights = () => import(/* webpackChunkName:"power" */'../components/power/Rights.vue')
// import Roles from '../components/power/Roles.vue'
const Roles = () => import(/* webpackChunkName:"power" */'../components/power/Roles.vue')

// import Cate from '../components/goods/Cate.vue'
const Cate = () => import(/* webpackChunkName:"goods" */'../components/goods/Cate.vue')
// import Params from '../components/goods/Params.vue'
const Params = () => import(/* webpackChunkName:"goods" */'../components/goods/Params.vue')
// import List from '../components/goods/List.vue'
const List = () => import(/* webpackChunkName:"goods" */'../components/goods/List.vue')
// import Add from '../components/goods/Add.vue'
const Add = () => import(/* webpackChunkName:"goods" */'../components/goods/Add.vue')

// import Order from '../components/order/Order.vue'
const Order = () => import(/* webpackChunkName:"order" */'../components/order/Order.vue')

// import Report from '../components/report/Report.vue'
const Report = () => import(/* webpackChunkName:"report" */'../components/report/Report.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Cate },
      { path: '/params', component: Params },
      { path: '/goods', component: List },
      { path: '/goods/add', component: Add },
      { path: '/orders', component: Order },
      { path: '/reports', component: Report }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫，to是将要访问的，from是从哪里来，next下一个放行操作
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取登陆页面的token
  const tokenStr = window.sessionStorage.getItem('token')
  // 若空值则不给访问
  if (!tokenStr) {
    return next('/login')
  } else {
    next()
  }
})

export default router
