(function(){
    // 第一步：从服务器获取需要展示的数据,然后绑定在页面当中
    //1、 基于AJAX获取服务器端数据,把数据存储到DATA中
    //首先创建AJAX的实例
    let DATA = null,
        xhr = new XMLHttpRequest;
    //打开一个请求的链接，基于get请求和同步编程完成
    xhr.open('GET','')
    //监听服务器返回的状态信息（在http状态码为200，请求状态为4的时候能拿到数据）
    xhr.onreadystatechange = function(){
        if(xhr.status === 200 && xhr.readyState === 4){
            //基于responseText获取响应回来的信息
                DATA = xhr.responseText;
        }
    };
    //发送AJAX请求
    xhr.send();
    //把获取的JSON字符串转换为对象
    DATA = JSON.parse(DATA);

//2. 把获取的数据展示到页面当中








})()