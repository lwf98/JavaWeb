let express = require('express');
let router = express.Router({});
let mongodb = require("../mongose/03-mongooseCURD");
let mongodb2 = require("../mongose/imgmongodb");
let mongodb3 = require("../mongose/videomongodb");
let mongodb6 = require("../mongose/publicImgMongodb");
let mongodb7 = require("../mongose/commentmongodb");
let mongodb4 = require("../mongose/diarymongodb");
let url = require("url");
let http = require('http');
let path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {

    mongodb.user.find({},(err,data)=>{
        res.render('admin-user',{
            user:data
        })
    })

});



//前端显示图片的路由
router.get('/admin-img', function(req, res, next) {
    mongodb2.image.find({},(err,data)=>{
        if(!err){
            res.render('admin-img',{
                image:data
            });
        }else{
            throw err;
        }
    })
});


//前台显示日记页面的路由
router.get('/admin-diary', function(req, res, next) {
    mongodb4.diary.find({},(err,data)=>{
        if(!err){
           res.render('admin-diary',
                {
                    diary:data
                });
        }else{
            throw err;
        }
    }).limit(10)
});

//后台显示照片页面的路由
router.post('/admin-img', function(req, res, next) {
    var obj = req.body;
    var c = (Number(obj.skip)-1) * 10;
    var d = obj.limit;
    mongodb2.image.find({},(err,data)=>{
        if(!err){
            res.json(data)
        }else{
            throw err;
        }
    }).limit(10).skip((Number(obj.skip)-1) * 10)
});


//删除后台照片路由
router.get('/delete-img', function(req, res, next) {
    let myUrl = url.parse(req.url,true);//讲地址变为对象
    let query = myUrl.query;//地址的提交部分
    let a = query._id;
    mongodb2.image.remove({_id:a},(err,data)=>{
        if(!err){
            console.log("删除成功");
            res.json({info:'删除成功'})
        }else{
            throw err;
        }
    })
});


//后台显示日记数据路由
router.post('/admin-diary', function(req, res, next) {
    var obj = req.body;
    var c = (Number(obj.skip)-1) * 10;
    var d = obj.limit;
    mongodb4.diary.find({},(err,data)=>{
        if(!err){
            res.json(data)
        }else{
            throw err;
        }
    }).limit(10).skip((Number(obj.skip)-1) * 10)
});



//后台删除日记路由
router.get('/delete-diary', function(req, res, next) {
    let myUrl = url.parse(req.url,true);//讲地址变为对象
    let query = myUrl.query;//地址的提交部分
    let a = query._id;
       mongodb4.diary.remove({_id:a},(err,data)=>{
        if(!err){
            res.json({code:'删除成功'})
        }else{
            throw err;
        }
    })
});



//后台显示用户数据路由
/*router.post('/admin-user', function(req, res, next) {
    /!*var obj = req.body;
    var c = (Number(obj.skip)-1) * 10;
    var d = obj.limit;
    console.log(c)
    console.log(d)*!/
    mongodb.user.find({},(err,data)=>{
        if(!err){
          res.json(data)
        }else{
            throw err;
        }
    })
});*/

router.post('/admin-user2', function(req, res, next) {
    var obj = req.body;
    var c = (Number(obj.skip)-1) * 10;
    var d = obj.limit;
    console.log(c)
    console.log(d)
    mongodb.user.find({},(err,data)=>{
        if(!err){
            res.json(data)
        }else{
            throw err;
        }
    }).limit(10).skip((Number(obj.skip)-1) * 10)
});



//删除后台用户路由
router.get('/delete-user', function(req, res, next) {
    let myUrl = url.parse(req.url,true);//讲地址变为对象
    let query = myUrl.query;//地址的提交部分
    let a = query._id;
    mongodb.user.remove({_id:a},(err,data)=>{
        if(!err){
            console.log("删除成功")
            /*mongodb.user.find({},(err,data)=>{
                if(!err){
                    res.json(data)

                }else{
                    throw err;
                }
            })*/
        }else{
            throw err;
        }
    })
});


//前端显示视频的路由
router.get('/admin-video', function(req, res, next) {
    console.log('进入前端显示视频路由了')
    mongodb3.video.find({},(err,data)=>{
        if(!err){
            console.log(data);
            res.render('admin-video',{
                video:data
            });
        }else{
            throw err;
        }
    })
});


//后台显示视频数据路由
router.post('/admin-video', function(req, res, next) {
    var obj = req.body;
    var c = (Number(obj.skip)-1) * 10;
    var d = obj.limit;
    mongodb3.video.find({},(err,data)=>{
        if(!err){
            res.json(data)
        }else{
            throw err;
        }
    }).limit(10).skip((Number(obj.skip)-1) * 10)
});

//删除后台视频路由
router.get('/delete-video', function(req, res, next) {
    let myUrl = url.parse(req.url,true);//讲地址变为对象
    let query = myUrl.query;//地址的提交部分
    let a = query._id;
    mongodb3.video.remove({_id:a},(err,data)=>{
        if(!err){
            res.json(data)
        }else{
            throw err;
        }
    })
});
module.exports = router;