let sum = function(){
    let arg = Array.from(arguments);
    let total = 0; 
    for(var i=0;i<arg.length;i++){
        if(!isNaN(arg[i])){ 
            total += arg[i];
        }
    }
    return total;
}
module.exports={
    sum,
}
 