$(function () {

    //视频选择
    $(".fileSelect").children("input").val("");
    $(".fileSelect").children("input").change(function (event) {
        var files = event.target.files, file;
        if(files && files.length > 0){
            file = files[0];
            var URL = window.URL || window.webkitURL;
            var videoURL = URL.createObjectURL(file);
            $(".videoSelect").children("video").attr("src", videoURL).show();
        }
    });

    //取消按钮的点击
    $(".controlBtn").children("input[type='reset']").click(function () {
        $(".videoSelect").children("video").attr("src", "").hide();
    });

    //确认发布按钮的点击
    $(".videoTitle").val("");
    $(".controlBtn").children("input[type='submit']").click(function (event) {
        if($(".fileSelect").children("input").val() === ""){
            hint(1,"请选择视频文件!");
            event.preventDefault();
        }else if($(".videoTitle").val() === ""){
            hint(1, "请输入视频标题!");
            event.preventDefault();
        }else{
            //文件上传
        }
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