//基于单例设计模式来管理商城排序的代码
let shopModule = (function () {
    //想要操作谁就先获取谁（项目中尽可能吧创建变量提前并放在一起）
    let $navList = $('#nav a'),
        $cardBox = $('#cardBox'),
        $cardList = null,
        _DATA = null;

    //获取数据
    function queryData() {
        $.ajax({
                url: 'json/product.json',
                method: "GET",
                async: false,
                success: result => {
                    //从服务器获取数据成功会执行success，result存储的就是获取到的数据（并且数据默认就已经转换为JSON格式的对象）
                    _DATA = result;
                }
            }

        );
    }
    //把数据绑定在页面中
    function bindHTML() {
        if (!_DATA) return;
        let HTML = ``;
        $.each(_DATA, (index, item) => {
            let {
                title,
                img,
                price,
                hot,
                time
            } = item;
            HTML += `<li time ="${time}" price = "${price}" hot = "${hot}">
            <img src="${img}" alt="">
            <span>${title}</span>
            <span>时间：${time}</span>
            <span>价格：${price}</span>
            <span>热度：${hot}</span>
        </li>`;
        });
        $cardBox.html(HTML);
        //获取所有的li
        $cardList = $cardBox.children('li');
    }
    //sort排序：实现商城排序
    function sortHandle() {
        $navList.attr('type',-1);
      
        $navList.on('click',function(){
            let $this = $(this),
            pai =$this.attr('pai');
            $this.attr('type',$this.attr('type')*-1).siblings().attr('type',-1);
            $cardList.sort((A,B)=>{
                let $A = $(A),
                    $B = $(B);
                $A = $A.attr(pai);
                $B = $B.attr(pai);
                pai === "time"?($A = $A.replace(/-/g,''),$B = $B.replace(/-/g,'')):null;
                return ($A - $B)*$this.attr('type');
            });
            $cardList.each((index,item)=>{
                $cardBox.append(item);
            });
        })
    }
    return {
        //当前模块的入口：想让商城排序开始执行我们只需要执行init，在init中会按照顺序依次完成具体的业务逻辑
        init() { //=>init:function(){}
            queryData();
            bindHTML();
            sortHandle();
        }
    }
})();
shopModule.init();