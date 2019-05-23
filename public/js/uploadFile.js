$(function () {
    var scale = 1;//图片相对于视频的比例
    var oldH;//日记内容输入框初始值
    var $diaryContent = $("#diaryContent");//获取日记内容输入框的jquery对象

    //初始化操作开始
    changeContent();
    clearInput();

    //初始化操作结束

    //图片上传区设置的显示与隐藏
    $("#jack").change(function () {
        $(".imgSetting").show();
        $(".warning3").hide();
    });

    $(".imgSubmit").click(function (event) {
        if($("#jack")[0].files[0] == null){
            $(".warning3").show();
            event.preventDefault();
        }
    });


    //选择视频后显示设置内容
    $(".inputVideo").change(function () {
        var file = this.files[0];
        var url = URL.createObjectURL(file);
        $("#preview").attr({
            "src": url,
            "controls": "controls"
        });
        $(".cover").show();

    });

    //实现上传图片设置封面
    $(".inputPoster").change(function () {
        var file = this.files[0];
        var url = URL.createObjectURL(file);
        $(".poster").attr("src", url);
        changePosterSize();
        if($(".poster").attr("src") !== ""){
            $(".warning1").hide();
        }
    });

    //实现获取视频某一帧图片
    $(".getPoster").click(function (event) {
        event.preventDefault();
        $(".inputPoster").val("");
        getPoster();
        if($(".poster").attr("src") !== ""){
            $(".warning1").hide();
        }
    });

    //视频上传取消按钮
    $(".videoReset").click(function () {
        $(".cover").hide();
    });
    
    //视频上传按钮
    $(".videoSubmit").click(function (event) {
        if($(".poster").attr("src") === ""){
            event.preventDefault();
            $(".warning1").show();
        }
        if($("#videoTitle").val().trim() === ""){
            event.preventDefault();
            $(".warning2").show();
        }

    });

    $("#videoTitle").blur(function () {
        if($("#videoTitle").val().trim() !== ""){
            $(".warning2").hide();
        }
    });

    // 图片上传附件
    $("#jack").fileinput({
        language:'zh',                                          // 多语言设置，需要引入local中相应的js，例如locales/zh.js
        allowedFileExtensions: ['jpg', 'gif', 'png', 'webp', 'svg'],//接收的文件后缀
        uploadUrl: "https://www.baidu.com",                     // 上传地址
        minFileCount: 1,                                        // 最小上传数量
        showUpload: true,
        dropZoneEnabled: false,
        maxFileCount: 10,
        mainClass: "input-group-xs"
    });

    //日记配图上传附件
    $("#input-b5").fileinput({
        language:'zh',                                          // 多语言设置，需要引入local中相应的js，例如locales/zh.js
        allowedFileExtensions: ['jpg', 'gif', 'png', 'webp', 'svg'],//接收的文件后缀
        uploadUrl: "https://www.baidu.com",                     // 上传地址
        minFileCount: 1,
        showCaption: false,                                     // 最小上传数量
        showUpload: false,                                     //是否显示上传
        uploadAsync: false,                                    //是否异步上传
        dropZoneEnabled: false,                                 //是否拖拽上传
        maxFileCount: 10,
        mainClass: "input-group-xs"
    });


    //改变按钮样式
    $(".inputVideo").hover(function () {
        $(".chooseVideo").css("background", "#66aae2");
    },function () {
        $(".chooseVideo").css("background", "#62c3ff");
    });

    //点击选项卡改变选项样式
    $(".tabControl").children().click(function () {
        $(".tabControl").children().removeClass("selected");
        $(this).addClass("selected");
        changeContent();
    });


    //动态改变日记输入框的高度
    $(window).one("keydown", function () {
        oldH = $diaryContent.height();
    });
    $(window).keyup(function () {
        $("pre").text($diaryContent.val());
        var lineH = parseInt($diaryContent.css("lineHeight"));
        $("pre").css({
            "lineHeight": lineH+"px",
            "margin": $diaryContent.css("margin"),
            "padding": $diaryContent.css("padding"),
            "fontSize": $diaryContent.css("fontSize")
        });
        var realHeight = $("pre").height();

        if($diaryContent.height() <= realHeight && $diaryContent.height() < 1000){
            do{
                $diaryContent.height($diaryContent.height() + lineH);
            }while ($diaryContent.height() <= realHeight);
            console.log($diaryContent.height());
        }
        if($diaryContent.height() > realHeight + lineH && $diaryContent.height() > oldH){
            $diaryContent.height($diaryContent.height() - lineH);

        }

    });

    //日记重置按钮
    $(".diaryReset").click(function () {
        $diaryContent.height(oldH);
    });

    //日记提交按钮
    $(".diarySubmit").click(function (event) {
        if($("#diaryTitle").val().trim() === "" || $("#diaryContent").val().trim() === ""){
            $(".warning4").show();
            event.preventDefault();
        }
    });

    //日记区警告的消失
    $("#diaryTitle").blur(function () {
        if($("#diaryTitle").val().trim() !== "" && $("#diaryContent").val().trim() !== ""){
            $(".warning4").hide();
        }
    });

    $("#diaryContent").blur(function () {
        if($("#diaryTitle").val().trim() !== "" && $("#diaryContent").val().trim() !== ""){
            $(".warning4").hide();
        }
    });


    //设置封面预览图宽高
    function changePosterSize() {
        var videoWidth = $("#preview").width();
        var videoHeight = $("#preview").height();
        $(".poster").width(videoWidth * scale);
        $(".poster").height(videoHeight * scale);
    }

    //获取视频当前的图像，并设置给poster
    function getPoster() {
        var canvas = document.createElement("canvas");
        canvas.width = $("#preview").width() * scale;
        canvas.height = $("#preview").height() * scale;
        canvas.getContext('2d').drawImage($("#preview")[0], 0, 0, canvas.width, canvas.height);
        $(".poster").attr("src", canvas.toDataURL('image/png'));
    }

    //实现改变上传区的内容
    function changeContent() {
        for(var i = 0; i < $(".tabControl").children().length; i++){
            if($(".tabControl").children().eq(i).hasClass("selected")){
                $(".uploadContent-in").children().removeClass("selected");
                $(".uploadContent-in").children().eq(i).addClass("selected");

                break;
            }
        }
    }

    //初始化所有input
    function clearInput() {
        $("input[type=text]").val("");
        $("input[type=file]").val("");
        $("textarea").val("");
    }

});