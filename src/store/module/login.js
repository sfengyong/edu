/**
 * Created by Administrator on 2017/8/7.
 */
import { clearStorage , saveToStorage ,getFromStorage } from "../../util/dealStorage"
import { _post } from "../../api/axios"
import { POST_URL } from "../../api/config"
import { LOGIN ,LOGOUT } from "../mutations-type"
import { tip } from "../../util/tip"

const state = {
    token:{},
    login:false,
    logout:true
}

const mutations = {

    [LOGIN](state,data){
        state.token = data.token;
        state.login = true;
        state.logout = false;
    },

    [LOGOUT](state){
        state.token = {};
        state.login = false;
        state.logout = true;
    }
}

const actions = {
    login:( { commit },data ) =>{
        _post(
            POST_URL.TEACHERLOGIN,
            data,
            response =>{
                if(response.data.success){
                    saveToStorage("token",response.data.token);
                    commit(LOGIN,response.data);
                }else{
                    tip("登录失败","middle",2500);
                    commit(LOGOUT);
                }
            },
            error =>{
                console.log(error);
            })
    },
    logout:( { commit } ) =>{
        clearStorage("token");
        clearStorage("teacherInfo");
        commit(LOGOUT);
        tip("请重新登录","middle",2500);
    },
    getToken:({ commit })=>{
        const token = getFromStorage("token");
        if(token)
            commit(LOGIN,{token:token});
    }
}

export default {
    state,
    mutations,
    actions
}