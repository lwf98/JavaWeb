$(function () {




    //改变导航条样式
    changeNav();
    function changeNav(){
        $(window).scroll(function () {
            scrollTop = $(document).scrollTop();
            if(scrollTop >= 400){
                $(".navTop").removeClass("pageTop");
            }else{
                $(".navTop").addClass("pageTop");
            }
        });
    }

    var scrollTop = $(document).scrollTop();
    if(scrollTop >= 400){
        $(".navTop").removeClass("pageTop");
    }else{
        $(".navTop").addClass("pageTop");
    }

    //设置articleBox内部文章的字数
    $.each($(".articleBox").find(".content"), function (index, content) {
        var wordNum = $(content).children("p").text().length;
        if(wordNum > 80 && $(content).parents(".articleBox").hasClass("innerInfo")){
            wordNum = $(content).children("p").text().substring(0, 80);
            $(content).children("p").text(wordNum);
            $(content).children("p").append($("<span>……</span>"))
        }
        if(wordNum > 160 && !$(content).parents(".articleBox").hasClass("innerInfo")){
            wordNum = $(content).children("p").text().substring(0, 160);
            $(content).children("p").text(wordNum);
            $(content).children("p").append($("<span>……</span>"))
        }
    });
});