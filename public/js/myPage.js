$(function () {

    //鼠标移入视频,视频开始在当前页面播放
    $(".videoBox").find("video").hover(function () {
        videoPlay(this);
    }, function () {
        $(this).parents().siblings("span").show();
        $(this).parents().siblings(".progressBar").hide();
        this.pause();
        clearInterval(videoTimer);
    });

    //视频播放事件
    var progressBarW = $(".progressBar").width();
    var videoTimer = null;
    function videoPlay(video) {
        video.play();
        $(video).parents().siblings("span").hide();
        $(video).parents().siblings(".progressBar").show();
        var duration = video.duration;
        var $progress = $(video).parents().siblings(".progressBar").children(".progress");
        videoTimer = setInterval(function () {
            if(video.readyState > 0){
                var curTime = video.currentTime;
                $progress.width(progressBarW * (curTime / duration));
                if($progress.width() >= progressBarW){
                    video.pause();
                }
            }
        }, 100);
    }

    //改变文章内部字数的显示
    wordNumShow();
    function wordNumShow(){
        $.each($(".articleContent").children("p"), function (index, content) {
            var text = $(content).text();
            var $viewAll = $("<span class=\"viewAll\"><a href='readArticle.html' target='_blank'>VIEW ALL <img src='images/triangle.png' alt=''></a>");
            if($(content).parents(".articleBox").find(".articleRight").children("img").length === 0 && text.length > 250){
                var newText = text.substring(0, 250);
                $(content).text(newText).append($viewAll);
            }
            if($(content).parents(".articleBox").find(".articleRight").children("img").length === 1 && text.length > 190){
                var newText = text.substring(0, 190);
                $(content).text(newText).append($viewAll);
            }
        });
    }

    //当前页面是本人时,删除按钮的点击
    $(".imageBox").find(".deleteIcon").click(function () {
        elem = $(this).parents(".imageBox");
        confirmShow("确认删除这张图片吗？");
    });

    $(".videoBox").find(".deleteIcon").click(function () {
        elem = $(this).parents(".videoBox");
        confirmShow("确认删除这个视频吗？");
    });

    $(".articleBox").find(".deleteIcon").click(function () {
        elem = $(this).parents(".articleBox");
        confirmShow("确认删除这篇文章吗？");
    });

    //选择框的取消按钮点击
    $(".confirm").find(".btnGroup").children("span").eq(0).click(function () {
        $(".confirm").css({"top": "-400px"});
        elem = null;
    });

    //选择框确认按钮的点击
    var elem = null;
    $(".confirm").find(".btnGroup").children("span").eq(1).click(function() {
        $(".confirm").css({"top": "-400px"});
        //在数据库中进行删除







        elem.remove();
        noContent();
        hint(2,"删除成功");

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

    //选择框的显示
    function confirmShow(str) {
        $(".confirm").children("p").text(str);
        $(".confirm").css({"top": "200px"});
    }

    //当没有内容时,显示底部文字
    noContent();
    function noContent() {
        if($(".userPage-content").find(".content").length > 0){
            $.each($(".userPage-content").find(".content"), function (index, content) {
                var $content = $(content);
                if($content.children("ul").children("li").length === 0){
                    $content.children(".noContent").show();
                }else{
                    $content.children(".noContent").hide();
                }
            });

        }else{
            var $content = $(".userPage-content");
            if($content.children("ul").children("li").length === 0){
                $content.children(".noContent").show();
            }else{
                $content.children(".noContent").hide();
            }
        }
    }

    //当前页面不是本人时,点赞按钮的点击
    $(".imageBox").find(".likeIcon").click(function () {
        var likeNum = parseInt($(this).parents(".imageBox").find(".likeNum").text());
        if($(this).parents(".imageBox").hasClass("liked")){
            likeNum--;
        }else{
            likeNum++;
        }
        $(this).parents(".imageBox").toggleClass("liked");
        $(this).parents(".imageBox").find(".likeNum").text(likeNum)
    });

});