/**
 * Created by Administrator on 2017/8/7.
 */
import { _get } from "../../api/axios"
import { USERINFO } from "../mutations-type"

const state = {
    userInfo:{}
}

const mutations = {
    [USERINFO](state,userInfo){
        state.userInfo = userInfo;
    }
}

const actions = {
    getUserInfo:( { commit } , token) =>{
        _get(
            "/getUserInfo",
            {
                token:token
            },
            response =>{
                commit( USERINFO , response.data);
            },
            error =>{
                console.log(error);
            }
        )
    }
}

export default {
    state,
    mutations,
    actions
}


