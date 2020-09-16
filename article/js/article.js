$(function () {
    // 思路：
    // 一 渲染 先获取数据 用模板引擎渲染 template（模板id，数据）
    // 二 添加 1.对添加按钮添加点击事件 弹出框的form代理body 选择layui的弹框  通过代理形式
    // 为form绑定submit事件 ajax 最后关闭弹框 刷新页面
    // 三 编辑 对编辑按钮添加点击事件（） 弹框  先获取当前行的id（给编辑按钮添加自定义类里面是id） 在用ajax 修改后再用
    // ajax 更新 关闭弹框
    // 四 给删除按钮添加点击事件 添加layui询问的弹框 里面添加ajax获取当前行的id 
    // 删除 调用渲染页面函数  
    var layer = layui.layer
    var form = layui.form
    huoqu()
    function huoqu() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.mesage)
                }
                //模板引擎获取数据渲染
                var hrmler = template('moban', res)
                $('tbody').html(hrmler)
            }
        })
    }

    //添加分类
    var cslcc = null
    $('#tianjia').on('click', function () {
         cslcc = layer.open({
            // 去掉确定按钮
            type: 1,
            // 宽高
            area: ['500px', '300px'],
            title: '添加类别'
            , content: $('#tianjiak').html()
        });

    })
    $('body').on('submit', '#form-tian', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                huoqu()
                layer.close(cslcc)
            }
        })
    })

    // 编辑
    var csl = null
    $('tbody').on('click','#bj-form',function(){
        csl = layer.open({
            // 去掉确定按钮
            type: 1,
            // 宽高
            area: ['500px', '300px'],
            title: '编辑类别'
            , content: $('#xiugai').html()
        });
        //把数据渲染在弹出的文本框里 根据Id值获取
        var id = $(this).attr('data-id')
        $.ajax({
            method:'GET',
            url:'/my/article/cates/'+ id,
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                //先给form添加 lay-filter
                form.val('form-bianji',res.data)
            }
        })
    })
    $('body').on('submit','#form-bianji',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('更新失败')
                }
                huoqu()
                layer.close(csl)
                layer.msg('修改成功')
            }
        })
    })

    //删除
    $('tbody').on('click','#ree-form',function(){
        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/' + id,
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg('删除失败')
                    }
                    huoqu()
                    layer.msg('删除成功')
                }
            })
            
            
            layer.close(index);
          });   
            
    })
})