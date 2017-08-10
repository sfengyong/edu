/**
 * Created by Administrator on 2017/8/7.
 */
import axios from 'axios'
export const _get = ( url ,params,okCallback,errorCallback)=>{
    axios.get(url,params)
        .then(okCallback)
        .catch(errorCallback)
}

export const _post = ( url ,data,okCallback,errorCallback)=>{
    axios.post(url,data)
        .then(okCallback)
        .catch(errorCallback)
}