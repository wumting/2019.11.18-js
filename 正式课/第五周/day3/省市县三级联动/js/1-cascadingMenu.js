let val;
$.ajax({
    url:'json/regionData.json',
    type:'get',
    async:false,
    success:function(data){
        let arr = formData(0,data);
        $('#province').html(bindHtml(arr));
        $('#province').change(function(){
            val = $(this).val();
            let arr = formData(1,data);
            $('#city').html(bindHtml(arr));
        });
        $('#city').change(function () {
            val = $(this).val();
            let arr = formData(2,data);
            $('#country').html(bindHtml(arr));
        })
    }
});

function formData(level,data){
    let result = [];
    let ary = null;
    if(level === 0){
        $.each(data,function(index,item){
            result.push(item.name);
        })
    }
    if(level === 1){
        $.each(data,function(index,item){
            if(item.name === val){
                ary = item.city;
            }
        });
        $.each(ary,function(index,item){
            result.push(item.name);
        })
    }
    if(level === 2){
        $.each(data,function(index,item){
            $.each(item.city,function(index,item){
                if(item.name === val){
                    result = item.area;
                }
            })
        })
    }
    return result;
}

function bindHtml(arr){
    let str = ` <option>请选择</option>`;
    $.each(arr,function(index,item){
        str += ` <option>${item}</option>`;
    });
    return str;
}















