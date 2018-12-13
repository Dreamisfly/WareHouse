import Vue from 'vue'
import Router from 'vue-router'
var axios = require('axios')
const _import = require('../router/_import_')//获取组件的方法

Vue.use(Router);

// var getRouter = [
//     {
//         path: '/login',
//         component: _import['default'].Login,
//         name: 'login',
//         leaf: true, // 只有一个节点
//         menuShow: false,
//         meta: {
//             authStat: false
//         }
//     },
// ]; //用来获取后台拿到的路由
//
// $.ajaxSetup({
//     async: false
// });
// $.get('http://admin.ziguan.sina.com.cn/authmanager/menu/list', function(res){
//
//     // getRouter = res.data.data;//后台拿到路由
//     // saveObjArr('router', getRouter) //存储路由到localStorage
//     getRouter = filterAsyncRouter(res.data);
//
//
// }, 'json');

// 动态加载路由
// var router =  new Router({
//     routes:getRouter
// });


// function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
//     const accessedRouters = asyncRouterMap.filter(route => {
//         if (route.component) {
//             if (route.component === 'Layout') {//Layout组件特殊处理
//                 route.component = Layout
//             } else {
//                 route.component = _import['default'][route.component]
//                 //console.log(route.component)
//             }
//         }
//         if (route.children && route.children.length) {
//             route.children = filterAsyncRouter(route.children)
//         }
//         return true
//     });
//
//     return accessedRouters
// }
//
// function saveObjArr(name, data) { //localStorage 存储数组对象的方法
//     localStorage.setItem(name, JSON.stringify(data));
// }
//
// function getObjArr(name) { //localStorage 获取数组对象的方法
//     return JSON.parse(window.localStorage.getItem(name));
//
// }

// export default router;

export default new Router({
  routes: [
    {
      path: '/',
      component: _import['default'].Home,
      power: 1,
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: false,
      iconCls: 'el-icon-message', // 图标样式class
      children: [
        {meta: { authStat: true }, path: '/dashboard', component: _import['default'].Dashboard, name: '首页', menuShow: true}
      ]
    },
    {
      path: '/',
      component: _import['default'].Home,
      name: '系统设置',
      power: 1,
      menuShow: true,
      iconCls: 'el-icon-myicon-xitongguanli',
      children: [
        {meta: { authStat: true }, path: '/system/user/list', component: _import['default'].SystemUserList, name: '用户管理', menuShow: true},
        // {meta: { authStat: true }, path: '/setting/feedback', component: _import['default'].Feedback, name: '角色管理', menuShow: true},
        // {meta: { authStat: true }, path: '/classes/add', component: _import['default'].ClassesAdd, name: '权限管理', menuShow: true},
      ]
    },
    {
      path: '/',
      component: _import['default'].Home,
      name: '物品管理',
      power: 1,
      menuShow: true,
      iconCls: 'el-icon-myicon-leimupinleifenleileibie2',
      children: [
          {
            path: '/xiaodai/config',
            component: _import['default'].XiaodaiConfig,
            name: '入库',
            menuShow: true,
            redirect: {name: '查询物品'},
            children: [
                {meta: { authStat: true }, path: '/xiaodai/config/spv/list', component: _import['default'].XiaodaiConfigSpvList, name: '查询物品', menuShow: true},
                // {meta: { authStat: true }, path: '/classes/add', component: _import['default'].ClassesAdd, name: '角色管理', menuShow: true},
                // {meta: { authStat: true }, path: '/classes/add', component: _import['default'].ClassesAdd, name: '权限管理', menuShow: true},
            ]
          },

      ],
    },

  ]
})


