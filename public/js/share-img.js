$(function () {

  /*  $.ajax({
        type:"post",
        url:"/share/img-goods",
        /!* data:{
             src:$this.firstElementChild.getAttribute("src")
         },*!/
        dataType:'json',
        success:function (result) {
            var array = $("img");
            for(let i = 0;i<array.length;i++){
                for(let j = 0 ;j<result.length;j++){
                    if($("img")[i].getAttribute("src")==result[j].src){
                        $( $("img")[i].parentElement.parentElement.parentElement.parentElement).addClass('liked');
                    }
                }

            }

        }
    })

    $("body").delegate('.likeIcon','click',function () {
        console.log('点了小心心了');
        let $this2 = this;
        console.log($this2.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.getAttribute("src"));
        $.ajax({
            type:"post",
            url:"/share/imggoods",
            data:{
                src:$this2.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.getAttribute("src")
            },
            dataType:'json',
            success:function (result) {
                console.log(result)
            }
        })

    })*/







    //导航条选中样式
    $(".navTab").children("li").eq(1).addClass("selected");

    //瀑布流布局, cols为一行里imageBox的个数
    setTimeout(function () {
        waterFull(4);
        $(".imageBox").show();
    },500);
    $(".imageBox").hide();
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
});