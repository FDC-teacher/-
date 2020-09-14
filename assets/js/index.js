$(function () {
    //调用下面的函数
    getuserinfo()
    //退出操作
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
           
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
//获取用户信息
function getuserinfo() {
    $.ajax({
        method:'get',
        //my开头的权限必须要用一下
        url: '/my/userinfo',
        //请求头的配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
        // complete:function(res){
        //     console.log(res);
        //     // "status":0,"message":"获取用户基本信息成功！"
        //     // responseText
        //     // if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
        //     //     localStorage.removeItem('token')
        //     //     location.href = '/login.html'
        //     // }
        // }
    })
}

//渲染用户头像 use是云端获取到的数据
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username
    //获取用户欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //按需渲染用户头想
    if (user.user_pic !== null) {
        // $('.layui-nav-img').attr('src',user. user_pic).show()
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }



}