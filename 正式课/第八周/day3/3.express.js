let express = require('express');
let app = express();
app.get('/login/:a',function(req,res){
    // console.log('你登录成功');
    // console.log(req.params);
    console.log(req.query);
    //  res.send('中国加油');
})
app.listen(8080,function(){
    console.log('8080端口已经监听成功'); 
});











