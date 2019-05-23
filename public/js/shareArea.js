$(function () {

    // 刷新后回到顶部
    $(window).scrollTop(0);
    var $picBox = $(".picBox");
    var $picShowArea = $(".picShowArea");

    // 窗口大小改变时页面重新布局
    $(window).resize(function () {
        if($('.picShowArea').hasClass("selected")){
            setTimeout(function () {
                waterFull($picShowArea, $picBox);
            }, 400);
        }
        if($(".vidShowArea").hasClass("selected")){
            videoBoxSize();
        }
        if($(".diaryShowArea").hasClass("selected")){

        }

    });

    // 回到顶部的消失与显示
    $(window).scroll(function () {
            var scrollTop = $(document).scrollTop();

            if(scrollTop >= 500 && $(window).width() >= 992){
                $("#move_top").css("display", "block");
            }else{
                $("#move_top").css("display", "none");
            }

            if($(".picShowArea").hasClass("selected")){
                var lastTop = $($picBox[$picBox.length - 1]).outerHeight() * 0.5 + $($picBox[$picBox.length - 1]).offset().top;
                if (lastTop <= scrollTop + $(window).height()) {
                   /* for (var i = 0; i < newPic.length; i++) {
                        addEle(newPic[i].src);
                        waterFull($picShowArea, $picBox);
                    }*/
                }
            }
    });

    // 点击回到顶部
    $("#move_top").click(function () {
        bufferToTop();
    });

    // 页面切换逻辑的实现
    showWhat();
    $(".chooseNav").children("li").click(function () {
        $(".chooseNav").children("li").not(this).removeClass("selected");
        $(this).addClass("selected");
        showWhat();
        // waterFull($picShowArea, $picBox);
    });

    //大图蒙版的显示与消失
    $(".picShowArea").delegate(".pic", "click", function () {
        var src = $(this).children("img").attr("src");
        $(".imgDetails").css("display", "block");
        $(".bigImg").children("img").attr("src", src);
        $("body").css("overflow", "hidden");
        // $(".comments-bottom").children("ul").empty();
        // createComments(commentData);

    });

    $(".imgDetails").children("img").click(function () {
        $(".imgDetails").css("display", "none");
        $("body").css("overflow", "visible");
    });


    /*评论区滚动条样式*/
    $(".imgInfo").mCustomScrollbar({
        axis:"y",
        scrollButtons:{
            enable:true,
            scrollType:"continuous",
            scrollSpeed:200,
        },
        theme:"dark-3",
        scrollbarPosition:"outside",
        autoDraggerLength: true,
        advanced:{ updateOnImageLoad: true }
    });

    /*视频播放区评论样式*/
    $(".videoPlay-right").mCustomScrollbar({
        axis:"y",
        scrollButtons:{
            enable:true,
            scrollType:"continuous",
            scrollSpeed:200,
        },
        theme:"dark-3",
        scrollbarPosition:"outside",
        autoDraggerLength: true,
        advanced:{ updateOnImageLoad: true }
    });

    /*创建一条新评论*/
    /*function createComments(commentData) {
        for(var i = 0; i < commentData.length; i++){
            var $li = $("<li>\n" +
                "                            <div class=\"commentHeader\">\n" +
                "                                <img src=\""+commentData[i].header+"\" alt=\"\">\n" +
                "                            </div>\n" +
                "                            <div class=\"commentText\">\n" +
                "                                <span class=\"commentName\">"+commentData[i].name+"</span> : <span class=\"commentCon\">\n" +
                "                                "+commentData[i].text+"\n" +
                "                            </span>\n" +
                "                            </div>\n" +
                "                        </li>");
            $(".comments-bottom").children("ul").prepend($li);
        }
    }*/


    /**
     * 瀑布流
     * @param $picShowArea
     * @param $picBox
     */

    function waterFull($picShowArea, $picBox) {
        var cols = $("body>.container").outerWidth() / $picBox.outerWidth();
        var arrHeight = [], minIndex = 0, minH = 0;
        for (var i = 0; i < $picBox.length; i++){
            if (i < cols - 1){
                $($picBox[i]).css({
                    "top": 0,
                    "left": arrHeight.length * $($picBox[minIndex]).outerWidth() + "px"
                });
                arrHeight.push($($picBox[i]).outerHeight());
            }else{
                minH = selectMin(arrHeight).minValue;
                minIndex = selectMin(arrHeight).minIndex;
                $($picBox[i]).css("position", "absolute");
                $($picBox[i]).css({
                    "left": minIndex * $($picBox[minIndex]).outerWidth() + "px",
                    "top": minH + "px"
                });
                arrHeight[minIndex] = minH + $($picBox[i]).outerHeight();
            }
        }
    }

    /**
     * 找出数组中最小的值以及他的坐标
     * @param arr
     * @returns {{minValue: *, minIndex: number}}
     */

    function selectMin(arr){
        var minValue = arr[0], minIndex = 0;
        for(var i = 1; i < arr.length; i++){
            if (minValue > arr[i]){
                minValue = arr[i];
                minIndex = i;
            }
        }
        return{
            "minValue": minValue,
            "minIndex": minIndex
        }
    }

    /**
     * 向图片区添加新的图片
     * @param src：图片的地址
     */

    /*function addEle(src) {
        var $newBox = $("<div class=\"picBox\"><div class=\"pic\"><img src=\"" + src + "\"></div></div>");
        $picShowArea.append($newBox);
        $picBox = $(".picBox");
    }*/

    /**
     * 返回顶部
     */

    function bufferToTop() {
        clearInterval(window.timer);
        window.timer = setInterval(function () {
            var begin = $(document).scrollTop();
            var speed  =  - begin * 0.2;
            if(parseInt(begin) === 0){
                begin = 0;
                clearInterval(window.timer);
            }
            $(document).scrollTop(begin + speed);
        }, 20)
    }

    function showWhat() {
        for(var i = 0; i < $(".chooseNav").children().length; i++){
            if($(".chooseNav").children().eq(i).hasClass("selected")){
                $(".content").children().removeClass("selected");
                $(".content").children().eq(i).addClass("selected");
                if(i === 0){
                    waterFull($picShowArea, $picBox);
                }
                if(i === 1){
                    videoBoxSize();
                }
                if(i === 2){
                    for(var count = 0; count < 1; count++){
                        changeDiaryBox();
                    }

                }
                $(".order").children(".h3").html("热门"+$(".chooseNav").children().eq(i).text());
                break;
            }
        }
    }

    //改变视频盒子高度和宽度相同，内部视频元素高度为80%
    videoBoxSize();
    function videoBoxSize() {
        var videoBoxW = $(".videoBox").width();
        var videoBoxH;
        if(videoBoxW <= 0){
            videoBoxH = parseInt($(".videoBox").css("width")) / 100 * $(document).width();
        }else{
            videoBoxH = videoBoxW;
        }
        $(".videoBox-in").height(videoBoxH * 0.8);
        $(".videoBox-in").children("img").height(videoBoxH * 0.8 * 0.8);
    }

    //视频播放蒙版的显示与消失
    var currentVideo = null;
    $(".videoPlay").children("img").click(function () {
        $(".videoPlay-main").children("video").get(0).pause();
        $("body").css("overflow", "visible");
        $(".videoPlay").removeClass("like notLike");
        $(".videoPlay").hide();
    });

    $(".videoBox-in").click(function () {
        currentVideo = $(this).parents(".videoBox");
        $("body").css("overflow", "hidden");
        if(currentVideo.hasClass("like")){
            $(".videoPlay").addClass("like");
        }
        if(currentVideo.hasClass("notLike")){
            $(".videoPlay").addClass("notLike");
        }
        var src = $(this).children("img").attr("vid");
        var title = $(this).children(".videoTitle").html();
        $(".videoPlay-main").children("video").attr("src", src);
        $(".videoPlay-title").html(title);
        $(".videoPlay").show();

    });


    //图片区点赞逻辑实现
    $(".pic").children("span").click(function (event) {
        $(this).parents(".picBox").toggleClass("notLike like");
        event.stopPropagation();
    });

    //视频区点赞逻辑的实现
    $(".videoPlay-header").children("span").eq(1).click(function () {
        currentVideo.toggleClass("like notLike");
        $(this).parents(".videoPlay").toggleClass("like notLike");
    });

    //日记区点赞逻辑实现
    $(".diaryShowArea").find(".title").children("span").click(function (event) {
        $(this).parents(".diaryBox").toggleClass("like notLike");
        event.stopPropagation();
    });

    //日记区逻辑实现
    //日记区的展开
    $(".packUp").click(function () {
        var $rightBox = $(this).parents(".diaryBox-right");
        $rightBox.height("auto");
        $rightBox.height($rightBox.height() + 20);
        $rightBox.css("overflow","visible");
        $(this).siblings(".unfold").show();
        $(this).siblings(".unfold").siblings().hide();
        $rightBox.parents(".diaryBox").height($rightBox.height());
        changeDiaryContentH();
    });

    //日记区收起
    $(".unfold").click(function () {
        var $rightBox = $(this).parents(".diaryBox-right");
        $(this).siblings().show();
        $(this).hide();
        $rightBox.height(300);
        $rightBox.css("overflow","hidden");
        $rightBox.parents(".diaryBox").height($rightBox.height());
        changeDiaryContentH();
    });


    //改变日记的高度
    function changeDiaryBox() {
        $.each($(".diaryBox-right"),function (index, right) {
            if(!right.sort){
                if($(right).height() > 300){
                    $(this).height(300);
                    $(this).css("overflow","hidden");
                    $(this).find(".cover").show();
                    $(right).parents(".diaryBox").height($(right).height());
                }else{
                    $(this).height("auto");
                    $(this).css("overflow","visible");
                    $(this).find(".cover").hide();
                }
                right.sort = true;
            }

        });
        changeDiaryContentH();

    }

    //改变左侧竖线长度
    function changeDiaryContentH() {
        var $lastBox = $(".diaryBox").eq($(".diaryBox").length - 1);
        var $firstBox = $(".diaryBox").eq(0);
        var inHeight = $lastBox.offset().top - $firstBox.offset().top + $lastBox.height();
        $(".diaryContent-in").height(inHeight);
    }

    /*日记区详情蒙版js实现*/
    var $currentImg = $(".diaryCurrentImg"); //当前的日记蒙版图片
    var $firstImg = $(".diaryUnfold-main").children("ul").children().eq(0);//日记蒙版第一张图片


    $(".diaryBox-right").children(".title").click(function () {
        $(".diaryUnfold").fadeIn();
        $("body").css("overflow", "hidden");
        $(".diaryUnfold-main").children("ul").height($currentImg.css("height"));
    });

    $(".closeDiary").click(function () {
        $(".diaryUnfold").fadeOut();
        $("body").css("overflow", "visible");
    });

    $(".diaryUnfold-main").children("ul").children("li").click(function () {
        anim($(this));
    });

    function anim($li) {
        var dir = Math.random() > 0.5 ? 1 : -1;
        var angle = Math.random() * 60;
        $li.animate({
            left: dir * $li.width(),
            top: -$li.height(),
            opacity: 0,
            rotate: dir * angle + "deg"

        }, 1000, "swing", function () {
            $li.css({
                opacity: 1,
                left: 0,
                top: 0,
            });
            $li.rotate(0);
            $li.removeClass("diaryCurrentImg");
            if($li.next().length !== 0) {
                $currentImg = $li.next();
            }else{
                $currentImg = $firstImg;
            }
            $currentImg.addClass("diaryCurrentImg");
            $(".diaryUnfold-main").children("ul").height($currentImg.css("height"));
        });
    }

});
