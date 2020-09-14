$(function () {

    var layer = layui.layer
    //文档粘贴过来的
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //以上是文档粘贴过来的结束

    //给上传按钮添加 选择文件 的点击事件
    $('#btncooseimg').on('click', function () {
        $('#file').click()
    })

    //上传按钮发生改变时
    $('#file').change(function (e) {
        //   console.log(e);
        var fist = e.target.files
        if (fist.length === 0) {
            return layer.msg('请选择图片')
        }
        //文档粘贴过来的开始
        // 拿到用户选择的文件
        var file = e.target.files[0]
        // 根据选择的文件，创建一个对应的 URL 地址
        var newImgURL = URL.createObjectURL(file)
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
        //以上是文档粘贴过来的结束
    })
    //将裁剪后的图片，输出为 base64 格式的字符串
    $('#btnupload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        //传到服务器
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功')
                window.parent.getuserinfo()
            }
        })
    })

})
