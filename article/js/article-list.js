$(function(){
    var p = {
        pagenum:1,  //页码值
        pagesize:2, //每页显示多少条数据
        cate_id:'', //文章分类的 Id
        state:'' //文章的状态，可选值有：已发布、草稿
    }
    $.ajax({
        method:'GET',
        url:'/my/article/list',
        data:p,
        success:function(res){
            if(res.status !== 0){
                return layer.msg('获取失败')
            }
            //模板引擎渲染数据
            var yq = template('moban',res)
            $('#jg').html(yq)
        }
    })
})