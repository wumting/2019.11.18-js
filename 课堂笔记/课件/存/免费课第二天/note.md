# number
## parseInt(val)和parseFloat(val)
    > 把字符串转换为数字
    > 从左到右依次查找有效数字，一旦发现非有效数字，立即停止查找，把找到的数字返回出去（paeseInt不可以识别小数点，parseFloat可以识别小数点）
    > 如果你要转换的值不是字符串类型的，先转换为字符串类型，在查找
    > true、false、null、undefined、{}、NaN 转都是NaN
    > 数组是先转换为字符串，在进行查找

## isNaN(val)
> 检测一个值是否是一个非有效数字，如果是就是true，反之就是false
    (这个值如果是有效数字，那结果就是false，反之就是true)
> 如果你要检测的值不是数字类型的，先转换为数字类型，在检测
```

```
# string 字符串
> 所有 单引号、双引号、反引号(ES6的模板字符串)包起来的都是字符串 
## val.toString()      字符串拼接

### val.toString() 
    > 把number、boolean（true，false）转字符串都是直接加引号
    > null 和undefined不能使用toString方法
    > 把普通对象转字符串 =>  '[object Object]'
    > 数组转字符串=> 把中括号去掉，然后把数组的每一项都去做toString处理，然后拼接到一块（，不能丢）
    ```
    console.log([{}, []].toString()) // '[object Object],'
    console.log([null, undefined].toString()) // ','
    ```

### 字符串拼接
    > 四则运算：在四则运算中，除了加法，其余的都是正常的运算
    > 在运算中过程中，如果相运算的值不是数字类型的，先转为数字类型，在运算
    > 在运算过程当中，如果出现了NaN，那结果就是NaN

    > 在加法中有两种情况:
        + 正常运算
        + 字符串拼接：如果加号一旦跟引号相遇了，那就是字符串拼接，不再是正常的运算(基本数据类型的这样的)
        + 如果拼接的过程当中，引用数据类型要转数字（一旦字符串和加号相遇了，就是字符串拼接）

## boolean布尔（true false）
> 把其他数据类型转布尔 Boolean  !/!!
- Boolean(val)
    + 把其他数据类型转布尔有且只有NaN、null、undfined、0、''这五种是false，其余的都是true
    + 把布尔转布尔还是本身

    ```
    Boolean(true) // true
    Boolean(false) // false


    Boolean(NaN) // false
    Boolean(null) // false
    Boolean(undefined) // false
    Boolean(0) // false
    Boolean('') // false
    其他的转布尔全是true
    ```
    - !/!!
        + !:把其他数据类型转布尔，然后取反
        ```
        !null // true
        ```
        + !! 把其他数据类型转布尔，然后取反再取反

## null和undefined
> 他俩都代表空
- null：他一般都是意料之中的（一开始我们不知道值，先手动赋值为null，但是以后知道了，再给他重新赋值）

```
// 一开始我买了一辆夏利，但是有邮箱里没有油，我先给他手动赋值为null，经过我几个月的努力，我挣钱了，我拿着5毛钱买了一升油，现在我在给邮箱赋值为1
let gasoline = null;
    gasoline = 10000;
```
- undefined：他也是空，但是一般都是浏览器的默认机制定义的(意料之外的)
```
// 孙悟空本身就没有父亲，他是石头缝里蹦出来的，但是你还是去找他的爸爸，这就是意料之外的事，找不到就是undefined
// 猪无能我们大家都知道有父亲，但是不知道具体是哪头猪，先说动赋值为null；
经过我五个月的打听，张岩告诉我了，他的父亲是隔壁村的老母猪的对象小花，然后我再把小花重新赋值给猪无能的父亲
let pigFather = null;
    pigFather = 'xiaoHua';
    console.log(pigFather)
```
# 引用数据类型（[],{}）
- 每一个对象都由大括号包裹，里面是0到多个键值对组成，而且拿逗号隔开
- 每个键值对由属性名和属性值组成（中间拿冒号连接）[key:value]
- 属性名是由字符串和数字组成（''可以省略）
- 属性值就是js数据类型一种

- 增删改查
    + 查询属性名所对应的属性值：
        对象名.属性名/对象名['属性名']；如果属性名是数字，不能用对象名.属性名的方式去获取对应的值
    + 新增和修改   对象名.属性名 = 'xxx'
        新增的属性名如果存在，就是修改属性值，如果没有就是新增
    + 删除
        + 假删除   对象名.属性名 = null;
        + 真删除   delete 对象名.属性名
（以上的操作 “对象名.属性名”都可以改为对象名['属性名']；两种方式，用哪个都可以）
## 普通对象
let monkey = {
    'name': 'sunWuKong',
    age: null,
    speed: 10000,
    ifantName: 'badMonkey',
    3: []
}
let box = {
    people: 33,
    line: 'slow',
    background: 'black'
}
let obj = {

}

## 数组 []
> 数组由中括号包裹，里面存放的是每一个属性值，属性名是浏览器内定的，从0开始，依次递增，他代表属性值的位置=>索引
> 天生自带一个length属性，属性值是数组的长度

```
let ary = ['2', 2, true, false, null. undefined, {}, []];
```
