let http = require('http');
let url = require('url');
let server = http.createServer(function(req,res){
    console.log(999);
    console.log(url.parse(req.url,true));
    // res.setHeader('content-type','text/plain;charset=utf8');
    // res.end('中国');
});
server.listen(8080,function(){
    console.log('"8080端口已经启动成功"');
})