// 路由器对象模块
import Vue from 'vue'
import VueRouter from 'vue-router'

import MSite from '../pages/MSite/MSite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'

//声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
    //所有路由
    routes:[
        // 都是在App.vue的基础上执行  先打开App.vue 里面有router-link 标签  
        // component 控制router-link
        {
            path:'/msite',
            component:MSite,
            // 控制是否显示底部组件
            meta:{
                showFooter:true
            }
        },
        {
            path:'/search',
            component:Search,
            meta:{
                showFooter:true
            }
        },
        {
            path:'/order',
            component:Order,
            meta:{
                showFooter:true
            }
        },
        {
            path:'/profile',
            component:Profile,
            meta:{
                showFooter:true
            }
        },
        {
            path:'/login',
            component:Login
        },
        // 默认显示msite
        // {
        //     path:'/',
        //     redirect:'/msite'
        // },
    ]
})