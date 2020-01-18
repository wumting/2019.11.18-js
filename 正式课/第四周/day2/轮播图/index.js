let wrapper = document.getElementsByClassName('wrapper')[0];
let list = document.getElementById('list');
let outer = document.getElementById('outer');

let data;
let xhr = new XMLHttpRequest();
xhr.open('get', 'banner.json', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)) {
        data = JSON.parse(xhr.responseText);
    }
}
xhr.send();

let bindHtml = () => {
    let divs = ``;
    let lis = ``;
    data.map((item, index) => {
        divs += ` <div><img src="${item.img}" alt=""></div>`;
        lis += `<li></li>`;

    })
    divs += `<div><img src="${data[0].img}" alt=""></div>`;
    wrapper.innerHTML = divs;
    list.innerHTML = lis;
}
bindHtml();

// 2000ms滑动一张 
let step = 0;
let autoMove = () => { 
    step++;
    if (step === 5) {
        wrapper.style.left = '0';
        step = 1;
    }
    changeTip();
    utils.animate(wrapper, {
        left: -800 * step
    }, 300);
}
let timer = setInterval(autoMove, 2000);

outer.onmouseover = function () {
    clearInterval(timer);

}

outer.onmouseout = function () {
    timer = setInterval(autoMove, 2000);

}

let olis = document.getElementsByTagName('li');
 
let changeTip = () => {
        for(var i=0;i<olis.length;i++){
            olis[i].classList.remove('select');
        }
        if(step === 4){
            olis[0].classList.add('select');
           return;
        }
        olis[step].classList.add('select');

        // for (let i = 0; i < olis.length; i++) {
        //     if (step === i) {
        //         // 如果step 和li的索引相同，那么给当前的li加上select;
        //         olis[i].classList.add("select");
        //     } else {
        //         olis[i].classList.remove("select");
        //     }
        //     // 如果step为4，那么让第一个li加上class；
        //     if (step === 4) {
        //         olis[0].classList.add("select");
        //     }

        // }
}
changeTip();

let imgs = document.getElementsByTagName('img');  
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
    step--;
    if(step === -1){
        wrapper.style.left = '-3200px';
        step = 3;
    }
    utils.animate(wrapper,{left:-800*step},300);
    changeTip();     
        
}
 




