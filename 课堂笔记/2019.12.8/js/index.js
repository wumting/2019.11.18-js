//获取数据
let data = null;
let xhr = new XMLHttpRequest;
xhr.open('GET', 'data.txt', false);
xhr.onreadystatechange = function () {
    if (/^2\d{2}/.test(xhr.status) && xhr.readyState === 4) {
        data = JSON.parse(xhr.responseText);
    }
}
xhr.send();
// console.log(data)
//渲染数据
let ulList = document.getElementsByTagName('ul');
ulList = utils.toArray(ulList);

function bindHtml() {
    for (var i = 0; i < 50; i++) {
        let index = Math.round(Math.random() * 9);
        let curObj = data[index];
        let li = document.createElement('li');
        let img = document.createElement('img');
        img.setAttribute('trueImg', curObj.src);
        img.className = 'bg';
        img.style.height = Math.round(Math.random() * (350 - 180) + 180) + 'px';
        li.appendChild(img);
        ulList.sort((a, b) => a.scrollHeight - b.scrollHeight);
        ulList[0].appendChild(li);
    }
}
bindHtml();

var imgs = document.getElementsByClassName('bg');


function dealy() {
    for (var i = 0; i < imgs.length; i++) {
        dalaImg(i);
    }
}
let winH = utils.win('clientHeight');

function dalaImg(index) {
    let curImg = imgs[index];
    if (curImg.flag) {
        return;
    }
    let curH = curImg.offsetHeight;
    let curT = utils.offset(curImg).top;
    let winT = utils.win('scrollTop');
    if (winT + winH > curT + curH) {
        let address = curImg.getAttribute('trueImg');
        let newImg = new Image;
        newImg.src = address;
        newImg.onload = function () {
            curImg.src = address;
            curImg.flag = true;
            fadeIn(curImg);
        }
    }
}

function fadeIn(img) {
    utils.setCss(img, 'opacity', .1);
    let cur = Number(utils.getCss(img, 'opacity'));
    var timer = setInterval(() => {
        cur += 0.01;
        if(cur>=1){
            clearInterval(timer);
            utils.setCss(img,'opacity',1);
        };
        utils.setCss(img, 'opacity', cur);
    }, 200)
   
}

dealy();

window.onscroll = function (){
    dealy();
    let bodyH = document.body.scrollHeight;
    let winT = this.utils.win('scrollTop');
    if(winT+winH+300>bodyH){
        bindHtml();
    }
}