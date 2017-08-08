/**
 * Created by Administrator on 2017/7/31.
 */
import Vue from 'vue'
import Router from 'vue-router'

import login from "../components/login.vue"
import main from "../components/main.vue"
import courseManage from "../components/courseManage.vue"

import store from "../store/"

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
            meta: {
                requireLogin: true
            }
        },
        {
            path:'/courseManage',
            component:courseManage,
            meta: {
                requireLogin: true
            }
        },
        {
            path:'*',
            redirect:'/login'
        }
    ]
})

router.beforeEach(( to, from ,next ) =>{
    store.dispatch('getToken');
    if( to.meta.requireLogin ){
        const login = store.getters.login;
        if(login)
            next();
        else
            next({
                path:"/login"
            })
    }else{
        next();
    }
})

export default router