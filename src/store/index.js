/**
 * Created by Administrator on 2017/8/7.
 */
import Vue from  'vue'
import Vuex from 'vuex'
import * as getters from "./getters"
import login from "./module/login"
import teacherInfo from "./module/teacherInfo"

Vue.use(Vuex)
export default new Vuex.Store({
    getters,
    modules:{
        login,
        teacherInfo
    }
})