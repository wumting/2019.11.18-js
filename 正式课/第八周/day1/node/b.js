let average = function(){
    let arg = Array.from(arguments);
    let argSort = arg.sort((a,b)=> a-b).slice(1,arg.length-1);
    // argSort.splice(0,1);
    // argSort.length--;
    let sum = require('./a');
    let total = sum.sum(...argSort); 
    return total/argSort.length; 
}
// module.exports={
//     average,
// }
exports.average = average;