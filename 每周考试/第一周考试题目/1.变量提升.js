/*
 * 全局作用域
 *   1.变量提升
 *     var x;
 *     fn=AF0; （AF0=>FN函数的堆内存）
 *   2.代码执行
 */
// var x = 10;
// function fn() {
// 	/*
// 	 * 私有作用域
// 	 *   1.形参赋值和变量提升 
// 	 *     var x;
// 	 *   2.代码执行
// 	 */
// 	console.log(x); //=>私有变量 undeifned
// 	var x = 20;
// }
// fn();
// console.log(x); //=>全局变量 10


// var x = 10;
// function fn() {
// 	/*
// 	 * 私有作用域
// 	 *   1.形参赋值和变量提升 
// 	 *   2.代码执行
// 	 */
//     console.log(x); //=>x不是私有的，则基于作用域链查找机制，寻找上级作用域中的x  =>找到的是全局作用域占用的x  =>10
//     x = 20;
// }
// fn();
// console.log(x); //=>20

/*
 * 全局作用域
 *   1.变量提升
 *     fn=AF0; 
 *   2.代码执行
 *   
 * LET/CONST不存在变量提升，但是在代码执行之前，浏览器会把代码进行词法解析，在解析的时候，虽然没有提前声明带LET的变量，但是也确定下来了当前作用域中后期会有这个变量，不允许我们在声明变量的前面使用它（ES6的机制）
 */
// let x = 10;
// function fn() {
// 	/*
// 	 * 私有作用域
// 	 *   1.形参赋值&变量提升 
// 	 *   2.代码执行
// 	 */
//     console.log(x); //=>Uncaught ReferenceError: Cannot access 'x' before initialization
//     let x = 20;
// }
// fn();
// console.log(x);


/*
 * 全局作用域
 *   1.变量提升
 *     var x; 
 *   2.代码执行
 * 
 * 自执行函数是不进行变量提升的，当代码运行到指定位置后，创建加执行一起完成了
 * A||B ：验证A的真假，A为真返回A的值，为假返回B的值
 * A&&B ：验证A的真假，A为真返回B的值，为假返回A的值
 * 逻辑与的优先级高于逻辑或
 */
// var x = 10;
// ~ function (x) {
// 	/*
// 	 * 私有作用域
// 	 *   1.形参赋值 & 变量提升
// 	 *     x = undeifned
// 	 *   2.代码执行
// 	 */
// 	console.log(x); //=>undeifned
// 	x = x || 20 && 30 || 40; 
// 	//=> undeifned || 20 && 30 || 40
// 	//1. 20&&30  =>30
// 	//2. undefined || 30  =>30
// 	//3. 30 || 40  =>30
// 	console.log(x);//=>30
// }();
// console.log(x); //=>10


// let x = [1, 2],
//     y = [3, 4];
// ~ function (x) {
//     x.push('A');
//     x = x.slice(0);
//     x.push('B');
//     x = y;
//     x.push('C');
//     console.log(x, y);
// }(x);
// console.log(x, y);


/*
 * 全局作用域
 *   1.变量提升 
 *     var x;
 *   2.代码执行
 */
// var x = 10;
// ~ function (x) {
// 	/*
// 	 * 私有作用域
// 	 *   1.形参赋值
// 	 *     x = 10; 
// 	 *   2.变量提升
// 	 *     var x; （无需重复声明）
// 	 *     function x = AF0（函数）; （把x重新赋值了）
// 	 * =>私有作用域中有一个私有的x变量，赋值为AF0这个函数
// 	 */  
//     console.log(x);//=>function x(){}
//     var x = 20;
//     function x() {}
//     console.log(x);//=>20
// }(x);
// console.log(x);//=>10

let y = {
	n: 10,
	fn: (function (x) {
		console.log(x);
		return function () {
			console.log(this.n + x);
		}
	})(y.n) //=>Uncaught ReferenceError: Cannot access 'y' before initialization
};
y.fn();