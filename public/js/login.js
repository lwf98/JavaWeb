
/*
$(function () {
    //自动居中title
    var title = $("#title").text().split("");
    $("#title").text("");
    $.each(title, function (index, ti) {
        if(ti !== ","){
            var $i = $("<i>"+ti+"</i>");
            $("#title").append($i);

        }
    });

    //判断当前为登陆还是注册 true: 登陆， false: 注册
    var state = true;

    //刷新页面后，清空输入框的值
    $("input[type=text]").val("");
    $("input[type=password]").val("");

    //点击登陆按钮
    $("#logBtn").click(function () {
        if(state){
            //如果当前是登陆界面
            var userL = $("#user").val().trim().length;
            var pwdL = $("#password").val().trim().length;
            if(userL === 0 && pwdL === 0){
                warning("用户名与密码不能为空");
            }else if(userL < 6 || pwdL < 6){
                warning("请输入正确的用户名与密码");
            }else{
                //进行登陆验证

                $.ajax({
                    type:"post",
                    url:"login/lyz",
                    data:{
                        username:$("#user").val(),
                        password:$("#password").val(),
                    },
                    dataType:'json',
                    success:function (result) {
                        if(result.code==1){
                            warning(" 登陆成功")
                            setTimeout(function () {
                                window.location.href="/index";
                            },1500)
                        }else{
                            warning("账号或者密码不正确")
                        }
                    }
                })



            }
        }else{
            //如果当前是注册界面
            state = true;
            $(".confirm").css("height", 0);
            $("#status").children("i").eq(0).css("top", 0);
            $("#status").children("i").eq(1).css("top", "45px");
        }
    });

    //点击注册按钮
    $("#regBtn").click(function () {
        if(!state){
            //如果当前是注册界面
            var userL = $("#user").val().trim().length;
            var pwdL = $("#password").val().trim().length;
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if(userL === 0 && pwdL === 0){
                warning("用户名与密码不能为空");
            }else if(userL < 6 || pwdL < 6){
                warning("用户名与密码应在6到16位之间");
            }else if($("#password").val() !== $("#confirm-password").val()){
                warning("两次密码输入不同");
                $("#confirm-password").val("");
            }else if(!reg.test($("#email").val())){
                warning("请输入正确的邮箱");
            }else{
                //提交注册

                $.ajax({
                    type:"post",
                    url:"/signup/yz",
                    data:{
                        username:$("#user").val(),
                        password:$("#password").val(),
                        email:$("#email").val(),
                    },
                    dataType:'json',
                    success:function (result) {
                        if(result.code==1){
                            warning("恭喜你注册成功")
                            setTimeout(function () {
                                window.location.href="/login"
                            },1500)
                        }else if(result.code==2){
                            warning("该用户名已存在")
                        }
                    }
                })


            }

        }else{
            state = false;
            //如果当前是登陆界面
            $(".confirm").css({"height": "32px"});
            $(".confirm").eq(0).css({ "marginBottom": "25px"});
            $("#forgetPwd").css("marginTop", "50px");
            $("#status").children("i").eq(0).css("top", "-45px");
            $("#status").children("i").eq(1).css("top", 0);
        }
    });

    //顶部警告的出现与消失
    function warning(str) {
        $("#hint").text(str);
        $("#hint").css("display", "block");
        setTimeout(function (){$("#hint").css("opacity", 1)}, 0);
        setTimeout(function (){$("#hint").css("opacity", 0)}, 2000);
        setTimeout(function (){$("#hint").css("display", "none")}, 2000);
    }

    //忘记密码相关代码
    $("#forgetPwd").click(function () {
        $(".cover ").css("display","block");
        $(".cover").css({"top": "200px"});
    });
    $(".cover").find("button").eq(1).click(function () {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        var userL = $(".cover").find("input").eq(0).val().trim().length;
        if(userL < 6 || !reg.test($(".cover").find("input").eq(1).val())){
            warning("请输入正确的用户名与邮箱");
        }else{

            //后台验证
            $.ajax({
                type:"post",
                url:"/signup/forget",
                data:{
                    email:$("#forget-email").val(),
                    username:$("#username").val(),
                },
                dataType:'json',
                success:function (result) {
                    $(".cover ").css("display","none");
                    setTimeout(function () {
                        warning(result.message)
                    },600)
                }
            })
        }
    });

    $(".cover").find("button").eq(0).click(function (){
        $(".cover").find("input").val("");
        $(".cover").css({"top": "-400px"});
    });








});
*/
$(function () {
    //登陆注册页面切换动画
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });


    //登陆按钮的点击
    $(".login").click(function (event) {
        var userL = $("#logUser").val().trim().length;
        var pwdL = $("#logPassword").val().trim().length;
        if(userL === 0 && pwdL === 0){
            hint(1,"用户名与密码不能为空");
            event.preventDefault();
        }else if(userL < 6 || pwdL < 6){
            hint(1,"请输入正确的用户名与密码");
            event.preventDefault();

        }else{
            //进行登陆验证
            $.ajax({
                type:"post",
                url:"login/lyz",
                data:{
                    username:$("#logUser").val(),
                    password:$("#logPassword").val(),
                },
                dataType:'json',
                success:function (result) {
                    if(result.code==1){
                       hint(2,'恭喜您登陆成功')
                        setTimeout(function () {
                            window.location.href="/index";
                        },1500)
                    }else{
                        hint(1,'账号或者密码不正确')
                    }
                }
            })

        }
    });

    //注册按钮的点击
    $("input[type=text]").val("");
    $("input[type=email]").val("");
    $("input[type=password]").val("");
    $(".register").click(function (event) {
        var userL = $("#regUser").val().trim().length;
        var pwdL = $("#regPassword").val().trim().length;
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if(userL === 0 && pwdL === 0){
            hint(1,"用户名与密码不能为空");
            event.preventDefault();
        }else if(userL < 6 || pwdL < 6){
            hint(1,"用户名与密码应在6到16位之间");
            event.preventDefault();
        }else if(!reg.test($("#email").val())){
            hint(1,"请输入正确的邮箱");
            event.preventDefault();
        }else if($("#regPassword").val() !== $("#confirm-password").val()){
            hint(1,"两次密码输入不同");
            event.preventDefault();
            $("#confirm-password").val("");
        }else{
              //提交注册
            $.ajax({
                type:"post",
                url:"/signup/yz",
                data:{
                    username:$("#regUser").val(),
                    password:$("#regPassword").val(),
                    email:$("#email").val(),
                },
                dataType:'json',
                success:function (result) {
                    if(result.code==1){
                        hint(2 ,'恭喜你注册成功')

                        setTimeout(function () {
                            window.location.href="/login"
                        },1500)
                    }else if(result.code==2){
                        hint(1 ,'用户名已经存在')
                    }
                }
            })



        }
    });

    //忘记密码的点击
    $("#forgetPwd").click(function () {
        $(".cover").css({"top": "200px"});
    });

    //忘记密码确认的点击
    $(".cover").find("input[type=button]").eq(1).click(function (event) {
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        var userL = $(".cover").find("input").eq(0).val().trim().length;
        if(userL < 6 || !reg.test($(".cover").find("input").eq(1).val())){
            hint(1,"请输入正确的用户名与邮箱");
            event.preventDefault();
        }else{

            $.ajax({
                type:"post",
                url:"/signup/forget",
                data:{
                    email:$("#forget-email").val(),
                    username:$("#username").val(),
                },
                dataType:'json',
                success:function (result) {
                    setTimeout(function () {
                        hint(1,result.message)
                    },600)
                }
            })


        }
    });

    //忘记密码取消的点击
    $(".cover").find("input[type=button]").eq(0).click(function (){
        $(".cover").css({"top": "-400px"});
        $(".cover").find("input").eq(0).val("");
        $(".cover").find("input").eq(1).val("");
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
});
