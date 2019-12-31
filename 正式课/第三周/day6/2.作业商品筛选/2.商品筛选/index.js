let subData =  {
    'type':'',
    'size':'',
    'system':'',
    'web':''
}
var choose = document.getElementById("choose");
let a = document.getElementsByTagName('a');
let li = document.getElementsByTagName('li');
let iArr =[];
//给每一个a绑定点击事件
for (let i = 0; i < a.length; i++) {
    a[i].onclick = function () {
        let parent = this.parentNode;
        let parType = parent.getAttribute('type');
        let val = this.innerHTML; 
        //更新类名
        let aArr = parent.children; 
        for(let j=0;j<aArr.length;j++){
            aArr[j].classList.remove('show');
            aArr[j].style.color = '';
            this.classList.add('show');
            this.style.color = 'red';
        } 
        setData(parType,val); 
        bindHtml();
    }
}
//渲染顶部数据
function bindHtml() { 
    var temp = ``;
    for(key in subData){
        if(subData[key]){
            temp += `<a key = '${key}'>${subData[key]}<i>x</i></a>`;
        }
    }
    choose.children[0].innerHTML = temp;
    iArr = document.getElementsByTagName('i');
    closeTab(iArr);
}
//处理数据，当点击的时候让上面显示
function setData(key,value){
    subData[key] = value;
} 
//给每一个i绑定点击事件
function closeTab(iArr){  
    for(let i=0;i<iArr.length;i++){
        iArr[i].onclick = function(){
            let iPar = this.parentNode.getAttribute('key');
            //获取到点击的这个是属于哪个li的
            let liClass = document.getElementsByClassName(iPar)[0]; 
            let liChild = liClass.children; 
            for(var i =0;i<liChild.length;i++){
                liChild[i].style.color = '';
            }
            setData(iPar,'');
            bindHtml();
        }
    }
}
 




