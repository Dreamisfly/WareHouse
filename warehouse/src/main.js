// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入API文件
import api from './api/index.js'
import common from './api/function.js'
import val from './api/common_val.js'
import router from './router/index'
import App from './App'
// import './element/index.js'
// ueditor使用
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.js'

Vue.use(ElementUI)
Vue.config.productionTip = false
// 将API方法绑定到全局
Vue.prototype.$api = api
Vue.prototype.$common = common
Vue.prototype.$val = val
// router.beforeEach((to, from, next) => {
//   if (to.meta.authStat) {
//     if (!sessionStorage.getItem('access-token')) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
