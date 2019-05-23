

$(function () {
    window.onload=function () {

        var $ctrlLis = $(".tabControl").children("ul").children("li");
        var picData = [
            {"src": "images/waterFull/img07.webp"},
            {"src": "images/pic02.webp"},
            {"src": "images/pic03.webp"},
            {"src": "images/pic04.webp"},
            {"src": "images/pic05.webp"},
            {"src": "images/pic06.webp"},
            {"src": "images/pic07.webp"},
            {"src": "images/pic08.webp"},
            {"src": "images/pic01.webp"},
            {"src": "images/pic03.webp"},
        ];

        videoBoxSize();

        changeContent();
        changeImgSize();
        imgPrivacy();

        $ctrlLis.click(function () {
            $(this).parent().children("li").removeClass("selected");
            $(this).addClass("selected");
            changeContent();
            changeImgSize();
        });

        $(window).resize(function () {
            changeImgSize();
            videoBoxSize();
        });



        //测试数据
        /*createPicBox(picData, "2012 / 12 / 12", 10);
        createPicBox(picData, "2012 / 12 / 12", 10);*/

        //大图蒙版的显示与消失
        $(".closeImg").click(function () {
            $(".bigImgCover").hide();
            $("body").css("overflow", "visible");
        });

        $(".imgBig").click(function () {
            $(".bigImgCover").show();
            var src = $(this).parents(".pic").children("img").attr("src");
            $(".bigImgCover-in").children("img").attr("src", src);
            $("body").css("overflow", "hidden");
        });

        //视频播放蒙版的显示与消失
        $(".videoClose").click(function () {
            $(".videoPlay-main").children("video").get(0).pause();
            $("body").css("overflow", "visible");
            $(".videoPlay").hide();
        });

        $("body").delegate(".videoBox-in","click",function () {
            let img = document.getElementById("img");
            let video = document.getElementById("videos");
            $.ajax({
                type:"post",
                url:"/test/imgvideo",
                data:{
                    img: img.getAttribute("src"),
                },
                dataType:'json',
                success:function (result) {
                 console.log(result);
                 video.setAttribute("src",result[0].src);

                },
            })




            console.log(123)
            $("body").css("overflow", "hidden");
            var src = $(this).children("img").attr("vid");
            var title = $(this).children(".videoTitle").html();
            $(".videoPlay-main").children("video").attr("src", src);
            $(".videoPlay-title").html(title);
            $(".videoPlay").show();
        })





        //创建新的日记
        /*function createDiary(title, diaryText) {
            var $diary = $("<li>\n" +
                "                            <div class=\"panel panel-default diaryBox\">\n " +
                "                                <div class=\"panel-heading\">\n "+title+"" +
                "                                    <h3 class=\"panel-title\"></h3>\n" +
                "                                </div>\n" +
                "                                <div class=\"panel-body\">"+diaryText+"</div>\n" +
                "                            </div>\n" +
                "                        </li>");
              $("#diaryContent").children("ul").append($diary);
        }*/

        //改变图片的尺寸
        function changeImgSize() {
            $(".pic").height($(".pic").width());
            /*var timer = null;
            clearTimeout(timer);
            timer = setTimeout(function () {
                if($(".pic").children("img").width() < $(".pic").width()){
                    $(".pic").children("img").css({
                        width: $(".pic").width(),
                        height: "auto"
                    })
                }
                if($(".pic").children("img").height() < $(".pic").height()){
                    $(".pic").children("img").css({
                        width: "auto",
                        height: $(".pic").height()
                    })
                }
            }, 100);*/
            $(".pic").children("img").on("load",function () {
                if($(".pic").children("img").width() < $(".pic").width()){
                    $(".pic").children("img").css({
                        width: $(".pic").width(),
                        height: "auto"
                    })
                }
                if($(".pic").children("img").height() < $(".pic").height()){
                    $(".pic").children("img").css({
                        width: "auto",
                        height: $(".pic").height()
                    })
                }
            });
        }



        //创建新的picBox
        /*    function createPicBox(picData, date, num) {
                var $picBox = $("<div class=\"picBox\">\n" +
                    "                        <p class=\"date\">"+  date +"</p>\n" +
                    "                        <ul>\n" +
                    "\n" +
                    "                        </ul>\n" +
                    "                    </div>");
                createPic($picBox, picData, num);
                $("#albumContent").append($picBox);
                changeImgSize();
            }*/

        //创建新的pic
        /*function createPic($picBox, picData, num){
            for(var i = 0; i < num; i++) {
                var $newPic = $("<li class=\"pic\"><img src=\"" + picData[i].src + "\"></li>");
                $picBox.children("ul").append($newPic);
            }
            var $watchMore = $("<div class=\"watchMore\"><a href='#'></a></div>");
            $picBox.children("ul").children(".pic").last().append($watchMore);
        }*/

        //改变视频盒子高度和宽度相同，内部视频元素高度为80%
        function videoBoxSize() {
            var videoBoxW = $(".videoBox").width();
            var videoBoxH;
            console.log(videoBoxW);
            if(videoBoxW <= 0){
                videoBoxH = parseInt($(".videoBox").css("width")) / 100 * $(document).width();
            }else{
                videoBoxH = videoBoxW;
            }
            $(".videoBox-in").height(videoBoxH * 0.8);
            $(".videoBox-in").children("img").height(videoBoxH * 0.8 * 0.8);
        }

        function changeContent() {
            for(var i = 0; i < $ctrlLis.length; i++){
                if($ctrlLis.eq(i).hasClass("selected")){
                    $(".contentArea").children("ul").children("li").removeClass("selected");
                    $("#"+$ctrlLis.eq(i)[0].id+"Content").addClass("selected");
                }
            }
        }

        /*日记区js实现*/
        var $currentImg = $(".currentImg"); //当前的日记蒙版图片
        var $firstImg = $(".diaryUnfold-main").children("ul").children().eq(0);//日记蒙版第一张图片

        /*$(".diaryBox").click(function () {
                    console.log(this.firstElementChild.firstElementChild.getAttribute("src"));
                    $.ajax({
                        type:"post",
                        url:"/diary/showdiary",
                        data:{
                            img:this.firstElementChild.firstElementChild.getAttribute("src")
                        },
                        dataType:'json',
                        success:function (result) {
                         $("#h2").text(result[0].jianjie),
                         $("#img5").attr("src",result[0].img),
                         $("#p5").text(result[0].content)
                        },
                        error:{

                        }

                    })




            $(".diaryUnfold").fadeIn();
            $("body").css("overflow", "hidden");
            $(".diaryUnfold-main").children("ul").height($currentImg.css("height"));
        });*/

        $(".closeDiary").click(function () {
            $(".diaryUnfold").fadeOut();
            $("body").css("overflow", "visible");
        });

        $(".diaryUnfold-main").children("ul").children("li").click(function () {
            anim($(this));
            console.log($(this));
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

        //图片操作蒙版的显示与消失
        $(".pic").hover(function () {
            $(this).children(".cover").show();
        },function () {
            $(this).children(".cover").hide();
        });

        //图片的公开与取消公开
        $(".imgPublic").click(function () {
            var $pic = $(this).parents(".pic");
            $pic.toggleClass("imgPrivate imgPublic");
            imgPrivacy($pic);
        });

        //图片的删除
        $(".imgDelete").click(function () {
            var $pic = $(this).parents(".pic");
            $pic.remove();
        });



        //图片操作蒙版内容的改变，若不传参则对所有图片蒙版进行判断与操作，若传参则对其进行操作
        function imgPrivacy($pic) {
            if($pic === undefined){
                $.each($(".pic"),function (i, pic) {
                    $pic = $(pic);
                    if($pic.hasClass("imgPrivate")){
                        $pic.find(".imgPrivacy").text("公开");
                    }
                    if($pic.hasClass("imgPublic")){
                        $pic.find(".imgPrivacy").text("取消公开");
                    }
                });
            }else{
                if($pic.hasClass("imgPrivate")){
                    $pic.find(".imgPrivacy").text("公开");
                }
                if($pic.hasClass("imgPublic")){
                    $pic.find(".imgPrivacy").text("取消公开");
                }
            }
        }


    }
})

