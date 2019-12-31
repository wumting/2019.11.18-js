let data = {
    'type':'',
    'size':'',
    'system':'',
    'web':''
}
//给每一个a绑定点击事件
let ul = document.getElementById('type');
let li = ul.getElementsByTagName('li');
let a = document.getElementsByTagName('a');
let iArr = [];
// a = Array.from(a); 
for(let i=0;i<a.length;i++){
    a[i].onclick = function(){ 
        let parent = this.parentNode;
        let parType = parent.getAttribute('type');
        let val = this.innerHTML;
        let aArr = parent.children;
        for(let j=0;j<aArr.length;j++){
            aArr[j].classList.remove('show');
            this.classList.add('show');
            aArr[j].style.color = '';
            this.style.color = 'red';
        }
        setData(parType,val);
        bindHtml();
    }
}
 //处理数据，当点击的时候让上面显示
function setData(type,value){
    data[type] = value;
} 
//渲染顶部数据
let choose = document.getElementById('choose');
function bindHtml(){
    let str = ``;
    for(key in data){
        if(data[key]){
            str += `<a key = '${key}'>${data[key]}<i>x</i></a>`
        } 
    }
    choose.children[0].innerHTML = str;
    iArr = document.getElementsByTagName('i');
    closeTab();
}
 

//给每一个i绑定点击事件
function closeTab(){
    for(let i=0;i<iArr.length;i++){
        iArr[i].onclick = function(){
            let ipar = this.parentNode.getAttribute('key');
            let curli = document.getElementsByClassName(ipar)[0];
            let liChild = curli.children;
            for(let i=0;i<liChild.length;i++){
                liChild[i].style.color = ''; 
            } 
            setData(ipar,'');
            bindHtml();
        }
    }
}




