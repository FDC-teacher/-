$(function () {
    //登录注册切换区
    // 点击按钮去注册框
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击按钮去登录框
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //密码区
    /* 从layui中获取form对象 */
    var form = layui.form
    //定义元素  注册成功失败的提示框
    var layer = layui.layer
    // 通过form.verify函数自定义检验规则
    form.verify({
        //自定义一个属性
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '密码不一致'
            }
        }
    })



    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //阻止默认请求
        e.preventDefault()
        $('#form_reg').serialize();
        //发起AJAX请求
        $.post(
            '/api/reguser',
            {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }, function (res) {
                if (res.status !== 0) {
                    //应用定义的元素 提示框
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg('注册成功');
                $('#form_reg [name=password]').val('')
                $('#form_reg [name=repassword]').val('')

            })

    })



    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.post(
            '/api/login'
            , {
                username: $('#form_login [name=username]').val(),
                password: $('#form_login [name=password]').val()
            }, function (res) {
                if (res.status !== 0) {
                    //应用定义的元素 提示框
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg('登录成功');
                //将登录成功得到的token值存到localStorage中
                localStorage.setItem('token', res.token)
                //跳转到后台页面
                location.href = '/index.html'
            })
    })

})