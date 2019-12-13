# 浏览器
- webkit(v8)
    + Chrome
    + 手机浏览器
    + safari
    + 国产浏览器
- Gecko
    + FireFox
- Prosto
    + Opera
- Trident
    + IE
    +IE EDGE （chrome mini）

# js组成
    - DOM
    - BOM
    - ECMAScript

# js创建变量
- var、let、const、function、class、import、Symbol
# js的命名规范
- 
```
let xueshengInfo
```
# js的数据类型
- 基本数据类型（简单数据类型）
    + number
    + string
    + boolean
    + null
    + undefined
- 引用数据类型（复杂数据类型）
    + object
        + 普通对象
        + 数组
        + Math
        + Date的实例
        + /^$/
    + Function
        + 普通函数
        + 类
# number
> 有效数字: 2,0,-1, -1.5
> NaN:(not a number):他是number数据类型的一种
- NaN和谁都不相等（包括自己）

- 把其他数据类型转换为数字
    + 字符串转数字
        + 空字符串转是0
        + 字符串中一旦出现了非有效数字，那就过就是NaN（第一个小数点、+、-不算）
        + 会自动去除两边的空格
    + boolean转数字
        + true=>1
        + false=>0
    + null=>0
    + undefined=>NaN
    + 普通对象
        + 转字符串在转数字('[object Object]')=>NaN
    + 数组
        + 转字符串在转数字
        + 把中括号去掉换成引号，然后把数组的每一项都去转字符串（逗号不能丢）
            [null, undefined] =>','=>NaN

            [null]=>''=>0
            [{}, {}]=>'[object Object],[object Object]'
+ parseInt和parseFloat（字符串转数字）
    + 从左到右依次进行查找，一旦遇到非有效数字，立即停止查找，把找到的有效数字返回出去（parseInt不可以识别小数点，parseFloat可以识别一位小数点）
+ 利用四则运算可以还转数字
+ isNaN:检测一个值是否是一个非有效数字，如果是非有效数字，那就是true，反之就是false
（检测一个值，如果是有效数字，那就是false。反之就是true）
    + 在检测的时候如果值不是number数据类型的，要先转number，在判断

# string
> 用单引号。双引号、反引号（``）包起来的都是字符串
-天生自带一个length属性，代表字符串的长度或者个数
- 空格也是字符
- 把其他数据类型转字符串
    + 把number、boolean转字符串是直接加引号
    + null.toString() 报错  //  null+''
    + undefined.toString() 报错  // undefined+''
    + 普通对象  => '[object Object]'
    + 数组 =>把中括号去掉换成引号，然后把数组的每一项都去转字符串（逗号不能丢）

```
let str = 'asd';
console.log(str[0])
```

- 四则运算
    + 乘、除、减都是正常的运算，如果在运算的过程中，运算的值不是number数据类型的，要先转number；如果运算过程中出现了NaN，那结果就是NaN

    + 加法有可能出现字符串拼接，如果引号和加号相遇了，那就直接拼接不转换数据类型（基本数据类型）
    + 在拼接过程中，如果是引用数据类型，还要给他转数字，（但是在转数字的过程中，要先转字符串，当字符串和加号相遇，就不往下转了，直接拼接）

   # boolean（true、fasle）
   - 其他数据类型转布尔有且只有NaN、null、undefined、''、0是false，其余都是true
   - 自己转自己还是自己
   # null和undefined
   - null：是意料之中的（一开始我们手动赋值为null，之后再进行重新赋值）
   let ss = null;
        ss = 100
        let pigFather = null;
            pigFather = 'xioaHua'
    - undefined(意料之外的，一般都是浏览器默认的机制)
    let  = null;
    console.log(num)

# 普通对象
    -对象外层由大括号包裹，里面存放的是0到多组键值对，由逗号隔开
    - 每一个键值对由属性名和属性值组成，中间拿冒号分割，
    - 属性名是字符串（字符串可以省略），也可以是数字
    - 属性值必须是js数据类型的一种
    ```
    let obj = {
        name: 'erYa',
        age: 18,
        sex: 'gril'，
        3： true
    }

    let person  = {
        name: 'erYa',
        age: 18,
        ....
    }
    ```

    #  数组
    - 数组外层由中括号包裹，里面存贮的0到多个属性值，他的属性名是浏览器内置的，从0开始，依次递增，代表值的位置=>索引
    - 天生自带length属性，它代表数组的长度或者个数

    ```
    let ary  =[2, 1, 4,true,null];
    ary.length = ary.length-1 // 删除数组的最后一项
    ary.length--
    ary[0] = 1
    ary[ary.length] = 3
    ary[ary.length-1]
    ```

    # if/else if /else

    - &&:如果前边的值转布尔是true，那就取后边的值，反之就取前边的
    - ||:如果前边转布尔是false，那就取后面的
    - %:取余数
    - +=/-=
    - i++/i--:先取值后运算
    - ++i/--i:先运算后取值

    ```
    let num = 1&&2;
    console.log(num) // 2
    let num1 = 0&&1;
    console.log(num1) // 0
    let num2 = 0&&NaN

    if(&&1){
        
    }
    let num = 1&&NaN&&3&&4&&5&&6&&0;
    console.log(num)

    ||:如果前边转布尔是false，那就取后面的,反之就取前边的
    let num = 1||2
    console.log(num)  // 1

    - &&:如果前边的值转布尔是true，那就取后边的值，反之就取前边的
    - ||:如果前边转布尔是false，那就取后面的

    let num3 = 0&&1 || 1&&2; // 2  1  2  2  
                 1&&2  2 


    let num = 2;
    num+=3 // =>num = num+3
    console.log(num)

    let i=2; // 3 4  5  6
    console.log(i++ == ++i);// 2  4
    console.log(++i == i++); // 5   5 
    console.log(i); 6
    ```

    ```
    // 如果小括号里的值转布尔是true，那条件就成立，大括号里的代码就执行
    // 只要有一个条件成立了，那其他的条件就不走了
    if(){

    }
    else if(){

    }
    else if(){

    }
    else {
        // 以上条件都不成立，else大括号里的代码执行
    }
    ```
    # switch case

    ```
    switch(val){
        case val:
            做你想做的事
            break;
        case val:
            做你想做的事
            break;
        default:
            以上条件都不成立，执行这里
    }

    ```
    # 数据类型比较

    ```
    == :会默认进行数据类型的转换
    ===:全等，不会进行数据类型转换
    =：赋值

    数字 == 字符串：把字符串转换为数字，在进行比较
    数字 == 布尔 ：把布尔转换为数字，在进行比较
    数字 == 对象：把对象转换为数字，在进行比较
    字符串 == 布尔：统统转数字，在进行比较
    对象 == 布尔：统统转数字，在进行比较
    字符串 == 对象：把对象转字符串，在进行比较
    对象 == 对象：比较的空间地址
    null == undefined // true
    null == null // true
    undefined == undefined // true
    null和undefined和其他值都不相等
    NaN == NaN // false

    基本数据类型操作的是值
    引用数据类型操作的地址
    ```

    # for循环

        ```
        for(var i = 0;i<3;i++){
            continue; // 结束本轮循环体重的代码，下面的代码不执行
            console.log(5)
        }

          for(var i = 0;i<3;i++){
            console.log(5);
            break; // 结束整个循环，下面得代码不执行
            console.log(6)
        }
        // 创建循环初始值
        // （创建）判断循环的条件
        // 执行循环体的代码
        // 进行步长累计
        ```
# while循环，一般用于不知道循环多少次的循环

```
let num = 10;

while(num>5){
    console.log('s'); // 's'
    <!-- num-- -->
}
```

# for in(遍历对象)

```
let obj = {
    name: name,
    age: 'age',
    name: 'name',
    3: 'erYa'
};
(key:value)

for(var key in obj){
    console.log(key) // 每一项的属性名
    // 在for in里获取每一项属性名所对应的属性值，必须用obj[key]的形式
    console.log(obj[key]) // 每一项属性名对应的属性值
}
```
# 数据类型检测
- typeof: 检测数据类型的属性
- instanceof ： 检测当前实例是否是与某个类
- constructor ： 基于构造函数检测数据类型
- Object.prototype.toString.call() ：检测数据类型最好的方式

- typeof：
    + 返回一个字符串
    + 字符串里放的是数据类型
    + 无法细分是普通对象，数组，null，因为他们返回的都是'object'
    ```
    typeof NaN  'number'
    typeof 'NaN'  'string'
    typeof null   'object'
    typeof undefined  'undefined'
    typeof true 'boolean'
    typeof {} 'object'
    typeof []  'object'
    ```
# 函数

