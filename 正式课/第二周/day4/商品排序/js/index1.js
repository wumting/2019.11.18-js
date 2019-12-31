(function(){
    let data;
    let xhr = new XMLHttpRequest();
    xhr.open('get','json/product.json',false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4&& /^2\d{2}/.test(xhr.status)){
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
    let list = document.getElementById('list');
    let navs = document.getElementsByTagName('a');
    let str = ``;
    bindHtml();
    function bindHtml(){
        for(var i=0;i<data.length;i++){
            let cur = data[i];
            str +=`  <li data-price = "${cur.price}" data-time = "${cur.time}" data-hot = "${cur.hot}"> 
            <img src="${cur.img}" alt="">
            <span>${cur.title}</span>
            <span>时间：${cur.time}</span>
            <span>价格：${cur.price}</span>
            <span>热度：${cur.hot}</span>
        </li>`
        }
        list.innerHTML = str;
    }
    for(let i = 0;i<navs.length;i++){
        navs[i].index = i;
        navs[i].flag = -1;
        navs[i].onclick = function(){
            this.flag *= -1;
            sortList.call(this);
        }
    }
    let olis = document.getElementsByTagName('li');
    olis = Array.from(olis);
    function sortList(){
        let newAry = ["data-time","data-hot","data-price"];
        olis.sort((a,b)=>{
            a = a.getAttribute(newAry[this.index]);
            b = b.getAttribute(newAry[this.index]);
            if(this.index === 0){
                a = a.replace(/-/g,)
            }
        })
    }
     












} )()























