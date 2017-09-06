export const cloneObject = function(obj){

    var o = obj instanceof Array  ? [] : {} ;
    for( var i in obj ){
        if( obj.hasOwnProperty(i) ){
            o[i] = typeof obj[i] === 'object' ? cloneObject( obj[i] ) : obj[i];
        }
    }
    return o;
}