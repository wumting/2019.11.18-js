//请求数据
let data = null;
let xhr = new XMLHttpRequest;
let winH = utils.win('clientHeight');
xhr.open('GET', 'data.txt', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)) {
        data = JSON.parse(xhr.responseText);
    }
}
xhr.send();
// console.log(data)

//渲染数据
let uls = document.getElementsByTagName('ul');
uls = utils.toArray(uls);
bindHtml();
function bindHtml() {
    for (var i = 0; i < 50; i++) {
        let index = Math.round(Math.random() * 9),
            curImg = data[index],
            li = document.createElement('li'),
            img = document.createElement('img');
        img.setAttribute('trueImg', curImg.src);
        img.className = 'bg';
        img.style.height = Math.round(Math.random() * (250 - 180) + 180) + 'px';
        li.appendChild(img);
        uls.sort((a,b)=>a.scrollHeight - b.scrollHeight);
        uls[0].appendChild(li);
    }
}
// let imgs = document.getElementsByTagName('img');
let imgs = document.getElementsByClassName('bg');
// console.log(imgs)
dealy();
function dealy(){
    for (let i = 0;i< imgs.length;i++){
        dealyImg(i);
    } 
   
}
function dealyImg(index){
    
    let curImg = imgs[index];//循环的每一张照片
    if(curImg.flag){ return}
    //图片的下边框和可视窗口的下边框重合，就该加载了
    //图片的自身高度+图片的上偏移量(到body) === 浏览器滚动条卷去的高度+可是窗口的高度
    // let winH = utils.win('clientHeight');//可视窗口的高度
    let winT = utils.win('scrollTop');//滚动条卷去的高度
    let curT = utils.offset(curImg).top;//图片距离body的上偏移量
    let curH = curImg.offsetHeight;//当前图片的高度
    if(winH+winT>curT+curH){
        let address = curImg.getAttribute('trueImg');
        // console.log(address)
        let newImg = new Image;
        newImg.src = address;
        newImg.onload = function(){
            curImg.src = address;
            curImg.flag = true;
            curImg.className = '';
            fadeIn(curImg);
        }
    }
}
function fadeIn(img){
    utils.css(img,'opacity',0.1);
    // console.log(img.opacity)
    
    var timer = setInterval(()=>{
        let cur = Number(utils.getCss(img,'opacity'));   
        cur += 0.05;
        console.log(cur)
        if(cur >= 1){
            clearInterval(timer);
            utils.setCss(img,'opacity',1);
        }
        utils.setCss(img,'opacity',cur);
    },200)
}
window.onscroll = function(){
    dealy();
    //临界条件：body的滚动高度的下边框 = 可视窗口的下边框
    let bodyH = document.body.scrollHeight;
    // let winH = utils.win('clientHeight');
    let winT = utils.win('scrollTop');
    if(bodyH <winH+ winT+300){
        bindHtml();
    }

}