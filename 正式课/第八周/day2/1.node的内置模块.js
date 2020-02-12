//三种：内置模块，第三方模块，自定义模块
//1. fs 文件操作系统
let fs = require('fs');
//1. readdir : 异步读取指定的文件目录;读取完毕触发第二个参数，第二个参数必须是一个回调函数，会给回调函数传入两个参数，err：读取的错误信息，result：读取的结果，如果成功，err是null，读取成功返回一个数组
// let result = fs.readdir('../',function(err,result){
//     console.log(result);
// });
// console.log(100);

//2. readdirSync 同步读取指定的目录，返回一个数组，数组中包含了目录的字符串 当读取完成以后，执行下面的方法
// let result = fs.readdirSync('../');
// console.log(result);

//3. readFileSync:读文件
//在node读取文件内容默认是一个buffer的文件流，0-9a-f;每一个汉字或字母都有其固定对应一个buffer数据
//readFileSync('./2.txt','utf8')默认得到的是buffer文件流编码格式，设置成utf8，得到JSON.html;但是对于图片，音频，视频，我们读取和传输的过程就是buffer格式的，所以不需要设置utf8
// let content = fs.readFileSync('./2.html','utf8');
// console.log(content);

//4. readFile:读文件
//readFile('./2.html','utf8',函数) 
// let content = fs.readFile('./2.html','utf8',function(err,result){
//     console.log(result);
// });

//5. writeFileSync  同步写入文件
// fs.writeFileSync('./3.txt','好好听课','utf8');

//6. writeFile 异步写入文件
// fs.writeFile('./3.txt','好好听课dvv','utf8',function(err,result){
//     console.log(100)//当写入文件成功后，就会触发这个回调函数
// });

//7. appendFileSync 向文件末尾追加内容
// fs.appendFileSync('./3.txt','好好听课d','utf8');

//8. appendFile

//9. copyFileSync 把文件里面的内容拷贝到新的文件中，并且替换掉原来的内容，覆盖
// fs.copyFileSync('./2.html','./3.txt');

//10. copyFile

//11. mkdir : 创建文件夹目录
// fs.mkdir('./1.html',err=>{

// })

//12. rmdir ：删除文件夹
// fs.rmdir('./1.html',err=>{

// })

//13. unlink 删除文件
// fs.unlink('./3.txt',err=>{

// })


// fs.readFile('./2.js','utf8',function(err,result){
//     console.log(result);
// })

 let {writeFile} = require('./promiseFs.js'); 
 
 writeFile('./2.json','好好听课a').then(function(){});






