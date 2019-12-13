// 闭包
// 单例模式
var utils  = (function () {
    console.log(333)
    function toArray(likeAry) {
        var  ary = [];
        try{
            ary = Array.prototype.slice.call(likeAry);
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
//                ary.push(likeAry[i])
                ary[ary.length] = likeAry[i];
            }
        };
        return ary;
    };
    function toJSON(str) {
        return  "JSON" in window ? JSON.parse(str):eval("("+str+")");
    };
    function getCss(curEle,attr) {
        var val;
        if("getComputedStyle" in  window){
            val = getComputedStyle(curEle)[attr];
        }else{
            if(attr==="opacity"){
                var  cur = curEle.currentStyle["filter"];
                // alpha(opacity=30)
                var  reg = /alpha\(opacity=(\d+(\.\d+)?)\)/;
                val =reg.exec(cur)[1]/100;
            }else{
                // 不是透明度执行此处代码
                val = curEle.currentStyle[attr];
            }
        }

        if(!isNaN(parseFloat(val))){
            val = parseFloat(val);
        }
        return val;
    }
    function setCss(curEle,attr,value) {// curELe:元素   attr:属性   value :值

        if(attr==="opacity"){
            curEle.style[attr] = value;
            curEle.style["filter"] = "alpha(opacity="+value*100+")";
            return;
        }
        var  reg = /^((width|height)|((margin|padding)?(top|left|right|bottom)?))$/i;
        if(reg.test(attr)){
            value = value + "px";
        }
        curEle.style[attr] = value;
    }
    function setGroupCss(curEle,options) {
        if(typeof options==="object"){
            for(var key in options){
                //            console.log(1);
                // 只循环私有属性
                setCss(curEle,key,options[key])
            }
        }

    }
    function css() {
        // 根据参数的个数以及参数的类型进行判断，执行不同的方法
        var curEle = arguments[0],
            val = null,
            attr = null,
            length = arguments.length;
        if(length===3){
            val = arguments[2];
            attr = arguments[1];
            setCss(curEle,attr,val);
            return;
        }
        if(length===2&&typeof arguments[1]=== "object"){
            val = arguments[1];
            setGroupCss(curEle,val);
            return;
        }
        attr = arguments[1];
        return getCss(curEle,attr)
    };
    function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var p= curEle.offsetParent;
        while(p){
            if(!/MSIE 8.0/.test(navigator.userAgent)){
                // 只要不是IE8浏览器，那么会进此处的判断
                l +=p.clientLeft;
                t +=p.clientTop;
            }
            l+=p.offsetLeft;
            t+=p.offsetTop;
            p = p.offsetParent;
        }
        return {left:l,top:t}

    }
    function win(attr,value) {
        if(typeof value==="undefined"){
            // 传一个参数，获取
            return document.documentElement[attr] || document.body[attr]
        }
        // 设置
        document.documentElement[attr] = value;
        document.body[attr] = value;
    };
return {
    toArray : toArray,
    toJSON : toJSON,
    getCss:getCss,
    setCss:setCss,
    setGroupCss:setGroupCss,
    css:css,
    offset:offset,
    win:win
}
})();

