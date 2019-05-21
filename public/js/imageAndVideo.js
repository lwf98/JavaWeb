$(function () {

    //滚动条样式
    $(".scrollY").mCustomScrollbar({
        axis:"y",
        scrollButtons:{
            enable:true,
            scrollType:"continuous",
            scrollSpeed:200,
        },
        theme:"minimal-dark",
        scrollbarPosition:"outside",
        autoDraggerLength: true,
    });

    //显示页面评论数
    comNum();
    function comNum() {
        var comNum = $(".comment").length;
        $(".commentsShow").children(".title").children("span").text("("+comNum+")");
    }

    //评论发表
    $(".commentSend").find("textarea").val("");
    $(".commentSend").find(".send").click(function () {
        var content = $(".commentSend").find("textarea").val();
        var comLength = content.trim().length;
        if(comLength < 2){
            hint(1, "评论不得小于2个字符")
        }/*else {
            // $(".commentSend").find("textarea").val("");
            var date = new Date();
            var time = date.getFullYear()+"-"+timeNum(date.getMonth()+1)+"-"+timeNum(date.getDate())+" "+timeNum(date.getHours())+":"+timeNum(date.getMinutes())+":"+timeNum(date.getSeconds());
            var comment = $("<li class=\"comment\"><div class=\"commentTop\"><div class=\"commentTopLeft\"><div class=\"head\"><img src=\"images/cat.jpg\" alt=\"\"></div><div><p class=\"nickName\"><a href='#'>蟹老板</a></p><p class=\"date\">"+time+"</p></div></div><div class=\"commentTopRight\"><a href=\"javascript:;\" class=\"comReport\">举报</a><a href=\"javascript:;\" class=\"comDelete\">删除</a></div></div><div class=\"commentContent\"><p>"+content+"</p></div></li>");
            $(".commentsList").prepend(comment);
            commentsHeight();
            comNum();
            noCom();
        }*/
    });

    //时间数据的改造,不足10的在前方补0
    function timeNum(num) {
        if(num < 10){
            num = "0" + num;
        }
        return num;
    }

    //评论区高度的设置
    commentsHeight();
    function commentsHeight() {
        if($(".comments").height() >= 400){
            $(".comments").height(400);
        }else{
            $(".comments").height("auto");
        }
    }

    //点赞按钮的点击
    $(".likeNum").click(function () {
        if(!$(".main").hasClass("liked")){
            //未点赞时点赞
            $(".main").toggleClass("liked");
            $(".likeNum").text(parseInt($(".likeNum").text())+1)


        }else{
            //点赞时取消点赞
            $(".main").toggleClass("liked");
            $(".likeNum").text(parseInt($(".likeNum").text())-1)

        }
    });


    //举报提交与删除事件
    var type; //定义一个变量,确认点击的按钮 "comReport": 评论举报, "comDelete": 评论删除
    var elem;
    $("body").delegate(".comReport" ,"click", function () {
        confirmShow("确认提交举报?");
        $(".confirm").css({"top": "200px"});
        type = "comReport";
        return false;
    });
    //图片删除评论
    $("body").delegate(".comDelete1" ,"click", function (){
        confirmShow("确认删除评论?");
        type = "comDelete";
        elem = $(this).parents(".comment");
        let $this = this;

        $.ajax({
            type:"post",
            url:"/test/commentDown",
            data:{
                src:$('#img').attr("src"),
                views:$this.parentElement.parentElement.nextElementSibling.firstElementChild.innerHTML,
                date:this.parentElement.previousElementSibling.lastElementChild.lastElementChild.innerHTML
            },
            dataType:'json',
            success:function (result) {
                console.log('成功');
            }
        })



        return false;
    });


    //视频删除评论
    $("body").delegate(".comDelete2" ,"click", function (){
        confirmShow("确认删除评论?");
        type = "comDelete";
        elem = $(this).parents(".comment");
        let $this = this;

        $.ajax({
            type:"post",
            url:"/test/videoCommentDown",
            data:{
                src:$('#img').attr("src"),
                date:this.parentElement.previousElementSibling.lastElementChild.lastElementChild.innerHTML
            },
            dataType:'json',
            success:function (result) {
               /* window.location.reload(true);*/
                console.log('成功');
            }
        })



        return false;
    });


    //选择框的取消按钮点击
    $(".confirm").find(".btnGroup").children("span").eq(0).click(function () {
        $(".confirm").css({"top": "-400px"});
    });

    //选择框确认按钮的点击
    $(".confirm").find(".btnGroup").children("span").eq(1).click(function() {
        $(".confirm").css({"top": "-400px"});
        if(type === "comReport"){
            //执行举报操作

            hint(2,"举报成功");
        }
        if(type === "comDelete"){
            //执行删除操作
            elem.remove();
            comNum();
            if($(".comments").height() <= 400){
                $(".comments").height("auto");
            }else{
                $(".comments").height(400);
            }
            noCom();
            hint(2,"删除成功");
        }
        return false;
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
});