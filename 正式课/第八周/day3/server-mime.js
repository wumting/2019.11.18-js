let http = require('http');
let mime = require('mime');
let fs = require('fs');
let url = require('url');
http.createServer(function(req,res){
    let  {pathname}=url.parse(req.url,true);
    res.setHeader('content-type',mime.getType(pathname));
    fs.readFile("."+pathname,function(err,data){
        res.end(data);//把对应的数据返回给客户端
    })
}).listen(8080);







