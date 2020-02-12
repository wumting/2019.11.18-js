//登录 : 获取用户名和密码，发送请求请求成功以后跳转到首页，不成功，弹出用户名或密码错误
$(function(){
    let $userName = $('.userName'),
        $userPass = $('.userPass'),
        $submit = $('.submit');
        //给登录绑定点击事件
        $submit.click(function(){
            let userName = $userName.val().trim(),
                userPass = $userPass.val().trim();
                //进行表单校验
                if(userName === '' || userPass === ''){
                    alert('用户名和密码不能为空，请输入');
                    return;
                }
                //密码需要md5加密，会生成32位的字符串，在后端也有一个md5，那么会解析该加密之后的密码和后端存储的是否一致，如果一致，说明密码正确，
                userPass = md5(userPass);
                // 发送登录请求
                axios.post('/user/login',{
                    account:userName,
                    password:userPass
                }).then(result=>{ 
                    //当请求成功以后会执行这个函数,会把数据给当前result参数
                    let {code,codeText,power} = result;
                    console.log(result)
                
                    //需要将power存储到localStorage中，
                    if(parseFloat(code) === 0){
                        alert('恭喜您登录成功',{ 
                            handled:function(){ 
                                //alert的回调函数，当alert弹出框消失时，执行这个回调 
                                localStorage.setItem('power',encodeURIComponent(power));
                                //模态框消失以后，跳转到首页
                                window.location.href = 'index.html';
                            }
                        });
                    }else{
                        alert('当前用户名和密码不匹配，请重试');
                    }
                });
        });
});

