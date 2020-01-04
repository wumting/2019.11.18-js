let timer;
 
//1.请求数据
let send = function(){
    $.ajax({
        url:'banner.json',
        type:'get',
        async:false,
        success:function(data){
            bindHtml(data);
            timer = setInterval(autoMove,2000);
        }
    });
}


//2.绑定数据
let bindHtml = (data)=>{
    let imgs = ``;
    let lis = ``;
    $.each(data,function(index,item){
        // console.log(item);
        imgs += `<img src="${item.img}" alt="">`;
        lis += `<li></li>`;
    });
    $('#wrapper').html(imgs);
    $('#list').html(lis);
}

//3.自动轮播 
let step = 0; 
let autoMove = ()=>{
    step++;
    step === 5?step = 0:null; 
    $('img').eq(step).fadeIn().siblings().fadeOut();
    changeTip();
} 

//4.焦点跟随
let changeTip = ()=>{  
    $('li').eq(step).addClass("select").siblings().removeClass("select");
}

//5.鼠标滑上停止动画滑出继续
$('#outer').hover(function(){
    clearInterval(timer);
},function(){
    timer = setInterval(autoMove,2000);
})
send(); 
changeTip();

//6.鼠标滑上li显示对应的图片 
$('#list li').hover(function(){
    step = $(this).index()-1;
    autoMove();
})

//7.实现左右点击
$('#left').click(function(){ 
    // step--;
    // if(step === -1){
    //     step = 4;
    // }
    // $('img').eq(step).fadeIn().siblings().fadeOut();
    // changeTip();
    step-=2;
    step === -2 ?step = 3:null;
    autoMove();
})
$('#right').click(function(){
    autoMove(); 
})













