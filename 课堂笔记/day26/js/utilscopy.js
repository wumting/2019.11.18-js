var utils = (function () {
    console.log(333);
    //1. 类数组转数组    *****这个调用的时候是utils.toArray()*******
    function toArray(likeAry) {
        // let ary = Array.prototype.slice.call(likeAry);

        return Array.from(likeAry);
    }
    //2. 求一组数的平均数  *****这个调用的时候是utils.mean()*******
    function mean() {
        let ary = toArray(arguments);
        ary.sort((a, b) => a - b);
        ary.pop();
        ary.shift();
        let res = eval(ary.join('+')) / ary.length;
        return res;
    }
    //3. 通过key获得相应等号后面的值
    function getParam(key) {
        let index = this.indexOf('?');
        let param = this.substr(index + 1);
        let param1 = param.split('&');
        let obj = {};
        for (var i = 0; i < param1.length; i++) {
            let newParam = param1[i].split('=');
            obj[newParam[0]] = newParam[1];
        }
        return obj[key];
    }
    String.prototype.getParam = getParam;

    //4.检测某个属性是否为公有属性
    function hasPubProperty(value) {
        //验证传递的属性名合法性（一般只能是数字或字符串等基本值）
        let res = ['Number', 'string', 'boolean'];
        if (!res.includes(typeof value)) {
            return false;
        }
        //开始校验是否为公有的属性（方法中的this就是要校验的对象）
        let property = value in this;
        let hasOwn = this.hasOwnProperty(value);
        return property && !hasOwn;
    }
    Object.prototype.hasPubProperty = hasPubProperty;

    //5. 数组去重
    function myUnique() {
        //没有传递要操作的ary进来，但是方法中的this是当前要操作的数组
        let obj = {};
        for (var i = 0; i < this.length; i++) { //this->一般是当前类的实例
            if (obj[this[i]] !== undefined) {
                this[i] = this[this.length - 1];
                this.length--;
                i--;
                continue;
            }
            obj[this[i]] = this[i];
        }
        obj = null;
        return this;
    }
    Array.prototype.myUnique = myUnique;
    //6.push
    function myPush(n) {
        this[this.length] = n;
    }
    Array.prototype.myPush = myPush;
    //7. 任意数求和
    let mySum = function () {
        let item = toArray(arguments);
        return eval(item.join('+'));
    }
    Array.prototype.mySum = mySum;
    //8.url
    function queryUrlParams() {
        let reg = /([^#=?&]+)=([^#=?&]+)/g;
        let obj = {}; //创建一个空对象，用来存储一会处理的键值对
        this.replace(reg, (content, key, value) => {
            //content是每一次全局捕获的内容
            //key是每一次第一个分组捕获的内容(作为属性名)
            //value是每一次第二个分组捕获的内容(作为属性值)
            //把url里的参数捕获出来，以键值对的形式赋值给obj对象
            obj[key] = value;
        })
        this.replace(/#([^#=?&]+)/, (content, value) => {
            obj['hash'] = value;
        }); // 把url里的hash值捕获出来，以键值对的格式赋值给obj对象
        return obj; // 最后把obj对象return 出去
    }
    String.prototype.queryUrlParams = queryUrlParams;
    //9.字符串时间格式化
    //把tempLate写在形参的位置，给它赋默认值，可以灵活地改变年月日时分秒的样式
    function formeTime(tempLate = '{0}年{1}月{2}日 {3}时{4}分{5}秒') {
        // 把字符串里的年月日时分秒都拿到以数组的格式["2019","12","3","12","10","3"]
        let timeAry = this.match(/(\d+)/g);
        tempLate = tempLate.replace(/\{(\d)\}/g, (content, index) => {
            // console.log(index)
            let time = timeAry[index] || '00';
            time.length < 2 ? time = '0' + time : null;
            return time;
        })
        return tempLate;
    }
    String.prototype.formeTime = formeTime;
    // console.log(time.formeTime('{0}-{1}-{2} {3}:{4}'))

    //10. 把单词首字母大写
    function toFirstUpperCase() {
        let reg = /\b([a-z])[a-z]*\b/g;
        let strAry = this.replace(reg, function () {
            // console.log(big, small)
            // console.log(arguments)
            let [word, firstWord] = arguments // 把每一次捕获的单词和分组捕获的单词首个字母解构出来
            firstWord = firstWord.toUpperCase() // 把首字母转大写
            word = word.slice(1) // 把单词从第二项开始截取
            return firstWord + word;
        })
        return strAry;
    }
    String.prototype.toFirstUpperCase = toFirstUpperCase;
    // console.log(str.toFirstUpperCase());

    //11.
    function win(attr, val) {
        if (val === undefined) {
            return document.documentElement[attr] || document.body[attr]
        } else {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
    }
    // win('scrollTop', 500);
    // console.log(win('scrollTop'));
    //12
    function getCss(curEle, attr) {
        var val;
        if ("getComputedStyle" in window) {
            val = getComputedStyle(curEle)[attr];
        } else {
            if (attr === "opacity") {
                var cur = curEle.currentStyle["filter"];
                // alpha(opacity=30)
                var reg = /alpha\(opacity=(\d+(\.\d+)?)\)/;
                val = reg.exec(cur)[1] / 100;
            } else {
                // 不是透明度执行此处代码
                val = curEle.currentStyle[attr];
            }
        }

        if (!isNaN(parseFloat(val))) {
            val = parseFloat(val);
        }
        return val;
    }

    function setCss(curEle, attr, value) { // curELe:元素   attr:属性   value :值

        if (attr === "opacity") {
            curEle.style[attr] = value;
            curEle.style["filter"] = "alpha(opacity=" + value * 100 + ")";
            return;
        }
        var reg = /^((width|height)|((margin|padding)?(top|left|right|bottom)?))$/i;
        if (reg.test(attr)) {
            value = value + "px";
        }
        curEle.style[attr] = value;
    }

    function setGroupCss(curEle, options) {
        if (typeof options === "object") {
            for (var key in options) {
                //            console.log(1);
                // 只循环私有属性
                setCss(curEle, key, options[key])
            }
        }

    }

    function css() {
        // 根据参数的个数以及参数的类型进行判断，执行不同的方法
        var curEle = arguments[0],
            val = null,
            attr = null,
            length = arguments.length;
        if (length === 3) {
            val = arguments[2];
            attr = arguments[1];
            setCss(curEle, attr, val);
            return;
        }
        if (length === 2 && typeof arguments[1] === "object") {
            val = arguments[1];
            setGroupCss(curEle, val);
            return;
        }
        attr = arguments[1];
        return getCss(curEle, attr)
    };

    function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var p = curEle.offsetParent;
        while (p) {
            if (!/MSIE 8.0/.test(navigator.userAgent)) {
                // 只要不是IE8浏览器，那么会进此处的判断
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {
            left: l,
            top: t
        }

    }

    function win(attr, value) {
        if (typeof value === "undefined") {
            // 传一个参数，获取
            return document.documentElement[attr] || document.body[attr]
        }
        // 设置
        document.documentElement[attr] = value;
        document.body[attr] = value;
    };
    //13. exec
    function execAll(str = ''){
        if(!this.global){
            return this.exec(str);
        }
        let ary = [],res = this.exec(str);
        while(res){
            ary.push(res[0]);
            res = this.exec(str);
        }
        return ary.length === 0?null:ary;
    }
    RegExp.prototype.execAll = execAll;

    return {
        toArray, //类数组转数组
        mean, //求一组数的平均数 
        getParam, //通过key获得相应等号后面的值
        hasPubProperty, //检测某个属性是否为公有属性
        myUnique, //数组去重
        myPush, //push
        mySum,
        // url,
        formeTime,
        toFirstUpperCase,
        onscroll,
        win,
        getCss,
        setCss,
        setGroupCss,
        css,
        offset,
        win,
        execAll,

    }
})()