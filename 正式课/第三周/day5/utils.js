let utils = (function(){
    function offset(curEle){
        let l = curEle.offsetLeft;
        let t = curEle.offsetTop;
        let parent = curEle.offsetParent;
        while(parent){
            l += parent.clientLeft + parent.offsetLeft;
            t += parent.clientTop + parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {l,t};
    }
    function win(attr,value){
        let ele = document.documentElement || document.body;
        if(value === undefined){
            return ele[attr];
        }else{
            ele[attr] = value;
        }
    }



    return {
        offset,
        win,
    }
})()