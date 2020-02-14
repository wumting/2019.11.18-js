let  express= require("express");
let route = express.Router();
let promiseFs = require("../promiseFS");
route.post("/login",function(req,res){
    // post请求的参数会放到req.body上；
    let {account,password}=req.body; 
    // 2.把用户传递进来的md5加密的密码进行二次加密；把字符串删去前面四个，删除后面四个，然后再把字符串倒序排
    password = password.substring(4).split("").reverse().join("").substring(4);

    // 3. 到user数据库中查找是否有符合该用户名和密码的这一项；
    
    let result = req.$userdata.find(item=>{
       
        return item.phone===account && item.password===password;
    });
    console.log(result);
    
    
    if(result){
        // 根据result中的jobId这个属性，去找到job.json对象的对象，然后获取到这个对象power属性的属性值；
        let curUser = req.$jobdata.find(item=>{
            return parseFloat(item.id)===parseFloat(result.jobId)
        });
        let power = curUser.power;
        //console.log(power);
        res.status(200);
        res.type("application/json");
        res.send({
            code:0,
            codeText:"OK",
            power:power
        })
    }

})


module.exports=route;