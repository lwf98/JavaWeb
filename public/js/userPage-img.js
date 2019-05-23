$(function () {

    //瀑布流布局, cols为一行里imageBox的个数
    var arrMaxH = [];
    setTimeout(function () {
        waterFull(4);
        $(".imageBox").show();
    },500);
    $(".imageBox").hide();

    /*waterFull(4);*/
    function waterFull(cols) {
        var arrHeight = [], minIndex = 0, minHeight = 0;
        $.each($(".imageBox"), function (index, box) {
            var $box = $(box);
            if(index < cols){
                $box.css({
                    "top": 0,
                    "left": arrHeight.length * $box.width() + "px"
                });
                arrHeight.push($box.outerHeight());
            }else{
                minHeight = selectMin(arrHeight).minValue;
                minIndex = selectMin(arrHeight).minIndex;
                $box.css({
                    "left": minIndex * $box.width() + "px",
                    "top": minHeight + "px"
                });
                arrHeight[minIndex] = minHeight + $box.outerHeight();
            }
            arrMaxH.push($box.offset().top + $box.height());
            $(".imageList").height(selectMax(arrMaxH).maxValue - $(".imageList").offset().top);
        });

    }

    //找出数组中最小的数以及其对应的下标
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

    //找出数组中最大的数及其对应的下标
    function selectMax(arr){
        var maxValue = arr[0], maxIndex = 0;
        for(var i = 1; i < arr.length; i++){
            if (maxValue < arr[i]){
                maxValue = arr[i];
                maxIndex = i;
            }
        }
        return {
            "maxValue": maxValue,
            "maxIndex": maxIndex
        }
    }


    //点赞按钮的点击
    $(".imageBox").find(".likeIcon").click(function () {
        var likeNum = parseInt($(this).parents(".imageBox").find(".likeNum").text());
        if($(this).parents(".imageBox").hasClass("liked")){
            likeNum--;
        }else{
            likeNum++;
        }
        $(this).parents(".imageBox").toggleClass("liked");
        $(this).parents(".imageBox").find(".likeNum").text(likeNum)
    });

    //删除按钮的点击
    $(".imageBox").find(".deleteIcon").click(function () {
        elem = $(this).parents(".imageBox");
        confirmShow("确认删除这张图片吗？");
    });

    //选择框的取消按钮点击
    $(".confirm").find(".btnGroup").children("span").eq(0).click(function () {
        $(".confirm").css({"top": "-400px"});
        elem = null;
    });

    //选择框确认按钮的点击
    var elem = null;
    $(".confirm").find(".btnGroup").children("span").eq(1).click(function() {
        $(".confirm").css({"top": "-400px"});
        arrMaxH.splice(elem.index(), 1);
        if(arrMaxH.length !== 0){
            $(".imageList").height(selectMax(arrMaxH).maxValue - $(".imageList").offset().top);
        }
        else{
            $(".imageList").height(0);
        }
        elem.remove();

        //在数据库中进行删除
        hint(2,"删除成功");
        noContent();
    });

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

    //当没有内容时,显示底部文字
    noContent();
    function noContent() {
        if($(".imageList").children(".imageBox").length === 0){
            $(".noContent").show();
        }else{
            $(".noContent").hide();
        }
    }

});