let express = require('express');
let route = express.Router();
let promiseFs = require('../promiseFS');
route.post('/login',function(req,res){
    let {account,password} = req.body;
    password = password.substring(4).split('').reverse().join('').substring(4);
    let result = req.$userdata.find(item=>{
        return item.phone === account&&item.password===password;
    });
    if(result){
        let curUser = req.$jobdata.find(item=>{
            return parseFloat(item.id)===parseFloat(result.jobId);
        });
        let power = curUser.power;
        req.session.userId = result.id;
        req.session.userPower = power;
        res.status(200);
        res.type('application/json');
        res.send({
            code:0,
            codeText:"OK",
            power:power,
        });
    }else{
        res.end({
            code:1,
            codeText:'账号密码不匹配',
        })
    }
})

route.get('/login',function(req,res){
    let userId = req.session.userId;
    if(userId){
        res.status(200);
        res.type('application/json');
        res.send({
            code:0,
            codeText:"OK", 
        });
    }else{
        res.send({
            code:1,
            codeText:"当前用户没有登录", 
        });
    }
});
route.get('/signout',function(req,res){
    res.session.userId = null;
    res.session.userPower = null;
    res.send({
        code:0,
        codeText:'OK',
    })
})
module.exports = route;