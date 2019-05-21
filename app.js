let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require("body-parser");
let Cookies = require("cookies");

let filePublishRouter = require('./routes/filePublish');
let userSetRouter = require('./routes/userSet');
let userPageRouter = require('./routes/userPage');
let shareRouter = require('./routes/share');
let shareAreaDateRouter = require('./routes/shareAreaDate');
let shareAreaGoodsRouter = require('./routes/shareAreaGoods');
let sharevideoDateRouter = require('./routes/sharevideoDate');
let sharevideoGoodsRouter = require('./routes/sharevideoGoods');
let sharediaryDateRouter = require('./routes/sharediaryDate');
let sharediaryGoodsRouter = require('./routes/sharediaryGoods');
let apiRouter = require('./routes/api');
let mainRouter = require('./routes/main');
let loginRouter = require('./routes/login');
let signupRouter = require('./routes/signup');
let indexRouter = require('./routes/index');
let adminRouter = require('./routes/admin');
let adminuserRouter = require('./routes/admin-user');
let index2Router = require('./routes/index2');
let personalSpaceRouter = require('./routes/personalSpace');
let shareAreaRouter = require('./routes/shareArea');
let testRouter = require('./routes/test');
let videoRouter = require('./routes/video');
let diaryRouter = require('./routes/diary');
let imageRouter = require('./routes/image');
let messageRouter = require('./routes/message');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/*
app.engine('admin', require('ejs-mate'));
app.locals._layoutFile = 'adminmuban';
*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req,res,next) {
    req.cookies = new Cookies(req,res);
    //解析登陆用户的cookies信息
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        try {//给req一个全局属性
            req.userInfo=JSON.parse(req.cookies.get('userInfo'));
            //获取当前登陆用户的类型
            mongodb.user.find({id:req.userInfo._id},(err,data)=>{
                if(!err){
                    req.userInfo.isAdmin = Boolean(data.isAdmin);
                }else{
                    throw err;
                }


            })
        }catch (e) {

        }
    }
    /* console.log(typeof  req.cookies.get('userInfo'));*/
    next();
})
app.use('/filePublish', filePublishRouter);
app.use('/message', messageRouter);
app.use('/userSet', userSetRouter);
app.use('/userPage', userPageRouter);
app.use('/shareAreaGoods', shareAreaGoodsRouter);
app.use('/shareAreaDate', shareAreaDateRouter);
app.use('/sharevideoGoods', sharevideoGoodsRouter);
app.use('/sharevideoDate', sharevideoDateRouter);
app.use('/sharediaryGoods', sharediaryGoodsRouter);
app.use('/sharediaryDate', sharediaryDateRouter);
app.use('/share', shareRouter);
app.use('/api', apiRouter);
app.use('/main', mainRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/index', indexRouter);
app.use('/admin', adminRouter);
app.use('/admin-user', adminuserRouter);
app.use('/index2', index2Router);
app.use('/personalSpace',  personalSpaceRouter);
app.use('/shareArea',  shareAreaRouter);
app.use('/test',  testRouter);
app.use('/video',  videoRouter);
app.use('/diary', diaryRouter);
app.use('/image', imageRouter);
app.use('/userPage', userPageRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
