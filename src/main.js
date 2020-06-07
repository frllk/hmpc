import Vue from 'vue'
import App from './App.vue'
// 引入ElementUI和样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入vuex
import store from '@/store/index.js'

// 脚手架工具自动创建的路由配置文件
// 由于目录下有一个名为index.js 则可以简写：省略index.js
//     完整： import XXX from './router/index.js'
//     简写： import XXX from './router'
import router from './router'
import './styles/index.less'
// 以Vue插件的格式来引入ElementUI
Vue.use(ElementUI)
Vue.config.productionTip = false

// ******************** 事件总线 eventBus ************************// Vue是一个构造器，它有一个原型对象prototype
// Vue.prototype.$eventBus 给Vue的原型对象补充一个名为$eventBus的属性
//     属性名是$eventBus，值是一个全新的Vue的实例: 用它当充当事件对象

// 如果给prototype上添加属性，则所有的实例都拥有$eventBus这个属性，
// 也就是所有的组件(组件也是Vue的实例)中都可以访问this.$eventBus!
Vue.prototype.$eventBus = new Vue()

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
