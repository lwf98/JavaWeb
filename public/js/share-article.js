$(function () {
    //导航条选中样式
    $(".navTab").children("li").eq(3).addClass("selected");


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

    //改变文章内部字数的显示
    wordNumShow();
    function wordNumShow(){
        $.each($(".articleContent").children("p"), function (index, content) {
            var text = $(content).text();
            var $viewAll = $("<span class=\"viewAll\"><a href='watchArticle.ejs' target='_blank'>VIEW ALL <img src='images/triangle.png' alt=''></a>");
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

});