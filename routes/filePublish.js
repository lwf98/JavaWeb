let express = require('express');
let router = express.Router({});
let mongodb = require("../mongose/03-mongooseCURD");
/* GET home page. */
//上传图片页面路由
router.get('/', function(req, res, next) {
    mongodb.user.find({name:req.userInfo.username},(err,data)=>{
        if(!err){
            res.render('filePublish-img', { user: data });
        }else{
            console.log('上传图片页面错了')
        }
    })


});


//上传视频页面路由
router.get('/filePublish-video', function(req, res, next) {
    mongodb.user.find({name:req.userInfo.username},(err,data)=>{
        if(!err){
            res.render('filePublish-video', { user: data });
        }else{
            console.log('上传图片页面错了')
        }
    })
});

//上传日记页面路由
router.get('/filePublish-article', function(req, res, next) {
    mongodb.user.find({name:req.userInfo.username},(err,data)=>{
        if(!err){
            res.render('filePublish-article', { user: data });
        }else{
            console.log('上传图片页面错了')
        }
    })
});

module.exports = router;