let express = require('express');
let router = express.Router({});
let mongodb = require("../mongose/03-mongooseCURD");
let nodemailer = require("nodemailer");
let responseData;
router.use(function (req,res,next) {
    responseData = {
        code:0,
        message:""
    }
    next();
})
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Express' });
    console.log(req.method);
});


router.post('/yz', function(req, res, next) {
    var obj = req.body;
    mongodb.user.findOne({name:obj.username},(err,data)=>{
      if(!err){
          if(data){
              responseData.code=2;
              responseData.message="已存在";
              res.json(responseData);
          }else{
              responseData.code=1;
              responseData.message="不存在";
              res.json(responseData);
              console.log("注册成功");
              mongodb.user.create({name:obj.username,password:obj.password,email:obj.email},(err)=>{
                  if(!err){
                      console.log("保存成功");
                      responseData.code=null;
                       responseData.message="成功";
                      // res.json(responseData);
                       return;
                  }else{

                      throw err;
                  }
              })
          }
      }else
      {
          throw err;
      }
 });
});






//忘记密码路由
router.post('/forget', function(req, res, next) {
    var obj = req.body;

    mongodb.user.findOne({email:obj.email,name:obj.username},(err,data)=>{
    if(!err){
        if(data){

            let transporter = nodemailer.createTransport({
                // host: 'smtp.ethereal.email',
                service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
                port: 465, // SMTP 端口
                secureConnection: true, // 使用了 SSL
                auth: {
                    user: '30230350@qq.com',
                    // 这里密码不是qq密码，是你设置的smtp授权码
                    pass: 'owezwcqlyboncaeb',
                }
            });

            let mailOptions = {
                from: '30230350@qq.com', // sender address
                to: obj.email, // list of receivers
                subject: '密码找回', // Subject line
                // 发送text或者html格式
                // text: 'Hello world?', // plain text body
                html:"您的用户名为:"+data.name+";"+"您的登陆密码为"+data.password // html body
            };

// send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>

                responseData.code=3;
                responseData.message="密码找回成功,请至对应邮箱查看";
                res.json(responseData);


            });

        }else{

            responseData.code=4;
            responseData.message="没有此邮箱信息或者用户名与邮箱不匹配";
            res.json(responseData);



        }
    }
    });
});



module.exports = router;