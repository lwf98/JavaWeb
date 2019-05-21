$(function () {



    //导航条选中样式
    $(".navTab").children("li").eq(2).addClass("selected");


    //点击选项卡,改变排序规则
    $.each($(".sortRule").children("li"), function (index, li) {
        var $li = $(li);
        $li.click(function () {
            $(this).siblings("li").removeClass("selected");
            $(this).addClass("selected");
            if(index === 0){
                //按浏览量排序

            }
            if(index === 1){
                //按点赞数排序
            }
            if(index === 2){
                //按发布时间排序

            }
        });
    });

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


});