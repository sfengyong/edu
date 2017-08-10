/**
 * Created by Administrator on 2017/8/7.
 */
import { clearStorage , saveToStorage ,getFromStorage } from "../../util/dealStorage"
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
        saveToStorage("token",token);
    },

    [LOGOUT](state){
        state.token = {};
        state.login = false;
        state.logout = true;
        clearStorage("token");
    }
}

const actions = {
    login:( { commit },data ) =>{
        _post(
            "http://127.0.0.1:3000/teacherLogin",
            data,
            response =>{
                commit(LOGIN,response.data);
            },
            error =>{
                console.log(error);
            })
    },
    getToken:({ commit })=>{
        const token = getFromStorage("token");
        if(token)
            commit(LOGIN,JSON.parse(token));
    }
}

export default {
    state,
    mutations,
    actions
}