//这个函数执行形成一个闭包，里面都是私有作用域
$(function(){
    let power = localStorage.getItem('power');
    if(power === null){
        alert('当前操作属于非法进入，请重新登录',{
            handled:()=>{
                window.location.href = 'login.html';
            }
        })
    }
    power = decodeURIComponent(power);
    //power:存储权限的信息，根据power信息可以控制元素是否隐藏
    let str = `
        <div class="itemBox">
            <h3>
                <i class="iconfont icon-yuangong"></i>
                员工管理
            </h3>
            <nav class="item">
                <a href="page/userlist.html" target = '_iframe'>员工列表</a>
                ${power.includes('userhandle')?`<a href="page/useradd.html" target = '_iframe'>新增员工</a>`:``} 
            </nav>
        </div>
        <div class="itemBox">
            <h3>
                <i class="iconfont icon-guanliyuan"></i>
                部门管理
            </h3>
            <nav class="item">
                <a href="page/departmentlist.html" target = '_iframe'>部门列表</a>
                ${power.includes('departhandle')?`<a href="page/departmentadd.html" target = '_iframe'>新增部门</a>`:``} 
            </nav>
        </div>
        <div class="itemBox">
            ${power.includes('jobhandle')?`<h3>
                <i class="iconfont icon-zhiwuguanli"></i>职务管理
            </h3>
            <nav class="item">
                <a href="page/joblist.html" target = '_iframe'>职务列表</a>
                <a href="page/jobadd.html" target = '_iframe'>新增职务</a>
            </nav>`:``}
        </div>
        <div class="itemBox">
            <h3>
            <i class="iconfont icon-kehuguanli"></i> 客户管理
            </h3>
            <nav class="item">
                <a href="page/customerlist.html?1x=my" target = '_iframe'>我的客户</a>
                ${power.includes('allcustomer')?`<a href="page/customerlist.html?1x=all" target = '_iframe'>全部客户</a>`:``} 
                <a href="page/customeradd.html?1x=all" target = '_iframe'>新增客户</a>
            </nav>
         </div>`;
        $('.menuBox').html(str);

})

$(function(){
    let $header = $(".headerBox"),
        $baseBox=$header.find(".baseBox"),
        $signoutBtn = $baseBox.children("a"),
        $spanName=$baseBox.children("span"),
        $footer = $(".footerBox"),
        $container=$(".container"),
        $menuBox = $(".menuBox"),
        $itemBox=$menuBox.find(".itemBox"),
        $navList = $(".navBox a"),
        $iframeBox = $(".iframeBox");
    //动态计算出container的高度
    function computed(){
        let winH = $(window).height();
        $container.css('height',winH-$header.outerHeight()-$footer.outerHeight()); 
    }
    computed();
    $(window).on('resize',computed);

    //每一次进入首页都需要验证用户是否登录；
    axios.get('/user/login').then(result=>{
        if(parseFloat(result.code)===0){
            //如果登录成功，再发一次请求，获取该用户的信息
            return axios.get('/user/info');
        }
        alert('您还没有登录，请先登录',{
            handled:function(){
                window.location.href = 'login.html';
            } 
        })
        return Promise.reject();
    }).then(result=>{
        if(parseFloat(result.code) === 0){
            let data = result.data;
            $spanName.html(`欢迎:${data.name}`);
        }
    });
    //安全退出
    $signoutBtn.click(function(){
        axios.get('/user/signout').then(result=>{
            if(parseFloat(result.code)===0){
                localStorage.removeItem('power');
                window.location.href = 'login.html';
                return;
            }
        })
    });
    //基于事件委托实现折叠菜单
    $menuBox.click(function(e){
        let target = e.target,
            tarTag = target.tagName,
            $target = $(target);
        if(tarTag === 'H3'){
            $target.next().stop().slideToggle(300);
        }

    })

    let $organize = $itemBox.filter(':lt(3)'),
        $customer = $itemBox.eq(3),
        initIndex = 0,
        // 为了第一次进页面来显示对应的信息
        HASH = window.location.href.queryURLParams()['HASH']||'organize';
        //window.location.href 获取当前浏览器url地址栏中地址，是一个字符串 
        HASH === 'customer'?initIndex=1:null;
    
    function change(index){
        $navList.eq(index).addClass('active').siblings().removeClass('active');
        if(index === 0){
            $organize.css('display','block');
            $customer.css('display','none');

            $iframeBox.attr('src','page/userlist.html');
        }else{
            $organize.css('display','none');
            $customer.css('display','block');
            $iframeBox.attr('src','page/customerlist.html');
        }
    }
    change(initIndex);

    //实现切换组织和客户
    $navList.click(function(){
        let index = $(this).index();
        change(index);
    });
})









