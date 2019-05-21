$(function () {
    var scrollTop;


    //鼠标移入导航条选项的变化
    $("#navTop li").hover(function () {
        $(this).children("li>a").css("color", "rgb(252, 124, 115)");
    },function () {
        if(scrollTop < 350){
            $(this).children("li>a").css("color", "#fff");
        }else{
            $(this).children("li>a").css("color", "#000");
        }

    });

    var $picLi, picSrc;
    for (var i = 1; i <= 8; i++){
        picSrc = "images/pic0" + i + ".webp";
        $picLi = $("<li><a href=\"javascript:;\"><img src=\"" +
            picSrc +
            "\" alt=\"\"></a></li>");
        $(".picShare ul").append($picLi);
    }

    navColor();
    $(window).scroll(function () {
        navColor();
        scrollTop = $(document).scrollTop();
        if(scrollTop >= 600){
            $("#move_top").css("display", "block");
        }else{
            $("#move_top").css("display", "none");
        }
    });

    $("#move_top").click(function () {
        bufferToTop();
    });


     /**
     *根据当前的窗口的垂直滚动距离改变导航条的颜色
     */
    function navColor() {
        scrollTop = $(document).scrollTop();
        if (scrollTop >= 350){
            $("#navTop").css("background", "#fff");
            $("#navTop a").css("color", "#000");
            /*$("#navTop")[0].style.backgroundColor = "#fff";
            for(var i = 0; i < $("#navTop a").length; i++){
                $("#navTop a")[i].style.color = "#000";
            }*/
        }
        else {
            $("#navTop").css("background", "rgba(0, 0, 0, 0.4)");
            $("#navTop a").css("color", "#fff");
        }
    }

    /**
     * 缓动动画，回到顶部
     */
    function bufferToTop() {
        clearInterval();
        window.timer = setInterval(function () {
            var begin = $(document).scrollTop();
            var speed  =  - begin * 0.2;
            if(parseInt(begin) === 0){
                begin = 0;
                clearInterval(window.timer);
            }
            console.log(begin);
            $(document).scrollTop(begin + speed);
        }, 20)
    }
});


