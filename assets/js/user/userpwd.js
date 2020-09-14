$(function () {
    var form = layui.form
    var layer = layui.layer
    //表单验证
    form.verify({
        pwd: function () {
            [
                /^[\S]{6,12}$/
                , '密码必须6到12位，且不能出现空格'
            ]
        },
        oldpwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return ('新旧密码不能相同')
            }
        },
        newpwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return ('两次密码不同')
            }
        }
    })
    //上传数据
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新密码成功')
                $('.layui-form')[0].reset()
            }
        })

    })
    

})