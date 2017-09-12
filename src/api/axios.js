/**
 * Created by Administrator on 2017/8/7.
 */
import axios from 'axios'
import { HOST_CONFIG } from "./config"
import router from "../routers/routers"
import store from "../store/"

var instance = axios.create({
    baseURL: HOST_CONFIG.host,
    headers: {'X-Requested-With': 'XMLHttpRequest'},   
});

instance.interceptors.response.use((response) => {
    if(response.data.status == -1){
        store.dispatch("logout");
        router.push({path:"/login"});
    }
});

export const _get = ( url ,data,okCallback,errorCallback)=>{
    instance.get(url,{
        params:data
    })
    .then(okCallback)
    .catch(errorCallback)
}

export const _post = ( url ,data,okCallback,errorCallback)=>{
    instance.post(url,data)
        .then(okCallback)
        .catch(errorCallback)
}