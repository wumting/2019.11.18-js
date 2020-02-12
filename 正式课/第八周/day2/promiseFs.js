
let fs = require('fs');
let path = require('path');
let obj = {};
function suffixName(pathname) {
    let reg = /\.([0-9a-zA-Z]+)$/;
    let suffix = reg.test(pathname) ? reg.exec(pathname)[1] : '';
    let encoding = 'utf8';
    let picReg = /^(png|gif|jpg|webg|icon|svg|mp3|mp4)$/;
    picReg.test(suffix) ? encoding = null : null;
    return encoding;

}

['readFile', 'readdir', 'mkdir', 'rmdir', 'unlink'].forEach(item => { 
        obj[item] = function (pathname) {
            pathname = path.resolve(pathname);
            return new Promise((resolve, reject) => {
                console.log(222);
                let encoding = suffixName(pathname); //如果后缀名是图片，不需要让encoding是utf8；
                let callBack = function (err, result) {
                    if (err !== null) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                };
                if (item !== 'readFile') {
                    encoding = callBack;
                    callBack = null;
                }
                fs[item](pathname, encoding, callBack);
            })
        }
});
['writeFile', 'appendFile'].forEach(item => {
    obj[item] = function (pathname, content) {
        pathname = path.resolve(pathname);
        typeof content === 'object' && content !== null ? content = JSON.stringify(content) : null;
        typeof content !== 'string' ? content += '' : null;
        return new Promise((resolve, reject) => { 
            let encoding = suffixName(pathname); //如果后缀名是图片，不需要让encoding是utf8
            let callBack = function (err, result) {
                if (err !== null) {
                    reject(err);
                    return;
                }
                resolve(result); 
            }
            fs[item](pathname, content, encoding, callBack);
        });
    }
});
obj['copyFile'] = function(pathname1,pathname2){
    pathname1 = path.resolve(pathname1);
    pathname2 = path.resolve(pathname2);
    return new Promise((resolve,reject)=>{
        fs['copyFile'](pathname1,pathname2,err=>{
            if(err !== null){
                reject();
                return;
            }
            resolve();
        });
    });
}
module.exports = obj;