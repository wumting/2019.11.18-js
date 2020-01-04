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
let wrapper = document.getElementById('wrapper');
let ul = document.getElementsByTagName('ul')[0];
let bindHtml = function(){
    let imgs = ``;
    let lis = ``;
    for(var i=0;i<data.length;i++){
        let cur = data[i];
        imgs += ` <img src="${cur.img}" alt="">`;
        lis += `<li></li>`;
    }
    imgs += ` <img src="${data[0].img}" alt="">`;
    wrapper.innerHTML = imgs;
    ul.innerHTML = lis;
}
bindHtml();
let step = 0;
let autoMove = ()=>{
    step++;
    if(step === 5){
        wrapper.style.left = '0';
        step = 1;
    }
    changeTip();
    utils.animate(wrapper,{
        left : -800*step,
    },300);
}
let timer = setInterval(autoMove,2000);

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

outer.onmouseover = function(){
    clearInterval(timer);
}
outer.onmouseout = function(){
    timer = setInterval(autoMove,2000);
}
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
right.onclick = function(){
    autoMove();
}
left.onclick = function(){
    step -= 2;
    if(step === -2){
        step = 2;
    }
    autoMove();
}












