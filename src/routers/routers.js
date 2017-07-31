/**
 * Created by Administrator on 2017/7/31.
 */
import Vue from 'vue'
import Router from 'vue-router'

import login from "../components/login.vue"

Vue.use(Router);
const router = new Router({
    mode:'history',
    routes:[
        {
            path:'/login',
            component:login
        },
        {
            path:'*',
            redirect:'/login'
        }
    ]
})

export default router