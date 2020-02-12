$(function(){
    let $userName = $('.userName'),
    $userPass = $('.userPass'),
    $submit = $('.submit');

    $submit.click(function(){
        let $userNameVal = $userName.val().trim(),
        $userPassVal = $userPass.val().trim();
        if($userNameVal === ''||$userPassVal === ''){
            alert('用户名或密码不能为空，请输入');
            return;
        }
        $userPassVal = md5($userPassVal);
        axios.post('/user/login',{
            account:$userNameVal,
            password:$userPassVal
        }).then(result=>{
            if(result.code === 0){
                alert('恭喜你登录成功',{
                    handled:function(){
                        localStorage.setItem('power',encodeURIComponent(result.power));
                        window.location.href = 'index.html';
                    }
                })
            }else{
                alert('当前用户名和密码不匹配，请重试');
            }
        }); 

    });
});





















 