$(function () {


    $(".videoBox").children("img").hover(function () {
        $(this).parents(".videoBox").find(".play").css({
            border: "none",
            backgroundColor: "#ff622e"
        });

    },function () {
        $(this).parents(".videoBox").find(".play").css({
            border: "2px solid #fff",
            backgroundColor: "transparent"
        });
    });

    changeContent();

    $(".nav").children("ul").children("li").click(function () {
        $(this).siblings().removeClass("selected");
        $(this).addClass("selected");
        changeContent();
    });

    $.each($(".more"), function (index, more) {
        var $more = $(more);
        $more.attr("index", index);
        $more.click(function () {
            $(".nav").children("ul").children("li").removeClass("selected");
            $(".nav").children("ul").children("li").eq(parseInt($(this).attr("index")) + 1).addClass("selected");
            changeContent();
        });
    });

    function changeContent() {
        $.each($(".nav").children("ul").children("li"), function (index, li) {
            var $li = $(li);
            if($li.hasClass("selected")){
                $(".userPage-bottom").children("div").removeClass("selected");
                $(".userPage-bottom").children("div").eq(index).addClass("selected");
            }
        })
    }

    //大图蒙版的显示与消失
    $(".closeImg").click(function () {
        $(".bigImgCover").hide();
        $("body").css("overflow", "visible");
    });

    $(".picBox").click(function () {
        $(".bigImgCover").show();
        var src = $(this).children("img").attr("src");
        $(".bigImgCover-in").children("img").attr("src", src);
        $("body").css("overflow", "hidden");
    });

    //视频播放蒙版的显示与消失
    $(".videoClose").click(function () {
        $(".videoPlay-main").children("video").get(0).pause();
        $("body").css("overflow", "visible");
        $(".videoPlay").hide();
    });

    $(".videoBox").click(function () {
        $("body").css("overflow", "hidden");
        var src = $(this).children("img").attr("vid");
        var title = $(this).children(".videoTitle").html();
        $(".videoPlay-main").children("video").attr("src", src);
        $(".videoPlay-title").html(title);
        $(".videoPlay").show();

    });


    /*日记区js实现*/
    var $currentImg = $(".currentImg"); //当前的日记蒙版图片
    var $firstImg = $(".diaryUnfold-main").children("ul").children().eq(0);//日记蒙版第一张图片

    $(".diaryTitle").click(function () {
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
            $li.removeClass("currentImg");
            if($li.next().length !== 0) {
                $currentImg = $li.next();
            }else{
                $currentImg = $firstImg;
            }
            $currentImg.addClass("currentImg");
            $(".diaryUnfold-main").children("ul").height($currentImg.css("height"));
        });
    }
});