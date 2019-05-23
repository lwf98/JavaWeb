$(function () {

    //设置背景按钮的点击
    $(".bgUpload").children("input").change(function (event) {
        var files = event.target.files, file;
        if(files && files.length > 0){
            file = files[0];
            var URL = window.URL || window.webkitURL;
            var imgURL = URL.createObjectURL(file);
            // $(".mainTop").css({backgroundImage: imgURL});
            $(".mainTop").attr({"style": "background-image: url("+imgURL+")"});
        }
    });

    //修改头像按钮的点击按钮的点击
    $(".headUpload").find("input").change(function (event) {
        var files = event.target.files, file;
        if(files && files.length > 0){
            file = files[0];
            var URL = window.URL || window.webkitURL;
            var imgURL = URL.createObjectURL(file);
            $(".headUpload").children("img").attr({"src": imgURL});
        }
    });


    //确认按钮的点击
    $(".controlBtn").children("input[type='submit']").click(function (event) {
        var emailReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if(($("#nickName").val()).trim().length < 2){
            hint(1, "昵称应在2~12个字符之间!");
            event.preventDefault();
        }else if(($("#email").val()).trim() !== "" && !emailReg.test(($("#email").val()).trim())){
            hint(1,"请输入正确的邮箱地址!");
            event.preventDefault();
        }else if(($("#phoneNum").val()).trim() !== "" && !(/^1(3|4|5|7|8)\d{9}$/.test(($("#phoneNum").val()).trim()))){
            hint(1,"请输入正确的手机号!");
            event.preventDefault();
        }else{
            //进行后台昵称冲突验证,成功后修改成功
        }
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

    //取消按钮的点击
    var initialHeadURL = $(".headUpload").children("img").attr("src");
    var initialBgURL =  $(".mainTop").attr("style");
    $("input[type=reset]").click(function () {
        $(".headUpload").children("img").attr("src", initialHeadURL);
        $(".mainTop").attr("style", initialBgURL);
    });
});