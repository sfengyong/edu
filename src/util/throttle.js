export const throttle = function( method,arg,context,delay){
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
        method.call(context,arg);
    },delay);
};