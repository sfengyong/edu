/**
 * Created by Administrator on 2017/8/7.
 */
import { clearToken , saveToken } from "../../util/token-storage"
import { _post } from "../../api/axios"

const state = {
    token:{},
    login:false,
    logout:true
}

const mutations = {

    [LOGIN](state,token){
        state.token = token;
        state.login = true;
        state.logout = false;
        saveToken(token);
    },

    [LOGOUT](state){
        state.token = {};
        state.login = false;
        state.logout = true;
        clearToken();
    }
}

const actions = {
    login:( { commit },data ) =>{
        _post(
            "/login",
            data,
            response =>{
                commit(LOGIN,response.data);
            },
            error =>{
                console.log(error);
            })
    }
}

export default {
    state,
    mutations,
    actions
}