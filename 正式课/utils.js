var utils = (function () {
    console.log(666);
    //1. 类数组转数组    *****这个调用的时候是utils.toArray()*******
    let toArray = function (likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry);
        } catch (e) { //e代表的是try中的代码错误信息
            for (var i = 0; i < likeAry.length; i++) {
                ary.push(likeAry[i]);
            }
        }
        return ary
    };
    //2. 求一组数的平均数  *****这个调用的时候是utils.mean()*******
    let mean = function () {
        let ary = toArray(arguments);
        ary.sort((a, b) => a - b);
        ary.pop();
        ary.shift();
        let res = eval(ary.join('+')) / ary.length;
        return res;
    }
    //3. 获取url地址？后面的参数信息(可能也包括hash值)
    function queryUrlParams() {
        let reg = /([^#=?&]+)=([^#=?&]+)/g;
        let obj = {}; //创建一个空对象，用来存储一会处理的键值对
        this.replace(reg, (...[, key, value]) => {
            obj[key] = value
        });
        this.replace(/#([^#=?&]+)/, (...[, value]) => {
            obj['hash'] = value
        });
        return obj;
    }

    //4.检测某个属性是否为公有属性
    let hasPubProperty = function (value) {
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
    //5. 数组去重
    let myUnique = function () {
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
    //6.push
    let myPush = function (...n) {
        for (var i = 0; i < arguments.length; i++) {
            this[this.length] = arguments[i];
        }
        return this.length;
    }
    //7. 任意数求和
    let mySum = function () {
        let item = toArray(arguments);
        // var total = 0;
        // for(let i=0;i<item.length;i++){
        //     total += item[i]; 
        // }
        return eval(item.join('+'));
        // return total;
    }

    //8.时间字符串格式化
    //把tempLate写在形参的位置，给它赋默认值，可以灵活地改变年月日时分秒的样式
    function formatTime(tempLate = '{0}年{1}月{2}日 {3}时{4}分{5}秒') {
        // 把字符串里的年月日时分秒都拿到以数组的格式["2019","12","3","12","10","3"]
        let timeAry = this.match(/(\d+)/g);
        tempLate = tempLate.replace(/\{(\d)\}/g, (...[, index]) => {
            let time = timeAry[index] || '00';
            return time.length < 2 ? '0' + time : null;
        })
        return tempLate;
    }
    // console.log(time.formeTime('{0}-{1}-{2} {3}:{4}'))

    //9. 把单词首字母大写
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
    // console.log(str.toFirstUpperCase());

    //10. 获取属性值
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
    //11. 给元素设置单个属性值
    function setCss(curEle, attr, value) { // curELe:元素  attr:属性   value :值

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
    //12. 给元素设置多个属性值
    function setGroupCss(curEle, options) {
        if (typeof options === "object") {
            for (var key in options) {
                // console.log(1);
                // 只循环私有属性
                setCss(curEle, key, options[key])
            }
        }

    }
    //13.封装一个方法，既能获取样式，也可以单个设置样式，也可以成组设置样式
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
        while (p && p.tagName !== 'BODY') {
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
            l,
            t
        }

    }

    // 
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
    //12. millimeter:实现大数字的千分符的处理
    function millimeter() { //1234455555
        return this.replace(/\d{1,3}(?=(\d{3})+$)/g, content => content + ",");
    }



    return {
        toArray, //类数组转数组
        mean, //求一组数的平均数 
        hasPubProperty, //检测某个属性是否为公有属性
        myUnique, //数组去重
        myPush, //push
        mySum,
        queryUrlParams,
        formatTime,
        toFirstUpperCase,
        onscroll,
        win,
        millimeter, //千分符
        offset,
        css,
        setGroupCss,
        setCss,

    }
})()