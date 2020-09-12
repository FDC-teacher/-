//每次调用AJAX或者get或者post 都会调用ajaxPrefilter这个函数
//在这个函数中我们可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    options.url = 'http://ajax.frontend.itheima.net'+ options.url
    // console.log(options.url);
})