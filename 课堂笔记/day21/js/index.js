// console.log(utils)
/* 
第一步：从服务器获取数据，然后渲染到页面上
     1、创建一个变量准备接收请求来的数据
     2、利用ajax请求数据，然后把数据放到一个变量中
         1、创建一个ajax实例，
         2、打开一个请求连接，基于get请求同步完成
         3、监听服务器返回的信息状态，如果状态是200，状态码是4，证明数据请求成功
         4、发送ajax请求
     3、把请求来的数据赋值给变量接收
*/
let cardBox = document.getElementById('cardBox');
let data = null;
let xhr = new XMLHttpRequest; //创建一个ajax实例
xhr.open('GET', 'json/product.json', false) //打开一个请求连接，基于get请求同步完成
xhr.onreadystatechange = function () {
    //如果状态是200，状态码是4，证明数据请求成功
    if (xhr.status === 200 && xhr.readyState === 4) {
        //把请求来的数据赋值给变量接收
        data = xhr.responseText;
    }
}
xhr.send() //发送ajax请求
// console.log(data)
data = JSON.parse(data); //把json格式的字符串转换为json格式的对象
renderHtml();
//向页面渲染数据的方法
function renderHtml() {
    let htmlStr = ``;
    data.forEach((item) => {
        htmlStr += ` 
        <li data-time = "${item.time}" data-price = "${item.price}" data-hot = "${item.hot}">
        <img src="${item.img}" alt="">
        <span>${item.title}</span>
        <span>时间：${item.time}</span>
        <span>价格：${item.price}</span>
        <span>hot：${item.hot}</span>
    </li>`
    })
    console.log(htmlStr)
    cardBox.innerHTML = htmlStr //把字符串的数据渲染到页面
}

/* 
第二步：点击相应的按钮进行排序按照时间、热度、价格、进行排序
    1、想操作谁就获取谁
    2、给相应的元素绑定相应的事件
    3、在事件里做想做的事
*/
let navList = document.getElementsByTagName('a');
let cardList = cardBox.getElementsByTagName('li');
// console.log(navList,cardList)
cardList = utils.toArray(cardList);
for (var i = 0; i < navList.length; i++) {
    navList[i].index = i;
    navList[i].flag = -1;
    navList[i].onclick = function () {
        this.flag *= -1; //每点击一次就把当前元素身上的flag乘等于-1
        //此方法里的this就是你当前点击的元素
        sortList.call(this);
        clearArrow.call(this);
        addArrow.call(this);
    }
}

function sortList() {
    console.log(this.flag)
    let dataAry = ['data-time', 'data-hot', 'data-price'];
    // console.log(dataAry[this.index])
    //this就是你当前点击的元素
    cardList.sort((a, b) => {
        a = a.getAttribute(dataAry[this.index]);
        b = b.getAttribute(dataAry[this.index]);
        if (this.index === 0) {
            a = a.replace(/-/g, '');
            b = b.replace(/-/g, '');
        }
        return (a - b) * this.flag;
    })
    let frg = document.createDocumentFragment();
    for (var i = 0; i < cardList.length; i++) {
        frg.appendChild(cardList[i]);
    }
    cardBox.appendChild(frg);
}

function clearArrow() {
    //这里的this就是当前点击的元素（a标签）
    //元素.classList：当前元素的class名列表
    //元素.classList.remove('class名')：移除指定的class名
    for (var i = 0; i < navList.length; i++) {
        //如果这个条件成立，那就是剩下的那两个a标签，把这两的flag置为默认值-1
        if (this != navList[i]) {
            navList[i].children[0].classList.remove('bg');
            navList[i].children[1].classList.remove('bg');
            navList[i].flag = -1;
        }

    }
}

function addArrow() {
    //this就是当前点击的元素
    let up = this.children[0];
    let down = this.children[1];
    if (this.flag > 0) {
        up.classList.add('bg');
        down.classList.remove('bg');
    } else {
        up.classList.remove('bg');
        down.classList.add('bg');
    }
}