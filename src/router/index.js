import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Layout from '../views/layout'
import { getUser } from '../utils/storage'
import Articles from '../views/articles/index.vue'
import AddArticle from '../views/articles/add.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/articles', component: Articles },
      { path: '/addArticle', component: AddArticle }
    ]
  },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})

/**
 * 路由导航守卫
 * 所有的路由页面中跳转，都会先进入到这个函数中来。
 * to：要跳入的路由信息。你要去哪里
 * from：要跳出的路由信息。你从哪里来
 * next：放行方法
 *    - next()：正确跳转。允许进入到to路由
 *    - next(路由地址)：不允许去to，而转去指定的路由地址
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    const userInfo = getUser()
    if (userInfo && userInfo.token) {
      // 有就放行
      next()
    } else {
      console.log('路由导航守卫：你没有登录，请回去！')
      // 没有就回去登录
      next('/login')
    }
  } else {
    // 如果不是去主页，直接放行
    console.log('如果不是去主页，直接放行')
    next()
  }
})

export default router
