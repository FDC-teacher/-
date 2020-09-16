$(function () {
    var layer = layui.layer
    var form = layui.form
    //用获取文章分类列表 接口文档 
    //用AJAX获取数据 用模板引擎渲染
    hqfl()
    // 初始化富文本编辑器
    initEditor()
    //获取分类函数
    function hqfl() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var xr = template('moban', res)
                $('[name=cate_id]').html(xr)
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    //点击上传图片等于点击隐藏的input上传
    $('#btnchooseimage').on('click', function () {
        $('#coverfile').click()

    })
    //当选择文件发生变化时 
    $('#coverfile').on('change', function (e) {
        // 拿到用户选择的文件
        var file = e.target.files[0]
        if (file.length === 0) {
            return
        }
        // 根据选择的文件，创建一个对应的 URL 地址
        var newImgURL = URL.createObjectURL(file)
        // 先销毁旧的裁剪区域，再重新设置图片路径，
        // 之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    var zhi = '已发布'
    $('#caogao').on('click', function () {
        zhi = '存草稿'
    })
    // 用formdata存储数据
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('state', zhi)
        //将裁减后的图片输出为一个对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                //吧文件对象放入fd中//
                fd.append('cover_img', blob)
                publish(fd)
            })
    })
    // 把fd中的数据传输到服务器中
    function publish(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败')
                }
                layer.msg('发布文章成功')
                location.href = ''
            }
        })
    }
})