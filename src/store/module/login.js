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

    [LOGIN](state,data){
        if(data.success){
            state.token = data.token;
            state.login = true;
            state.logout = false;
            saveToStorage("token",data.token);
        }else{
            state.token = {};
            state.login = false;
            state.logout = true;
            clearStorage("token");
        }
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
            "teacherLogin",
            data,
            response =>{
                if(response)
                    commit(LOGIN,response.data);
            },
            error =>{
                console.log(error);
            })
    },
    logout:( { commit } ) =>{
        commit(LOGOUT);
    },
    getToken:({ commit })=>{
        const token = getFromStorage("token");
        if(token)
            commit(LOGIN,{success:true,token:token});
    }
}

export default {
    state,
    mutations,
    actions
}