let express = require('express');
let promiseFs = require('./promiseFS');
let bodyParser = require('body-parser');
let session = require('express-session');
let app = express();
app.listen(8888,function(){
    console.log('8080已经启动成功');
});

app.use(session({
    secret:'ZFPX',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*60*24*30,
    }
}));
app.use(bodyParser.urlencoded({
    extended:true,
}));
app.use(function(req,res,next){
    let p1 = promiseFs.readFile('./json/user.json');
    let p2 = promiseFs.readFile('./json/customer.json');
    let p3 = promiseFs.readFile('./json/visit.json');
    let p4 = promiseFs.readFile('./json/department.json');
    let p5 = promiseFs.readFile('./json/job.json');
    Promise.all([p1,p2,p3,p4,p5]).then(results=>{
        let [$userdata,$customerdata,$visitdata,$departmentdata,$jobdata] = results;
        req.$userdata = JSON.parse($userdata);
        req.$customerdata = JSON.parse($customerdata);
        req.$visitdata = JSON.parse($visitdata);
        req.$departmentdata = JSON.parse($departmentdata);
        req.$jobdata = JSON.parse($jobdata);
        next();
    }).catch(err=>{
        res.status(500);
        res.send(err);
    });

});

app.use('/user',require('./routes/user'));
// app.use('/customer',require('./routes/customer'));
// app.use('/department',require('./routes/department'));
// app.use('/job',require('./routes/job'));
// app.use('/visit',require('./routes/visit'));

app.use(express.static('./client'));

app.use((req,res)=>{
    res.status(404);
    res.send('您请求的资源文件不存在');
})










