let utils = (function(){
    let toArray = function(likeAry){
        return [].slice.call(likeAry)
    };
    return {
        toArray
    }
})()