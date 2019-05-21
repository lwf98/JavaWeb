$(function () {

    /*当文件上传时，获取上传的文件*/
    $("input[type='file']").click(function () {
        var imgData = $(this).prop('files');
        console.log(imgData);
    });

    /*鼠标移入p标签，修改按钮出现，移出时隐藏*/
    $(".info").children("div").children("p").hover(function () {
        $(this).children(".modify").css("display", "inline-block");
    },function () {
        $(this).children(".modify").css("display", "none");
    });

    /*点击修改按钮，显示表单，隐藏p标签*/
    $(".modify").click(function () {
        $(this).parent().css("display", "none");
        $(this).parent().siblings().css("display", "block");
    });

    /*点击取消按钮，显示p标签，隐藏表单*/
    $(".edit").children("form").children("[type='reset']").click(function () {
        $(this).parent().parent().css("display", "none");
        $(this).parent().parent().siblings().css("display", "block");
    });

    /*点击保存，若值不为空，则改变p标签内的值*/
    $(".edit").children("form").children(".submit").click(function () {
        if($(this).siblings().eq(1).val().replace(/\s*/g,"") !== ""){
            $(this).parent().parent().css("display", "none");
            $(this).parent().parent().siblings().css("display", "block");
            $(this).parent().parent().siblings().children("span").html($(this).siblings().eq(1).val());
            $(this).siblings().eq(1).val(null);
        }
    });

});