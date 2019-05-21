$(function () {


    //每次刷新页面时,清空内容
    $(".articleTitle").children("input").val("");
    $(".articleContent").children("textarea").val("");
    $(".importImg").find("input").val("");

    //输入标题时,左侧字数提示改变
    $(".articleTitle").children("input").on("input", function () {
        var titleLength = $(this).val().length;
        $(".articleTitle").find(".wordNum").text(titleLength + " / 30");
    });

    //添加图片时,显示图片名称
    var hasImg = false;
    $(".importImg").find("input").change(function (event) {
        var files = event.target.files, file;
        if(files && files.length > 0){
            file = files[0];
            $(".importImg").find(".imgName").text(file.name);
            hasImg = true;
        }
    });

    //删除配图按钮的显示与消失
    $(".importImg").hover(function () {
        if(hasImg){
            $(".importImg").find(".delete").show();
        }
    }, function () {
        $(".importImg").find(".delete").hide();
    });

    //删除配图按钮的点击
    $(".importImg").find(".delete").click(function () {
        $(".importImg").find("input").val("");
        $(".importImg").find(".imgName").text("");
        $(this).hide();
        hasImg = false;
    });

    //确认发布按钮的点击
    $(".controlBtn").find("input[type='submit']").click(function (event) {
        var titleNum = $(".articleTitle").children("input").val().length;
        var articleNum = $(".articleContent").children("textarea").val();
        if(titleNum < 2){
            hint(1,"标题不得少于2个字符");
            event.preventDefault();
        }else if(articleNum < 10){
            hint(1, "文章内容不得小于10个字符");
            event.preventDefault();
        }else{
            //上传文章
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
    
    $("input[type='reset']").click(function () {
        $(".importImg").find(".imgName").text("");
        hasImg = false;
    });
});