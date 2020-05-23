import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Layout from '../views/layout/index.vue'
import { getUser } from '../utils/storage.js'
import Home from '../views/home/index.vue'
import NotFound from '../views/page404/index.vue'
import Articles from '../views/articles/index.vue'
import AddArticle from '../views/articles/add.vue'
import EditArticle from '../views/articles/edit.vue'
import Images from '../views/Image/index.vue'
import Comments from '../views/comment/index.vue'
import Fans from '../views/fans/index.vue'
import Settings from '../views/settings/index.vue'

Vue.use(VueRouter)

const routes = [
  // 一级路由  主页
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Home }, // 二级路由主页
      { path: '/articles', component: Articles },
      { path: '/addArticle', component: AddArticle },
      { path: '/editArticle/:id', component: EditArticle },
      { path: '/image', component: Images },
      { path: '/comment', component: Comments },
      { path: '/fans', component: Fans },
      { path: '/settings', component: Settings }
    ]
  },
  { path: '/login', component: Login },
  { path: '*', component: NotFound }
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
      // console.log('路由导航守卫：你没有登录，请回去！')
      // 没有就回去登录
      next('/login')
    }
  } else {
    // 如果不是去主页，直接放行
    // console.log('如果不是去主页，直接放行')
    next()
  }
})

export default router
