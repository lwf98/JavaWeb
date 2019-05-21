$(function () {


    //选择文件后文件的预览
    $(".fileSelected").children("input[type=file]").val("");
    $(".fileSelected").children("input[type=file]").change(function (event) {
        $(".fileList").empty();
        var files = event.target.files, file;
        for(var i = 0; i < files.length; i++){
            if($(".fileList").children().length >= 12){
                hint(1, "一次最多上传12张图片");
                return false;
            }
            file = files[i];
            if(file.size > 1024  * 1024 * 10){
                hint(1,"图片大小不能超过 10MB!");
                continue;
            }
            var URL = window.URL || window.webkitURL;
            var imgURL = URL.createObjectURL(file);
            var $img = $("<img>");
            $img.attr("src", imgURL);
            if(file.size / 1024 <  1024){
                var fileSize = (file.size / 1024).toFixed(2) + 'kb';
            }else{
                var fileSize = (file.size / 1024 / 1024).toFixed(2) + 'mb';
            }
            var fileName = file.name;
            var $fileBox = $(" <li class=\"fileBox\"><div class=\"fileBox-in\"><div class=\"box\"></div><p class=\"fileName\">"+fileName+"</p><p class=\"fileSize\">"+fileSize+"</p></div></li>");
            $fileBox.find(".box").append($img);
            $(".fileList").append($fileBox);
            $(".fileShow").show();
            $(".controlBtn").show();
            $(".publishInfo").children("input").attr("placeholder", ("已选择"+files.length+"个文件"));
        }


    });

    //左上角关闭按钮的点击
    $(".fileShow").find(".removeAll").click(function () {
        $(".fileShow").hide();
        $(".fileSelected").children("input[type=file]").val("");
        $(".publishInfo").children("input").attr("placeholder", ("请选择文件(按住Ctrl键可以实现多张选择)"));
        $(".controlBtn").hide();
        $(".fileList").empty();
    });

    //下方取消按钮的点击
    $(".controlBtn").children("input[type='reset']").click(function () {
        $(".fileShow").hide();
        $(".controlBtn").hide();
        $(".publishInfo").children("input").attr("placeholder", ("请选择文件(按住Ctrl键可以实现多张选择)"));
        $(".fileList").empty();
    });

    //下方确认发布按钮的点击
    $(".controlBtn").children("input[type='submit']").click(function () {

    });
    
    //提示信息的显示 type=1: 警告信息, type=2: 成功信息
    function hint(type ,str) {
        if(type === 1){
            $(".hint").find("img").attr("src", "images/confirm-img.png");
        }
        if(type === 2){
            $(".hint").find("img").attr("src", "images/hint-ok.png");
        }
        $(".hint").children("p").text(str);
        $(".hint").css("display", "block");
        setTimeout(function (){$(".hint").css("opacity", 1)}, 0);
        setTimeout(function (){$(".hint").css("opacity", 0)}, 2000);
        setTimeout(function (){$(".hint").css("display", "none")}, 2000);
    }

});