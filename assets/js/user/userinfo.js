$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6之间'
            }
        }
    })

    inituserinfo()
    function inituserinfo() {
        $.get(
            '/my/userinfo',
            function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // console.log(res);
                form.val('formuserinfo', res.data)
            }
        )
    }


    $('#btnreset').on('click', function (e) {
        e.preventDefault()
        inituserinfo()
    })


    //更新用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功');
                window.parent.getuserinfo()
                // console.log('oh');
            }
        })
    })



})
