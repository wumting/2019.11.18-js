// 顶部关闭按钮
var $close = $('.icon-guanbi');
var $jd_promotion = $('.jd_promotion');
$close.click(function(){
    $jd_promotion.css('display','none');
});
//选项卡部分
var $lists = $('.class_left_list1');
$lists.mouseover(function(){
    $('.J_popCtn .right_con').eq($(this).index()).css('display','block').siblings().css('display','none'); 
}); 
//京东倒计时
var endTime = '18:00';
$('.seckill_time strong').html(endTime);
function addZero(val){
    return val < 10 ? '0'+val : val;
}
let timer = setInterval(function(){
    var time = parseInt(Date.now()/1000); 
    var curTime = new Date(); 
    var cur = curTime.getFullYear() + '/' + (curTime.getMonth()+1) + '/' + curTime.getDate() +' ' + endTime;
    var curTimeStamp = (new Date(cur)).getTime()/1000;
    var lengthTimeStamp = curTimeStamp - time;
    if(lengthTimeStamp<=0){
        clearInterval(timer);
        $('.times').html('<span class = "endSign">已结束</span>');
        return;
    } 
    var hour = addZero(parseInt(lengthTimeStamp/60/60));
    var sec = addZero(parseInt((lengthTimeStamp-hour*3600)/60));
    var min =  addZero((lengthTimeStamp-hour*3600-sec*60)); 
    $('.time').eq(0).html(hour);
    $('.time').eq(1).html(sec);
    $('.time').eq(2).html(min); 
},1000);

// elevator和seach
$('.elevator li').mouseover(function(){
    if($(this).index()===1){
        $(this).find('img').attr('src','../images/nianhuojie.png');
    }else{
        $(this).css('background','#e1251b').siblings().css('background','');
        $(this).find('img').attr('src','../images/nianhuojieb.png');
    } 
});
$('.elevator li').mouseout(function(){
    $(this).css('background','');
    if($(this).index()===1){
        $(this).find('img').attr('src','../images/nianhuojieb.gif');
    }
})
$(window).scroll(function(){
    let curT = document.documentElement.scrollTop || document.body.scrollTop;//滚动条卷去的高度 
   if($('.seckill').offset().top <= curT){//判断滚动条卷去的高度是否大于倒计时的上偏移量
        $('.elevator').addClass('elevator_fix');
        $('.w_search_logo').css('display','block');
        $('.w_search').addClass('w_search_fixed');
   }else{
       $('.elevator').removeClass('elevator_fix');
       $('.w_search_logo').css('display','none');
       $('.w_search').removeClass('w_search_fixed');
   } 
});
// 回到顶部
$('.elevator_toTop').click(function(){
    $(document.documentElement).animate({scrollTop:"0px"},500);
})






