let data;
let xhr = new XMLHttpRequest();
xhr.open('get','banner.json',false);
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4&&/^2\d{2}$/.test(xhr.status)){
        data = JSON.parse(xhr.responseText);
    }
}
xhr.send();
 
let outer = document.getElementById('outer');
let context = document.getElementById('context');
let ul = document.getElementsByTagName('ul')[0];
let bindHtml = ()=>{
    let imgs = ``;
    let lis = ``;
    data.map(item=>{
        imgs += ` <img src="${item.img}" alt="">`;
        lis += ` <li></li>`;
    });
    imgs += ` <img src="${data[0].img}" alt="">`;
    context.innerHTML = imgs;
    ul.innerHTML = lis;
}
bindHtml();
//1. 渲染数据
//2. 自动轮播
//3. 鼠标移上停止，移开自动轮播
//4. 给li添加class
//5. 点击li实现图片跟随
//6. 实现左右箭头点击图片切换
let step = 0;
let autoMove = ()=>{
    step++;
    if(step === 5){
        context.style.left = '0';
        step = 1;
    }
    changeTip();
    utils.animate(context,{left:-800*step},300);
}
let timer = setInterval(autoMove,2000);

outer.onmouseover = function(){
    clearInterval(timer);
}
outer.onmouseout = function(){
    timer = setInterval(autoMove,2000);
}

let olis = document.getElementsByTagName('li');
let changeTip = ()=>{
    for(var i=0;i<olis.length;i++){
        olis[i].classList.remove('select');
    }
    if(step === 4){
        olis[0].classList.add('select');
        return;
    }
    olis[step].classList.add('select');
}
changeTip();

let focus = ()=>{
    for(let i=0;i<olis.length;i++){
        olis[i].onclick = function(){
            step = i-1;
            autoMove();
        }
    }
}
focus();

let left = document.getElementById('left');
let right = document.getElementById('right');
left.onclick = function(){
    step -= 1;
    if(step === -1){
        context.style.left = '-3200px';
        step = 3;
    }
    utils.animate(context,{left:-800*step},300);
    changeTip();
}
right.onclick = function(){
    autoMove();
}


