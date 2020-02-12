let fs = require('fs');
let http = require('http');
let url = require('url');
http.createServer(function(req,res){
    let {pathname} = url.parse(req.url);
    if(pathname === '/5.index.css'){
        res.setHeader('content-type','text/css');
    } 
    if(pathname === '/5.index.html'){
        res.setHeader('content-type','text/html');
    } 
    fs.readFile('.'+pathname,function(err,data){
        res.end(data);
    });
    
}).listen(8001,function(){

})