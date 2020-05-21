import Vue from 'vue'
import App from './App.vue'
// 引入ElementUI和样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 脚手架工具自动创建的路由配置文件
// 由于目录下有一个名为index.js 则可以简写：省略index.js
//     完整： import XXX from './router/index.js'
//     简写： import XXX from './router'
import router from './router'
import './styles/index.less'
// 以Vue插件的格式来引入ElementUI
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
