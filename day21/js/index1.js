let cardBox = document.getElementById('cardBox');
let data = null;
let xhr = new XMLHttpRequest;
xhr.open('GET', 'json/product.json', false);
xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
        data = xhr.responseText;
    }
};
xhr.send();

data = JSON.parse(data);
//  console.log(data);
renderHtml();

function renderHtml() {
    let htmlStr = ``;
    data.forEach(item => {
        htmlStr += `
    <li data-time = "${item.time}" data-price = "${item.price}" data-hot = "${item.hot}">
    <img src="${item.img}" alt="">
    <span>标题：${item.title}</span>
    <span>时间：${item.time}</span>
    <span>价格：${item.price}</span>
    <span>hot：${item.hot}</span>
</li>
    `
    });
    cardBox.innerHTML = htmlStr;
}

let navList = document.getElementsByTagName('a');
let cardList = cardBox.getElementsByTagName('li');
cardList = utils.toArray(cardList);
// console.log(cardList)
for(var i=0;i<navList.length;i++){
    navList[i].index = i;
    navList[i].flag = -1;
    navList[i].onclick = function(){
        this.flag *= -1;
        sortList.call(this);


    }
}

function sortList(){
    let dataAry = ['data-time','data-hot','data-price'];
    console.log(cardList)
    cardList.sort((a,b)=>{
        a = a.getAttribute(dataAry[this.index]);
        b = b.getAttribute(dataAry[this.index]);
        if(this.index === 0){
            a=a.replace(/-/g,'');
            b = b.replace(/-/g,'');
        }
        return (a-b)*this.flag;
    })
    for(var i = 0;i<cardList.length;i++){
        cardBox.appendChild(cardList[i])
    }
    

}






