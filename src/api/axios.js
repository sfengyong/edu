/**
 * Created by Administrator on 2017/8/7.
 */
export const _get = ( url ,params,okCallback,errorCallback)=>{
    this.$http.get(url,params)
        .then(okCallback)
        .catch(errorCallback)
}

export const _post = ( url ,data,okCallback,errorCallback)=>{
    this.$http.post(url,data)
        .then(okCallback)
        .catch(errorCallback)
}