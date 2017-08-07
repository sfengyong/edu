/**
 * Created by Administrator on 2017/8/7.
 */
import * as getters from "./getters"
import login from "./module/login"


export default new Vuex.Store({
    getters,
    modules:{
        login
    }
})