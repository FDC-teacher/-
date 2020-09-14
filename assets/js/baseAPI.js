//每次调用AJAX或者get或者post 都会调用ajaxPrefilter这个函数
//在这个函数中我们可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // console.log(options.url);
    //只为权限接口设置HEADERS接口
    if(options.url.indexOf('/my/')!== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //再注册区删除token值 防止客户从地址栏直接进入
    options.complete = function(res){
        if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})