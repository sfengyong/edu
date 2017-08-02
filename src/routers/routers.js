/**
 * Created by Administrator on 2017/7/31.
 */
import Vue from 'vue'
import Router from 'vue-router'

import login from "../components/login.vue"
import main from "../components/main.vue"
import home from "../components/home.vue"
import me from  "../components/me.vue"

Vue.use(Router);
const router = new Router({
    mode:'history',
    routes:[
        {
            path:'/login',
            component:login
        },
        {
            path:'/main',
            component:main,
            children:[{
                path:'home',
                component:home
            },{
                path:'me',
                component:me
            }]
        },
        {
            path:'*',
            redirect:'/login'
        }
    ]
})

export default router