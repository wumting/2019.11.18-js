let list = document.querySelector('.list');
let btnLi = document.getElementsByTagName('i');
let data = [{
        "num": 0,
        "price": 12.5,
        "total": 0
    },
    {
        "num": 0,
        "price": 10.5,
        "total": 0
    },
    {
        "num": 0,
        "price": 8.5,
        "total": 0
    },
    {
        "num": 0,
        "price": 8,
        "total": 0
    },
    {
        "num": 0,
        "price": 14.5,
        "total": 0
    }
];
renderHtml();
function renderHtml() {
    let htmlStr = ``;
    data.forEach((item) => {
        htmlStr += `
            <li>
                <i ></i>
                <em>${item.num}</em>
                <i></i>
                <span>
                    单价：<strong>${item.price}元 </strong> 小计：<strong>${item.total}元</strong>
                </span>
            </li>
        `;
    });
    // console.log(list.innerHTML);
    list.innerHTML = htmlStr;
    btnLi = document.getElementsByTagName('i');
}


btnLi = Array.from(btnLi);
// console.log(btnLi);
for(let i=0;i<btnLi.length;i++){
    btnLi[i].onclick = function(){
        if(i%2 === 0){//减号
            console.log(i);
            sub(i);
        }else{
            sum(i);
        }
    }
}
//
function sub(i){
    
        //减号 操作data里面的num
        if(data[i/2]['num']>0){
            data[i/2]['num'] -= 1;
        }
        //total
         data[i/2]['total'] = (data[i/2]['num'])* (data[i/2]['price']);
         renderHtml();
    
}

function sum(i){
    
    //减号 操作data里面的num
    if(data[(i-1)/2]['num']>0){
        data[(i-1)/2]['num'] += 1;
    }
    //total
    data[(i-1)/2]['total'] = (data[(i-1)/2]['num'])*data[(i-1)/2]['price'];
    renderHtml();
}



