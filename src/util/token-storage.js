/**
 * Created by Administrator on 2017/8/7.
 */
export const saveToken = (token) =>{
    const localStorage = window.localStorage;
    try{
        localStorage.setItem('token',JSON.stringify(token));
    }catch (error){
        console.log("localStorage-save-token error");
        console.log(error);
    }
}

export const clearToken = ()=>{
    const localStorage = window.localStorage;
    try{
        if(localStorage.getItem('token')){
            localStorage.removeItem('token');
        }
    }catch (error){
        console.log("clear token error");
        console.log(error);
    }
}

export  const getToken = ()=>{
    const localStorage = window.localStorage;
    try{
        const token = localStorage.getItem('token');
        if(token)
            return token
        return null;
    }catch(error){
        console.log("getToken error");
        console.log(error);
        return null;
    }
}