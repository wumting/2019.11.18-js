# 1、讲解函数的运行原理（画图）
- 外边拿不到函数体里边的东西
- 在函数体里边可以拿到外边的东西

    ```
    let num = 12;
    function fn(n,m){
        console.log(num);
        let name = 'xxx'
        let total = n+m;
        total = total/2;
        return total;
    }
    let res = fn(12, 13);
    console.log(res);
    console.log(name);
    ```
# 2、函数的选项卡不行的原因（画图）
- 举个例子：五个按钮的例子

# 3、函数中的arguments
    - 在这里列举一个任意数求和的例子
    ```
    1、用户到底传递多少个实参不定
    2、我们还得给每一个参数转数字

    1、arguments是一个类数组，是函数的实参集合，他里面存放着所有的实参
    2、不管写不写形参变量，arguments都存在，
    3、不管写不写实参，arguments都存在
    4、arguments.callee存储的是函数本身，在严格模式下已经禁止使用

            function sum(){
            let total = null;
            for (var i = 0; i < arguments.length; i++) {
                let item = Number(arguments[i]);
                if(isNaN(item)){
                    continue;
                }
                total+=item;
            }
            return total
        }
        let num = sum(1,2,3,4,true, '6');  
    ```
# 5、给函数的形参赋默认值
    ```
    function fn(n=1,m=2){
        console.log(n,m)
    }
    fn();
    fn(12,13);
    ```

# 4、箭头函数
 - 如果实参只有一个，可以省略函数的小括号
 - 如果函数的return后面只有一句话可以省略函数的大括号和return
 - 箭头函数中没有this和arguments
 - 如果箭头函数return的是一个对象，那就加上括号
 ```
 function fn(m){
     return m
 }
 let fn = m=> m
 
let fn = ()=> ({})

 let fn = (m)=>{
     return m
 }
 ```

 # 5、收缩/展开运算符
 ```
 重写任意数求和案例
            let  sum=(...g)=>{
                console.log(g) // [1,2,3,4,true, '6']
                let ary = [...g] // [1,2,3,4,true, '6']
            let total = null;
            for (var i = 0; i < g.length; i++) {
                let item = Number(arguments[i]);
                if(isNaN(item)){
                    continue;
                }
                total+=item;
            }
            return total
        }
        let num = sum(1,2,3,4,true, '6');  
 ```

 ```
 function fn(m){
     return m(3)
 }

 let f = fn(function(n){
     return n
 })
 console.log(f)
 ```

  # 6、数组的方法
 > 数组是特殊的对象，天生自带一个length属性，代表数组的长度（个数）
 > 大家学习数组的方法，一定要按照数组的几个维度去记忆
    - 方法的含义
    - 方法的参数
    - 方法的返回值
    - 原有数组是否发生改变

## 1、数组的增删改
- 1、push
    + 方法的含义：向数组末尾追加内容
    + 方法的参数：0到多个值
    + 方法的返回值：新数组的length
    + 原有数组是否发生改变：发生改变

    ```
       let ary = [23,34,45];
       console.log(ary.push(23,{name:'erYa'})); // 5
       console.log(ary); // [23,34,45,23,{name:'erYa'}];
       ary[ary.length] = '33'; // 向数组末尾增加一项
       ary = [...ary,23,34]; // 向数组末尾增加内容
    ```
- 2、unshift
    + 方法的含义：向数组末开头加内容
    + 方法的参数：0到多个值
    + 方法的返回值：新数组的length
    + 原有数组是否发生改变：发生改变
    
    ```
    let ary = [23,34,45];
    console.log(ary.unshift(23,34)); // 5
    console.log(ary); // [23,34,23,34,45]
    console.log(ary[-1] = '222') // 不可以
    ary = [12,...ary]; // 向数组开头增加内容
    ```
- 3、pop
    + 方法的含义：删除数组末尾最后一项
    + 方法的参数：不传
    + 方法的返回值：删除的那一项
    + 原有数组是否发生改变：发生改变

    ```
        let ary = [23,34,45];
        console.log(ary.pop()) // 45
        console.log(ary);
        ary.length--; // 删除数组的最后一项
        ary.length-=2; // 删除数组的后两项
    ```
- 4、shift
    + 方法的含义：删除数组开头一项
    + 方法的参数：不传
    + 方法的返回值：删除的那一项
    + 原有数组是否发生改变：发生改变

    ```
        let ary = [23,34,45];
        console.log(ary.shift()) // 23
        console.log(ary);
    ```
- 5、splice
    + 方法的含义：实现数组的增删改
    + 方法的参数：不定
    + 方法的返回值：是一个新的数组，数组里是删除的那几项
    + 原有数组是否发生改变：发生改变

    ```
    -1、传两个参数(n,m):从索引n开始，删除m个
        let ary = [23,34,45];
        console.log(ary.splice(1,2)) // [34,45]
        console.log(ary); // [23]
        console.log(ary.splice(0,ary.length)) // [23,34,45] 清空数组
        console.log(ary.splice(0))// [23,34,45] 清空数组   也相当于浅克隆数组一份
        conosle.log(ary.splice(0,0)) // 删除0个
        console.log(ary) []

    -2、传三个参数(n,m,x):从索引n开始，删除m个，用后边的参数代替
                 (n,0,x):从索引n开始，删除0个，把x放到索引n的前面
        let ary = [23,34,45];
        console.log(ary.splice(1,1,23,34)); // [34]
        console.log(ary); // [23,23,34,45]
        console.log(ary.splice(0,0,67))// [] 项数组开头增加内容
        console.log(ary.splice(ary.length,0,23,23)) // [] 项数组末尾增加内容

        到目前为止学习的
        向数组的开头增加内容的方法：unshift、splice(0,0,x),[x,...ary]
        向数组的末尾增加内容的方法：push、splice(ary.length,0,x)、ary[ary.length] = 'xxx'
        向数组的开头删除内容的方法：shift、splice(0,1)
        项数组的末尾删除内容的方法：pop、ary.length--
        清空数组的方法：ary.length = 0、ary.splice(0)、ary.splice(0,ary.length)
        克隆数组：ary.splice(0)的返回值是克隆数组
    ```
## 2、数组的截取和拼接
- 1、slice
    + 方法的含义：实现数组的截取
    + 方法的参数：(n,m)从索引n开始，截取到索引m（不包括索引m对应的那一项）
    + 方法的返回值：是一个新的数组，数组里是截取的那几项
    + 原有数组是否发生改变：不发生改变

    ```
        let ary = [12,23,34,45];
        console.log(ary.slice()) // [12,23,34,45] 克隆数组
        console.log(ary.slice(0)) //  [12,23,34,45] 克隆数组
        console.log(ary.slice(1,2)) // [23]
        console.log(ary);// [12,34,45]
    ```
-2、concat
    + 方法的含义：实现数组的拼接
    + 方法的参数：0到多个值
    + 方法的返回值：是拼接后的新数组
    + 原有数组是否发生改变：不发生改变

    ```
    let ary = [12,13,41,51];
    console.log(ary.concat()) // [12,13,41,51]克隆数组
    console.log(ary.concat(12,234)) // [12,13,41,51,12,234]
    ```

## 4、检测数组中是否包含某一项
-1、indexOf和lastIndexOf
    + 方法的含义：检测数组是否包含某一项
    + 方法的参数：(n,m) n是检测是值，在indexOf中m是检测索引开始的位置，在lastIndexOf中m是检测索引结束的位置
    + 方法的返回值：所检测的值的索引（如果没有就是-1）
    + 原有数组是否发生改变：不发生改变

```
indexOf: 是找的被检测的值第一次出现的位置
lastIndexOf: 是找的检测的值最后一次出现的位置
let ary = [12,13,41,25,13,41];
console.log(ary.indexOf(13)) // 1
console.log(ary.lastIndexOf(13)) // 4
console.log(ary.indexOf(13,3)) // 从索引3开始检测13这个值没有有
console.log(ary.lastIndex(13,3)) // 检测13，检测到索引3
```
-2、includes
    + 方法的含义：检测数组是否包含某一项
    + 方法的参数：被检测的值
    + 方法的返回值：被检测的值如果在当前数组存在，那就返回true，否则返回false
    + 原有数组是否发生改变：不发生改变

## 5、数组的排序
-1、reverse
    + 方法的含义：把数组倒排
    + 方法的参数：无
    + 方法的返回值：排序之后的新数组
    + 原有数组是否发生改变：原有数组发生改变

    ```
    let ary = [12,23,34,56,67];
    console.log(ary.reverse()) // [67,56,34,23,12]
    console.log(ary); // [67,56,34,23,12]
    ```
`2、sort
    + 方法的含义：把数组排序
    + 方法的参数：不传或者传一个函数
    + 方法的返回值：排序之后的新数组
    + 原有数组是否发生改变：原有数组发生改变

```
-1、不传参(从小到大排序，但是只能按照左边第一位排列)
    let ary = [2,1,4,6,3];
    console.log(ary.sort()) // [1,2,3,4,6]
    console.log(ary) // [1,2,3,4,6]
-2、传参
    console.log(ary.sort((a,b)=>a-b)) // 从小到大排列
    console.log(ary.sort((a,b)=>b-a)) // 从大到小排列
```