/**
 * Created by Administrator on 2017/8/7.
 */
import axios from 'axios'
import { HOST_CONFIG } from "./config"
var instance = axios.create({
    baseURL: HOST_CONFIG.host,
    timeout: 1000
});
export const _get = ( url ,params,okCallback,errorCallback)=>{
    instance.get(url,params)
        .then(okCallback)
        .catch(errorCallback)
}

export const _post = ( url ,data,okCallback,errorCallback)=>{
    instance.post(url,data)
        .then(okCallback)
        .catch(errorCallback)
}