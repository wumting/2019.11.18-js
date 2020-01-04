let data;
let xhr = new XMLHttpRequest();
xhr.open('get','json/regionData.json',false);
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4&&/^2\d{2}$/.test(xhr.status)){
        data = JSON.parse(xhr.responseText);
    }
}
xhr.send();
console.log(data)

let selectedValue = [null,null,null];
let province = document.getElementById('province'); 
let citys = document.getElementById('city');
let county = document.getElementById('county');
/*遍历省级数据*/ 
let str =  ` <option value="" disabled selected hidden>请选择</option>`;
let bindHtml = ()=>{
    for(let i=0;i<data.length;i++){
        str += `<option value="${data[i].name}" index="${i}">${data[i].name}</option>`; 
    }
    province.innerHTML = str;
}
bindHtml();

/*遍历市数据*/
let city = null;
province.onchange=function(e){
    selectedValue[0] = this.value;
    console.log(selectedValue) 
    let curEle = this.options[this.options.selectedIndex];
    let index = curEle.getAttribute('index');
    city = data[index].city;//获取的当前是哪个城市
    let str1 = ``;
    for(var i=0;i<city.length;i++){
        str1 += `<option value="${city[i].name}" index="${i}">${city[i].name}</option>`; 
    }
    citys.innerHTML = str1;
   
}

/*遍历区数据*/
citys.onchange = function(){
    selectedValue[1] = this.value;
    console.log(selectedValue) 
    let cur = this.options[this.options.selectedIndex];
    let index1 = cur.getAttribute('index');
    let dis = city[index1].area;
    let str2 = ``; 
    for(var i=0;i<dis.length;i++){
        str2 += `<option value="${dis[i]}" index="${i}">${dis[i]}</option>`; 
    }
    county.innerHTML = str2;
}
county.onchange = function(){
    selectedValue[2] = this.value;
    console.log(selectedValue) 
} 
 






