# switch case 跑马灯
# 1、堆栈内存的区别（看图）
```
    let a = 12;
    let b = a;
    let c = {name: 'xiaoHua'};
    b = 13;
    console.log(a, c)




    let a = {n:1};
    let b = a;
    a.x = a = { // 像这种连续等于要从左往右依次赋值
    n:2
    };    
    console.log(a.x, b);

```
# 2、数据类型检测
- typeof 检测数据类型的属性
- instanceof 检测当前实例是否属于某个类
- constructor 基于构造函数检测数据类型
- Object.prototype.toString.call()： 检测数据类型最好的方式

## typeof 检测数据类型的属性
- 他的返回值是一个字符串
- 字符串里存放的就是他的数据类型
- typeof null  =>'object'
- typeof 检测数组、普通对象、null返回的都是'object',所以用typeof检测数据类型无法细分出普通对象、数组、null

```
    console.log(typeof 12) // 'number'
    console.log(typeof '12')// 'string'
    console.log(typeof undefined) // 'undefined'
    console.log(typeof true)  // 'boolean'
    console.log(typeof null) // 'object'
    console.log(typeof []) // 'object'
    console.log(typeof ({})) // 'object'

    // 只要超过两个typeof，那最后的结果就是 'string'
    console.log(typeof typeof typeof 12) // 'string'
```
# 3、元素也是对象
- style：操作的是元素的行内样式
- className：操作的是元素的class名
- innerHTML：操作的是元素的内容（可以识别标签）
- innerText：操作的是元素的内容（不可以识别标签）

# 4、函数
    - 函数就是一个方法，把实现某些功能的代码封装到一起，以后执行这个方法，就直接运行函数就好了，他可以减少页面重复的代码，提高代码的复用率（高内聚低耦合）
    
    - 生产一台榨汁机（创建函数），把榨汁这个这个功能集成到榨汁机里（把实现某些功能的代码封装到一起），榨汁机有一个入口（在函数里叫形参变量），
    有一个出口，把果汁到到出来（在函数里叫return）

    - 让榨汁机运行（函数执行），在榨汁机运行之前把水果放进去（在函数运行时放的变量就是实参）
