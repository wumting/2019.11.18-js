 

let send = function(){
    $.ajax({
        url:'banner.json',
        type:'get',
        async:false,
        success:function(data){
            bindHtml(data);
        }
    })
}

let bindHtml = (data)=>{
    let imgs = ``;
    let lis = ``;
    $.each(data,function(index,item){
        imgs += `<img src="" alt="">`;
    })
}



send();


























