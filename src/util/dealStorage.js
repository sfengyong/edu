/**
 * Created by Administrator on 2017/8/7.
 */
export const saveToStorage = (type,data) =>{
    const localStorage = window.localStorage;
    try{
        localStorage.setItem(type,JSON.stringify(data));
    }catch (error){
        console.log("localStorage-save-"+ type +" error");
        console.log(error);
    }
}

export const clearStorage = (type)=>{
    const localStorage = window.localStorage;
    try{
        if(localStorage.getItem(type)){
            localStorage.removeItem(type);
        }
    }catch (error){
        console.log("clear"+ type+" error");
        console.log(error);
    }
}

export  const getFromStorage = (type)=>{
    const localStorage = window.localStorage;
    try{
        const token = localStorage.getItem(type);
        if(token)
            return token
        return null;
    }catch(error){
        console.log("get"+type+" error");
        console.log(error);
        return null;
    }
}