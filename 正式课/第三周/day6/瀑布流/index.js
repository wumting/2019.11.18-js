(function(){
    var oUl = document.getElementsByTagName('ul');
    var arr = Array.from(oUl);
    let data;
    let xhr = new XMLHttpRequest();
    xhr.open("get",'data.txt',false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4&& /^2\d{2}$/.test(xhr.status)){
            data = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
    console.log(data)
    let str = '';
    bindHtml(); 
    function bindHtml(){
        for(var i=0;i<50;i++){
            let index = Math.round(Math.random()*7);
            var cur = data[index];
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.innerHTML = '采集';
            a.href = 'javascript:;';
            li.appendChild(a);
            var img = document.createElement('img');
            img.setAttribute('trueImg',cur.src);
            img.style.height = Math.round(Math.random()*(350-200)+200)+'px';
            li.appendChild(img);
            var p = document.createElement('p');
            p.innerHTML = cur.title; 
            li.appendChild(p);
            arr.sort((a,b)=>{
                return a.scrollHeight - b.scrollHeight;
            })
            arr[0].appendChild(li);
        }
        var imgs = document.getElementsByTagName('img');  
        function dalay(){
            for(var i=0;i<imgs.length;i++){
                checkImg(imgs[i]);
            }
        }
        var winH = utils.win('clientHeight'); 
        function checkImg(curImg){
            if(curImg.load){return}
             var winT = utils.win('scrollTop');
             var curH = curImg.offsetHeight;
             var curT = utils.offset(curImg).t;
            if(winH+winT>curH+curT){
                let address = curImg.getAttribute('trueImg');
                let newImg = new Image;
                newImg.src = address;
                newImg.onload = function(){
                    curImg.src = address;
                    curImg.load = true; 
                } 
            } 
        }
        dalay();
        var container = document.getElementsByClassName('container')[0];
        window.onscroll = function(){
            var containerH = container.offsetHeight;
            var curT = utils.win('scrollTop');
            if(winH+curT+300 >= containerH){
                bindHtml();
            }
            dalay();
        }
    }
})()