/**
 * Created by Administrator on 2017/8/7.
 */
import { _get } from "../../api/axios"
import { TEACHERINFO } from "../mutations-type"
import { saveToStorage,getFromStorage } from "../../util/dealStorage"

const state = {
    teacherInfo:{}
}

const mutations = {
    [TEACHERINFO](state,teacherInfo){
        state.teacherInfo = teacherInfo;
        saveToStorage("teacherInfo",teacherInfo);
    }
}

const actions = {
    getTeacherInfo:( { commit } , token) =>{
        _get(
            "http://127.0.0.1:3000/getTeacherInfo",
            {
                token:token
            },
            response =>{
                commit( TEACHERINFO , response.data);
            },
            error =>{
                console.log(error);
            }
        )
    },
    getTeacher:( {commit }) =>{
        const teacherInfo = getFromStorage("teacherInfo");
        if(teacherInfo)
            commit(TEACHERINFO,JSON.parse(teacherInfo));
    }
}

export default {
    state,
    mutations,
    actions
}


