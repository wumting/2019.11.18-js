let data =null;
let xhr = new XMLHttpRequest;
xhr.open('GET','json/product.json',false);
xhr.onreadystatechange = function(){
    if( xhr.status === 200 && xhr.readyState === 4){
       data = JSON.parse(xhr.responseText); 
    }
};
xhr.send();

let cardBox = document.getElementById('cardBox');
reanderHtml();
function reanderHtml(){
    let htmlAry = ``;
    data.forEach((item) => {
        let {price,hot,title,img,time} = item;
        htmlAry += `
            <li data-price ="${price}" data-time ="${time}" data-hot = "${hot}">
                <img src="${img}" alt="">
                <span>${title}</span>
                <span>时间：${time}</span>
                <span>价格：${price}</span>
                <span>热度：${hot}</span>
            </li>
        `  
    });
    cardBox.innerHTML = htmlAry;   
}

let navList = document.getElementsByTagName('a');
let cardList = cardBox.getElementsByTagName('li');
navList = Array.from(navList);
cardList = Array.from(cardList);

for(var i=0;i<navList.length;i++){
    navList[i].myIndex = i;
    navList[i].flag = -1;
    navList[i].onclick = function(){
        this.flag *= -1;
        mySort.call(this);
        clearArrow.call(this);
        addArrow.call(this);
    }
}
function mySort(){
    let newAry = ['data-time','data-price','data-hot'];
    cardList.sort((a,b)=>{
        a = a.getAttribute(newAry[this.myIndex]);
        b = b.getAttribute(newAry[this.myIndex]);
        if(this.myIndex === 0){
            a = a.replace(/-/g,'');
            b = b.replace(/-/g,'');
        }
        return (a-b)*this.flag;
    })
    let frg = document.createDocumentFragment();
    for(var i=0;i<cardList.length;i++){
        frg.appendChild(cardList[i]);
    }
    cardBox.appendChild(frg);
}
function clearArrow(){
    for(var i=0;i<navList.length;i++){
         if(this !== navList[i]){
            navList[i].children[0].classList.remove('bg');
            navList[i].children[1].classList.remove('bg');
            navList[i].flag = -1;
        }
    }
   
}

function addArrow(){
    let up = this.children[0];
    let down = this.children[1];
    if(this.flag >0){
        up.classList.add('bg');
        down.classList.remove('bg');
    }else{
        up.classList.remove('bg');
        down.classList.add('bg');
    }

}



















