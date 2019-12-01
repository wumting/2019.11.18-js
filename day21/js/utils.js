var utils = (function(){
    //1. 类数组转数组    *****这个调用的时候是utils.toArray()*******
    let toArray = function(likeAry){
        // let ary = Array.prototype.slice.call(likeAry);

        return Array.from(likeAry);
    }
    //2. 求一组数的平均数  *****这个调用的时候是utils.mean()*******
    let mean = function(){
        let ary = toArray(arguments);
        ary.sort((a,b)=>a-b);
        ary.pop();
        ary.shift();
        let res = eval(ary.join('+'))/ary.length;
        return res;
    }
    //3. 通过key获得相应等号后面的值
    let getParam = function (key) {
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
    let hasPubProperty = function (value){
        //验证传递的属性名合法性（一般只能是数字或字符串等基本值）
        let res = ['Number','string','boolean'];
        if( !res.includes(typeof value )){
            return false;
        }
        //开始校验是否为公有的属性（方法中的this就是要校验的对象）
        let property = value in this;
        let hasOwn = this.hasOwnProperty(value);
        return property&&!hasOwn ; 
    }
    Object.prototype.hasPubProperty = hasPubProperty;

    //5. 数组去重
    let myUnique = function (){
        //没有传递要操作的ary进来，但是方法中的this是当前要操作的数组
        let obj ={};
        for(var i=0;i<this.length;i++){//this->一般是当前类的实例
            if(obj[this[i]] !== undefined) {
                this[i] = this[this.length-1];
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
    let myPush = function(n){
            this[this.length] = n;
    }
    Array.prototype.myPush = myPush;
    //7. 任意数求和
    let mySum = function(){
         let item = toArray(arguments);
         return eval(item.join('+')); 
    }
    Array.prototype.mySum = mySum;

    return {
        toArray,//类数组转数组
        mean,//求一组数的平均数 
        getParam,//通过key获得相应等号后面的值
        hasPubProperty,//检测某个属性是否为公有属性
        myUnique,//数组去重
        myPush,//push
        mySum
    }
})()
 