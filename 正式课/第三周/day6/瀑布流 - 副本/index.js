let data;
let xhr = new XMLHttpRequest();
xhr.open('get', 'data.txt', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)) {
        data = JSON.parse(xhr.responseText);
    }
}
xhr.send();
let list = document.getElementsByTagName('ul');
list = Array.from(list);
bindHtml();

function bindHtml() {
    for (var i = 0; i < 50; i++) {
        let index = Math.round(Math.random() * 7);
        let cur = data[index];
        let li = document.createElement('li');
        let img = document.createElement('img');
        let p = document.createElement('p');
        let a = document.createElement('a');
        img.setAttribute('trueImg', cur.src);
        img.style.height = Math.round(Math.random() * (350 - 200) + 200) + 'px';
        p.innerHTML = cur.title;
        a.innerHTML = '采集';
        a.href = 'javascript:;';
        li.appendChild(img);
        li.appendChild(p);
        li.appendChild(a);
        list.sort((a, b) => {
            return a.offsetHeight - b.offsetHeight;
        })
        list[0].appendChild(li);
    }
}
let imgs = document.getElementsByTagName('img');
let winH = utils.win('clientHeight');

function dalay() {
    for (var i = 0; i < imgs.length; i++) {
        check(imgs[i]);
    }
}

function check(curImg) {
    if (curImg.flag) {
        return
    }
    let curH = curImg.offsetHeight;
    let curT = utils.offset(curImg).t;
    let winT = utils.win('scrollTop');
    if (winH + winT > curH + curT) {
        let address = curImg.getAttribute('trueImg');
        let newImg = new Image;
        newImg.src = address;
        newImg.onload = function () {
            curImg.src = address;
            newImg = null;
            curImg.flag = true;

        }
    }
}
dalay();
let container = document.getElementById('container');
window.onscroll = function(){
    let winT = utils.win('scrollTop');
    let containerH = container.offsetHeight;
    if(winH+winT+300>= containerH){
        bindHtml();
    } 
     dalay();
}