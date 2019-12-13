let ulList = document.getElementsByTagName('ul');
ulList = utils.toArray(ulList);
console.log(ulList)
// 获取页面的5个ul，并且转换为数组


let data = null;
let xhr = new XMLHttpRequest();
xhr.open("get",'data.txt',false);
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)){
        data = JSON.parse(this.responseText);
    }
}
xhr.send();
// 数据绑定
function bindHtml(){
    for (var i = 0; i < 50; i++) {
        // 1、随机生成一个索引。然后去data里面获取某一个对象
        let index = Math.round(Math.random()*9);
        let curObj = data[index];
        let li = document.createElement('li');
        let img = document.createElement('img');
        // 2、给img设置各种属性，然后把img插入到li元素里
        img.setAttribute('trueImg', curObj.src);
        img.className = 'bg';
        img.style.height = Math.round(Math.random()*(250-180)+180)+'px';
        // 让img的高度随机生成
        li.appendChild(img);

        // 在把li插入到页面的ul里之前，先对ul进行排序(按照ul的真实高度)，
        // 排序之后ulList[0]每次获取的都是高度最矮的那个ul，然后将li插入到里面
        // 每插入一个li，ul就会重新排一下续
        ulList.sort((a,b)=> {
            
            return a.scrollHeight - b.scrollHeight
            // 按照页面的真实高度排序
        })
        // console.log(ulList)
        ulList[0].appendChild(li);
    }
}
bindHtml(); //数据绑定方法封装完成之后让其执行一次

var imgs = document.getElementsByClassName("bg");

/* 
* 此方法是循环判断每一个img需不需要加载的
*/
function dealy(){
    // 循环页面中所有的图片，判断每一个图片看看是否要加载
    for (var i = 0; i < imgs.length; i++) {
        dealyImg(i); // 把当前图片的索引传递给dealyImg
    }
}
let winH = utils.win('clientHeight'); // 获取浏览器可视区域的高度(因为这个高度是不会变得，我给他拿到函数外边来)
function dealyImg(index){
    let curImg = imgs[index]; // 通过传递过来的索引前获取到当前的img
    if(curImg.flag){
        // 如果图片已经加载过，那当前的img身上就会有flag属性，值为true，那以后这个图片就不需要重复加载了
        return
    }
    // 判断图片是否加载的临界条件
    // 图片的底边框和浏览器可视窗口的的下边框重合时，就是代表图片已经完全露出来了，需要加载了
    let curH = curImg.offsetHeight // 图片的总高度
    let curT = utils.offset(curImg).top // 图片距离body的上边框距离(上偏移量)
    let winT = utils.win('scrollTop'); // 获取浏览器卷去的高度

    if(curH+curT<winT+winH){
        var address = curImg.getAttribute('trueImg');
        var newImg = new Image;
        newImg.src = address;
        newImg.onload = function(){
            curImg.src = address;
            curImg.flag = true;
            fadeIn(curImg);
        }
    }

}
function fadeIn(img){
    utils.setCss(img ,'opacity', 0.1);
    let cur = Number(utils.getCss(img,'opacity'));
    var timer = setInterval(()=>{
        cur+=0.2;
        if(cur>=1){
            clearInterval(timer);
            utils.setCss(img, 'opacity', 1);
        };
        utils.setCss(img, 'opacity', cur);
    }, 200);
}
dealy(); // 页面初次展现的时候就把图片加载一下，让第一屏的图片加载出来
/* 
*监听页面滚动事件
*/
window.onscroll = function(){
    dealy();
    let bodyH = document.body.scrollHeight; // 浏览器真实的高度
    let winT = utils.win('scrollTop'); // 浏览器卷去的高度
    // 判断数据是否需要再次插入的临界条件是当前浏览器的底部和当前窗口内容的真实高度的底部重合时

    // 浏览器滚动条卷去的高度+当前可视窗口的高度 === 当前屏幕的真实内容高度
    // 那如果我给(浏览器滚动条卷去的高度+当前可视窗口的高度)提前加上300，那下边的判断条件就会提前成立，从而实现滚动条在即将触碰到页面底端的时候再次发送数据请求
    if(winT+ winH+300>bodyH){
        bindHtml();
    }
}