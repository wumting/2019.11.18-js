// fs   path:resolve(将相对路径转成绝对路径) http   url
// http 模块
// 服务器一直处在监听的状态，监听前端发过来的请求，把前端发过来的请求进行相应的数据处理，再把数据返回给客户端；
// 服务器的代码要启动一个服务，让服务器处在监听的状态，那么如果关闭服务，那么服务器就不再提供响应；

let http = require("http");
// createServer : 创建一个监听的服务
let server = http.createServer(function(req,res){
     console.log(999);
    // req: 请求信息  res:响应信息
    // 每当访问一次8080端口，该函数就会执行一次；
    // 通过res.end这个方法，把参数里的内容传输给客户端
    res.end("1234")
});
// 将该服务部署在一个对应的端口上，一台服务器可以启动65535个端口号，一个端口号只能启动一个服务
server.listen(8080,function(){
    // 让当前服务监听8080端口上，当监听成功以后，会默认调用这个回调函数
    console.log("8080端口已经启动成功");
})