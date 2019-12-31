(function () {
    let list = document.getElementById('list');
    let navs = document.getElementsByTagName('a');
    //获取数据
    let data;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './json/product.json', false);
    xhr.onreadystatechange = function () {
        if (/^2\d{2}/.test(xhr.status) && xhr.readyState === 4) {
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();

    bindHtml(); 
    function bindHtml() {
        let str = ``;
        for (var i = 0; i < data.length; i++) {
            let cur = data[i];
            str += ` <li data-price="${cur.price}" data-time="${cur.time}" data-hot="${cur.hot}">
            <img src="${cur.img}" alt="">
            <span>${cur.title}</span>
            <span>时间：${cur.time}</span>
            <span>价格：${cur.price}</span>
            <span>热度：${cur.hot}</span> 
        </li>`
        }
        list.innerHTML = str;
    }

    let liList = document.getElementsByTagName('li');
    let ary = Array.from(liList);

    for (let i = 0; i < navs.length; i++) {
        navs[i].index = i;
        navs[i].flag = -1;
        navs[i].onclick = function () {
            this.flag *= -1;
            sortList.call(this);
            removeArrow.call(this);
            addArrow.call(this);
        }
    };

    function sortList() {
        let newAry = ['data-time', 'data-hot', 'data-price'];
        let that = this;
        ary.sort(function (a, b) {
            a = a.getAttribute(newAry[that.index]);
            b = b.getAttribute(newAry[that.index]);
            if (that.index === 0) {
                a = a.replace(/-/g, '');
                b = b.replace(/-/g, '');
            }
            return (a - b) * that.flag;
        })
        let frg = document.createDocumentFragment();
        for (var i = 0; i < ary.length; i++) {
            frg.appendChild(ary[i])
        }
        list.appendChild(frg);
        frg = null;
    }
    
    function addArrow() {
        let up = this.children[0];
        let down = this.children[1];
        for (var i = 0; i < navs.length; i++) {
            if(this.flag>0){
                up.classList.add('bg');
                down.classList.remove('bg');
            }else{
                 up.classList.remove('bg');
                 down.classList.add('bg');
            }
        }

    }
    function removeArrow(){
        for(var i=0;i<navs.length;i++){
            if(this!= navs[i]){
                navs[i].children[0].classList.remove('bg');
                navs[i].children[1].classList.remove('bg');
                navs[i].flag = -1;
            }
            
        }
    }

})()