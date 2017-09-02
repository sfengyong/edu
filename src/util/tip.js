import { Toast } from 'mint-ui'

export const tip = (mes,place,time,icon) => {
    Toast({
        message: mes,
        iconClass: icon =="" ? "" : icon + " " + 'iconfont'  ,
        position:place,
        duration:time
    });
}