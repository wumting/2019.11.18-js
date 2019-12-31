(function () {
    let data;
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'json/product.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}/g.test(xhr.status)) {
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();

    let list = $('.list'); 
    list.html(function bindHtml() {
        let str = '';
        for (var i = 0; i < data.length; i++) {
            let cur = data[i];
            str += `
            <li data-price = "${cur.price}" data-time = "${cur.time}" data-hot = "${cur.hot}">
            <img src="${cur.img}" alt="">
            <span>${cur.title}</span>
            <span>价格：${cur.price}</span>
            <span>时间：${cur.time}</span>
            <span>热度：${cur.hot}</span>
        </li> `
        }
        return str;
    });
    var $li =  $('li');
    var $navs = $('a');
    let flag = -1;
    $navs.on('click',function (){
        let i = $(this).index()-1; 
        flag *= -1;
        addArrow.call(this,flag); 
        let newAry =  ["data-time","data-hot","data-price"];
        $li.sort((a,b)=>{ 
        a = a.getAttribute(newAry[i]);
        b = b.getAttribute(newAry[i]);
           if(i === 0){
            a = a.replace(/-/g,'');
            b = b.replace(/-/g,''); 
           }
           return (a-b)*flag;
        }); 
        list.html($li);
    });
    function addArrow(flag){
        console.log(this);
        $('.down').removeClass('bg');
        $('.up').removeClass('bg');
        if(flag==1){
            $(this).children('.up').addClass('bg');
        }else{
            $(this).children('.down').addClass('bg');
        } 
    }
    

})()