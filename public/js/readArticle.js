$(function () {


    //判断当前的文章是否点赞，并改变点赞按钮的样式
    likeJudge();
    function likeJudge() {
        if($(".article").hasClass("liked")){
            $(".likeNum").css({"background": "url(\"images/like2.png\") no-repeat left top", "background-size": "25px 23px"});
        }else{
            $(".likeNum").css({"background": "url(\"images/like1.png\") no-repeat left top", "background-size": "25px 23px"});

        }
    }

    //点赞按钮的点击事件
    $(".likeNum").click(function () {
        if(!$(".article").hasClass("liked")){
            //未点赞时点赞
            $(".article").toggleClass("liked");
            $.each($(".likeNum"), function (index, likeNum) {
                $(likeNum).text(parseInt($(likeNum).text())+1)
            });

        }else{
            //点赞时取消点赞
            $(".article").toggleClass("liked");
            $.each($(".likeNum"), function (index, likeNum) {
                $(likeNum).text(parseInt($(likeNum).text())-1)
            });
        }
        likeJudge();
    });

    //页面滚动时,底部横条的显示与消失
    $(window).scroll(function () {
        var scrollTop = $(document).scrollTop();
        if(scrollTop <= $(".articleBottom").find(".likeNum").offset().top - $(window).height()){
            $(".infoBottom").show();
        }else{
            $(".infoBottom").hide();
        }
    });

    //底部评论按钮的点击事件,点击后页面跳转的评论区
    $(".infoBottom").find(".commentNum").click(function () {
        var comTop = $(".commentsArea").children(".title").offset().top;
        $(document).scrollTop(comTop);
    });

    //发送评论按钮的点击
    $(".commentSend").find("textarea").val("");
    $(".commentSend").find(".send").click(function () {
        var com = $(".commentSend").find("textarea").val();
        var comLength = com.trim().length;
        if(comLength < 2){
            hint(1, "评论不得小于2个字符")
        }else{
            var date = new Date();
            var time = date.getFullYear()+"-"+timeNum(date.getMonth()+1)+"-"+timeNum(date.getDate())+" "+timeNum(date.getHours())+":"+timeNum(date.getMinutes())+":"+timeNum(date.getSeconds());
            var $newCom = $("<li class=\"comment\"><div class=\"commentLeft\"><span class=\"head\"><a href=\"#\"><img src=\"images/cat.jpg\" alt=\"\"></a></span><div><p><a class=\"nickName\">章鱼哥</a><span class=\"date\">"+time+"</span></p><p class=\"content\">"+com+"</p></div></div><div class=\"commentRight\"><a href=\"javascript:;\" class=\"comReport\">举报</a><a href=\"javascript:;\" class=\"comDelete\">删除</a></div></li>");
            $(".commentsList").prepend($newCom);
           /* $(".commentSend").find("textarea").val("");*/
            comNum();
            noCom();
            hideCom();
        }
    });

    //时间数据的改造,不足10的在前方补0
    function timeNum(num) {
        if(num < 10){
            num = "0" + num;
        }
        return num;
    }

    //举报按钮/删除按钮的点击的点击
    var type; //定义一个变量,确认点击的按钮 "articleReport" :文章举报, "comReport": 评论举报, "comDelete": 评论删除
    var elem;
    $(".articleReport").click(function () {
        confirmShow("确认提交举报?");
        type = "articleReport";
    });
    $(".commentsArea").delegate(".comReport" ,"click", function () {
        confirmShow("确认提交举报?");
        $(".confirm").css({"top": "200px"});
        type = "comReport";
    });
    $(".commentsArea").delegate(".comDelete" ,"click", function (){
        confirmShow("确认删除评论?");
        type = "comDelete";
        elem = $(this).parents(".comment");

        let $this = this;

        $.ajax({
            type:"post",
            url:"/test/diaryCommentDown",
            data:{
                src:$("#img").attr('src'),
                date:$this.parentElement.previousElementSibling.lastElementChild.firstElementChild.lastElementChild.innerHTML.toString().trim(),
                title:$("#titles").html().toString().trim(),
            },
            dataType:'json',
            success:function (result) {
                console.log('成功');
            }
        })




    });

    //选择框的取消按钮点击
    $(".confirm").find(".btnGroup").children("span").eq(0).click(function () {
        $(".confirm").css({"top": "-400px"});
    });

    //选择框确认按钮的点击
    $(".confirm").find(".btnGroup").children("span").eq(1).click(function() {
        $(".confirm").css({"top": "-400px"});
        if(type === "articleReport"){
            //执行举报操作

            hint(2,"举报成功");
        }
        if(type === "comReport"){
            //执行举报操作

            hint(2,"举报成功");
        }
        if(type === "comDelete"){
            //执行删除操作

            elem.remove();
            comNum();
            if(!unfold || $(".comment").length <= 5){
                hideCom();
            }
            noCom();
            hint(2,"删除成功");
        }
    });

    //没有评论时,显示底部信息
    noCom();
    function noCom() {
        var comNum = $(".comment").length;
        if(comNum <= 0){
            $(".noCom").show();
        }else{
            $(".noCom").hide();
        }
    }

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

    //显示页面评论数
    comNum();
    function comNum() {
        var comNum = $(".comment").length;
        $(".commentsArea").children(".title").children("span").text("("+comNum+")");
        $(".infoBottom").find(".commentNum").text(comNum);
    }


    //当评论数大于五条时显示五条,其余隐藏
    hideCom();
    function hideCom() {
        var comNum = $(".comment").length;
        if(comNum > 5){
            $.each($(".comment"), function (index, comment) {
                if(index >= 5){
                    $(comment).hide();
                    $(".unfold").text("查看所有评论");
                    unfold = false;
                    $(".unfold").show();
                }
            });
        }else{
            $(".comment").show();
            $(".unfold").hide();
        }
    }

    //点击查看全部评论时,显示所有评论
    var unfold = false; //判断当前是否为展开状态 false: 收起状态, true: 展开状态
    $(".unfold").click(function () {
        if(!unfold){
            $(".comment").show();
            $(".unfold").text("收起评论");
            unfold = true;
        }
        else{
            $.each($(".comment"), function (index, comment) {
                if(index >= 5){
                    $(comment).hide();
                    $(".unfold").show();
                }
            });
            $(".unfold").text("查看所有评论");
            unfold = false;
        }
    });
});