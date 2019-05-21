$(function () {

    //私信界面js
    if($(".privateMessage").hasClass("selected")){
        //如果输入框没有内容则禁用发送按钮的点击
        sendJudge();
        function sendJudge(){
            var wordsNum = $("#chatFrame").val().length;
            if(wordsNum > 0){
                $(".sendMessage").removeAttr("disabled");
            }else{
                $(".sendMessage").attr("disabled", "disabled");
                $(".words").children("span").text(0);
            }
        }

        //发送框
        $("#chatFrame").val("");
        $("#chatFrame").on("input", function () {
            var wordsNum = $("#chatFrame").val().length;
            if(wordsNum <= 100){
                $(".words").children("span").text(wordsNum);
            }
            sendJudge();
        });

        //发送框的点击
        $(".sendMessage").click(function () {
            var content = $("#chatFrame").val();
            var date = new Date();
            var curTime = date.getFullYear()+"年"+changeTimeNum(date.getMonth()+1)+"月"+changeTimeNum(date.getDate())+"日 "+changeTimeNum(date.getHours())+":"+changeTimeNum(date.getMinutes());
            var $newChat = $("<li class=\"oneself\"><p class=\"chatTime\">"+curTime+"</p><span class=\"head\"><img src=\"images/cat.jpg\" alt=\"\"></span><div class=\"chatContent\"><span class=\"glyphicon glyphicon-triangle-left\"></span><p>"+content+"</p></div></li>");
            $(".chatRecords").append($newChat);
            $("#chatFrame").val("").focus();
            $('.chatContentTop').mCustomScrollbar('scrollTo','bottom');
            sendJudge();
        });

        //时间数据的处理
        function changeTimeNum(num){
            if(num >= 0 && num< 10){
                num = 0 + String(num);
            }
            return num;
        }

        //聊天记录
        $(".chatRecords").find(".others").find(".head").find("img").attr("src", $(".curChat").find(".head").find("img").attr("src"));

        //联系人的删除按钮点击
        $(".contacts").find(".delete").click(function () {
            $(this).parent("li").remove();
        });

        //切换当前联系人
        $(".contacts").children("li").click(function () {
            $(this).siblings().removeClass("curChat");
            $(this).addClass("curChat");
            changeChatContent();
        });

        changeChatContent();
        function changeChatContent(){
            $.each($(".contacts").children("li"), function (index, li) {
                if($(li).hasClass("curChat")){
                    $(".messageBoxTopRight").text($(li).find(".nickName").text());

                }
            })
        }
    }




    //滚动条样式的设置
    $(".scrollY").parent("div").mCustomScrollbar({
        axis:"y",
        scrollButtons:{
            enable:true,
            scrollType:"continuous",
            scrollSpeed:200,
        },
        theme:"minimal-dark",
        scrollbarPosition:"outside",
        autoDraggerLength: true,
       /*  advanced:{ updateOnImageLoad: true }*/
    });


});