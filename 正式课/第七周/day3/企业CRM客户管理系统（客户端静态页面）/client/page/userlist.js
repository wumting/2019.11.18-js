(function(){
    let $tableBox = $('.tableBox'),
        $tbody = $tableBox.children('tbody'),
        $thead = $tableBox.children('thead'),
        $theadTH = $thead.find('th'),
        $deleteAll = $('.deleteAll'),
        $selectBox = $('.selectBox'),
        $searchInp = $('.searchInp');

    let power = localStorage.getItem('power')||'';
    power = decodeURIComponent(power);
    //权限校验
    let checkPower = function(){
        if(!power.includes('userhandle')){
            $deleteAll.remove();
            $theadTH.eq(0).remove();
            $theadTH.eq($theadTH.length-1).remove();
        }
    }
    checkPower();

    //请求所有用户的通讯录
    let render = function(){
        let departmentId = $selectBox.val();
        let search = $searchInp.val().trim();
        return axios.get('/user/list',{
            params:{
                departmentId,
                search
            }
        }).then(result=>{
            let {code,data} = result;
            if(parseFloat(code) === 0){
                return data;//return 的返回值会传给下一个then中成功的回调函数
            }
        }).then(data=>{
            let str = ``;
            data.forEach(item=>{
                let {id,name,sex=0,department='--',job='--',email='--',phone='--',desc='--'} = item;//如果item中没有对应的值，会走默认值
                str+=`<tr data-id='${item.id}' data-name='${item.name}'>
                    ${power.includes("userhandle")?`<td class="w3"><input type="checkbox"></input></td>`:``}
                    <td class="w10">${name}</td>
                    <td class="w5">${parseFloat(sex)===0?"男":"女"}</td>
                    <td class="w10">${department}</td>
                    <td class="w10">${job}</td>
                    <td class="w15">${email}</td>
                    <td class="w15">${phone}</td>
                    <td class="w20">${desc}</td>
                    ${power.includes("userhandle")?`<td class="w12">
                        <a href="useradd.html?userId=${id}">编辑</a>
                        <a href="javascript:;">删除</a>
                        ${power.includes("resetpassword")?`<a href="javascript:;">重置密码</a>`:``}
                    </td>`:``}
                </tr>`
            });
            $tbody.html(str);
        }).catch(()=>{
            $tbody.html('');
        }).then(()=>{
            handleCheckbox();
        });
    }
    //绑定下拉框
    let selectBind = function(){
        return axios.get('/department/list').then(result=>{
            if(parseFloat(result.code) === 0){
                let str = `<option value ='0'>全部</option>`;
                result.data.forEach(item => {
                    str += `<option value ='${item.id}'>${item.name}</option>`;
                });
                $selectBox.html(str);
            }
        })
    }
    selectBind().then(()=>{
        render();
    });
    //根据下拉框和搜索框筛选对应的数据
    let handleFilter = function(){
        $selectBox.on('click',render);
        // $selectBox.on('change',render);
        $searchInp.on('keydown',function(e){ 
            if(e.keyCode === 13){ 
                render();
            }
        }); 
    }
    handleFilter();
    
    //利用事件委托处理员工的操作
    let handleDelete = function(){
        $tbody.click(function(e){
            let target = e.target,
                tarTag = target.tagName,
                tarVal = target.innerText,
                $target = $(target);
            //重置密码
            let $grandParent = $target.parent().parent();
            let userId = $grandParent.attr('data-id');
            let userName = $grandParent.attr('data-name');
            if(tarTag === "A"&&tarVal === '重置密码'){ 
                alert(`确定要把${userName}的密码重置吗？`,{
                    title:'警告，当前操作很重要',
                    confirm:true,
                    handled:msg=>{
                        //当点击确定时，会把‘confirm’这个字符串传给当前函数的msg
                        if(msg === 'CONFIRM'){
                            axios.post('/user/resetpassword',{
                                userId,
                                password:''
                            }).then(result=>{
                                if(parseFloat(result.code) === 0){
                                    alert('恭喜修改成功');
                                }
                                alert('当前操作失败，请重试');
                            })
                        }
                    }
                }); 
                return;
            }
            //删除
            if(tarTag==="A"&&tarVal==="删除"){
                alert(`确定要删除${userName}吗？`,{
                    title:"警告，当前操作很重要",
                    confirm:true,
                    handled:msg=>{
                        if(msg==="CONFIRM"){
                            axios.get("/user/delete",{
                                params:{userId}
                            }).then(result=>{
                                if(parseFloat(result.code)===0){
                                    render(); 
                                    return;
                                }
                            })
                        }
                    }
                })
                return;
            }
        });
      
    }
    handleDelete();

    //全选和非全选
    let handleCheckbox = function(){
        let $checkHead = $thead.find('input[type="checkbox"]');;
        let $checks = $tbody.find('input');
        $checkHead.click(function(){
            $checks.prop('checked',$(this).prop("checked"));
        });

        //需要给每一个tbody中的input绑定点击事件
        $checks.click(function(){
            //为了检验是否所有的都选中或者有一个未选中
            let flag = true;
            $checks.each((index,item)=>{
                if($(item).prop("checked") === false){
                    flag = false;
                    return;
                }
            });
            $checkHead.prop("checked",flag);
        });
    }
    
    function deleteX(index,$selects){
        // 采用递归循环的方式删除每一条选中的信息
        let $item = $selects.eq(index),
            userId=$item.parent().parent().attr("data-id");
        axios.get("/user/delete",{
            params:{userId}
        }).then(result=>{
            if(parseFloat(result.code)===0){
                deleteX(index+1,$selects)
            }
        });
    }
    //实现批量删除
    $deleteAll.click(function(){
        let $selects = $tbody.find("input[type = 'checkbox']").filter((index,item)=>{
            return $(item).prop('checked') === true; 
        });
        if($selects.length === 0){
            alert('您先选中需要删除的内容');
            return;
        }
        alert(`确定要删除${$selects.length}项信息吗？`,{
            title:'警告,当前操作很重要',
            confirm:true,
            handled:(msg)=>{
                if(msg !== 'CONFIRM')return;
                deleteX(0,$selects);
            }
        })
    })








})()