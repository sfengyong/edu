/**
 * Created by Administrator on 2017/8/7.
 */
import { clearToken , saveToken ,getToken } from "../../util/token-storage"
import { _post } from "../../api/axios"
import { LOGIN ,LOGOUT } from "../mutations-type"

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
        console.log("set token");
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
            "/teacherLogin",
            data,
            response =>{
                commit(LOGIN,response.data);
            },
            error =>{
                console.log(error);
            })
    },
    getToken:({ commit })=>{
        const token = getToken();
        if(token)
            commit(LOGIN,JSON.parse(token));
    }
}

export default {
    state,
    mutations,
    actions
}