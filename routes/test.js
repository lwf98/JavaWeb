let express = require('express');
let app = express();
let router = express.Router({});
let formidable = require('formidable');
let mongodb = require("../mongose/03-mongooseCURD");
let mongodb2 = require("../mongose/imgmongodb");
let mongodb3 = require("../mongose/videomongodb");
let mongodb7 = require("../mongose/commentmongodb");
let mongodb4 = require("../mongose/diarymongodb");
let mongodb14 = require("../mongose/fangwenliang");
let mongodb11 = require("../mongose/videocomment");
let mongodb9 = require("../mongose/imggoods");
let bodyParser = require("body-parser");
let mongodb12 = require("../mongose/diarygoods");
let mongodb13 = require("../mongose/diarycomment");
app.use(bodyParser.urlencoded({extended: true}));
/* GE
/* GET home page. */
//私有主页
/* GET home page. */
router.get('/', function(req, res, next) {
    let name = req.userInfo.username;
    mongodb.user.find({name:name},(err,data)=>{
        if(!err){
            mongodb2.image.find({name:name},(err,data2)=>{
                if(!err){
                    mongodb3.video.find({uname:name},(err,data3)=>{
                        if(!err){
                            mongodb4.diary.find({name:name},(err,data4)=>{
                                if(!err){                              
                                            res.render('test',{
                                                user:data,
                                                image:data2,
                                                video:data3,
                                                diary:data4,
                                            
                                            });
                                     
                                }else{
                                    console.log('查日记表时出错')
                                }
                            }).limit(4).sort({date:-1})
                        }else{
                            console.log('查视频表时出错')
                        }
                    }).limit(3).sort({date:-1})
                }else{
                    console.log('查图片表时出错')
                }
            }).limit(4).sort({date:-1})
        }else{
            console.log('查个人表时出错了');
        }
    }).limit(4).sort({date:-1})

});
//图片路由
router.post('/iyz', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "../public/images";
    form.keepExtensions = true;
    form.multiples = true;
    var i ;
      console.log("haha")
    form.parse(req, function(err, fields, files) {
        mongodb.user.find({name:req.userInfo.username},(err,data3)=>{
            if(!err){
                let time = new Date();
                function tr(str){
                    if(str.length==1){
                        return 0 + str;
                    }else{
                        return str
                    }
                }
                if (files.img.length > 0) {
                    for (i = 0; i < files.img.length; i++) {
                        mongodb2.image.create({
                            src: (files.img[i].path.replace("../public", "")),
                            uimg:req.userInfo.uimg,
                            id: req.userInfo._id,
                            name: req.userInfo.username,
                            date:tr(time.getFullYear().toString())+"-"+tr((time.getMonth()+1).toString())+"-"+tr(time.getDate().toString())+" "+tr(time.getHours().toString())+":"+tr(time.getMinutes().toString())+":"+tr(time.getSeconds().toString()),
                            Nickname:data3[0].Nickname
                        }, (err) => {
                            if (!err) {
                                console.log("修改成功");
                            } else {
                                throw err;
                            }
                        });

                    }
                } else {
                    let time = new Date();
                    function tr(str){
                        if(str.length===1){
                            return 0 + str;
                        }else{
                            return str
                        }
                    }
                    mongodb2.image.create({
                        src: (files.img.path.replace("../public", "")),
                        id: req.userInfo._id,
                        name: req.userInfo.username,
                        uimg:req.userInfo.uimg,
                        date:tr(time.getFullYear().toString())+"-"+tr((time.getMonth()+1).toString())+"-"+tr(time.getDate().toString())+" "+tr(time.getHours().toString())+":"+tr(time.getMinutes().toString())+":"+tr(time.getSeconds().toString()),
                    }, (err) => {
                        if (!err) {
                            console.log("修改成功");
                        } else {
                            throw err;
                        }
                    });
                }

            }else{

            }
        })
    });
    res.redirect("/image");
});

//视频路由
router.post('/vyz', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "../public/video";
    form.keepExtensions = true;
    form.multiples = false;
    var i ;
    form.parse(req, function(err, fields, files) {
        var time = new Date();
        function tr(str){
            if(str.length===1){
                return 0 + str;
            }else{
                return str
            }
        }
        mongodb.user.find({name:req.userInfo.username},(err,data3)=>{
            if(!err){
                mongodb3.video.create({
                    src: (files.video.path.replace("../public", "")),
                    title:fields.videoTitle,
                    date:tr(time.getFullYear().toString())+"-"+tr((time.getMonth()+1).toString())+"-"+tr(time.getDate().toString())+" "+tr(time.getHours().toString())+":"+tr(time.getMinutes().toString())+":"+tr(time.getSeconds().toString()),
                    uid: req.userInfo._id,
                    uname: req.userInfo.username,
                    uimg:req.userInfo.uimg,
                    Nickname:data3[0].Nickname
                }, (err) => {
                    if (!err) {
                        console.log("修改成功");
                    } else {
                        throw err;
                    }
                });

            }else{
                console.log('上传视频时出错了');
            }
        })



        res.redirect("/video");

    });

});

//完善资料路由
router.get('/personalData', function(req, res, next) {

    mongodb.user.find({_id:req.userInfo._id},(err,data)=>{
        if(!err){
            res.render('personalData', { info: data });
        }else{
            throw  err;
        }
    })

});

//修改资料路由
router.post('/setData', function(req, res, next) {
        var time = new Date();
        var form = new formidable.IncomingForm();
        form.uploadDir = "../public/images";
        form.keepExtensions = true;
        form.multiples = true;
        console.log("haha");
        form.parse(req, function (err, fields, files) {
           var bg = (files.bgImg.path).toString().indexOf('.',5);
           var he = (files.head.path).toString().indexOf('.',5);
            //两个都设置了
            if(bg != -1 && he != -1){

                mongodb.user.update({name:req.userInfo.username},{$set:{Nickname: fields.nickName,sex:fields.gender,birth:fields.birthday,email:fields.email,phone:fields.phoneNum,qianming:fields.intro,Bgimg: files.bgImg.path.replace("/public",""),uimg:files.head.path.replace("/public","")}}, (err) => {
                    if (!err) {
                        console.log("信息修改成功");
                    } else {
                        throw err;
                    }
                });


            }else if(bg != -1){//只设置背景

                mongodb.user.update({name:req.userInfo.username},{$set:{Nickname: fields.nickName,sex:fields.gender,birth:fields.birthday,email:fields.email,phone:fields.phoneNum,qianming:fields.intro,Bgimg: files.bgImg.path.replace("/public",""),}}, (err) => {
                    if (!err) {
                        console.log("信息修改成功");
                    } else {
                        throw err;
                    }
                });

            }else if(he != -1){//只设置背景头像

                mongodb.user.update({name:req.userInfo.username},{$set:{Nickname: fields.nickName,sex:fields.gender,birth:fields.birthday,email:fields.email,phone:fields.phoneNum,qianming:fields.intro,uimg:files.head.path.replace("/public","")}}, (err) => {
                    if (!err) {
                        console.log("信息修改成功");
                    } else {
                        throw err;
                    }
                });

            }else{//都没设置

                mongodb.user.update({name:req.userInfo.username},{$set:{Nickname: fields.nickName,sex:fields.gender,birth:fields.birthday,email:fields.email,phone:fields.phoneNum,qianming:fields.intro,}}, (err) => {
                    if (!err) {
                        console.log("信息修改成功");
                    } else {
                        throw err;
                    }
                });

            }

        });
       res.redirect('/userSet')
});

router.use(function (req,res,next) {
    news = {
        message:"123",

    }
    next();
})
//删除图片
router.post('/deleteImg', function(req, res, next) {
    var body  = req.body;
    res.json(news);
    mongodb2.image.remove({src:body.src},(err,data)=>{
        if(!err){
            console.log("删除成功");
            console.log(data);
        }else{
            throw err;
        }
    })
});

//删除视频
router.post('/deletevideo', function(req, res, next) {
    var body  = req.body;
    mongodb3.video.remove({src:body.src},(err,data)=>{
        if(!err){
            console.log("删除成功");
        }else{
            throw err;
        }
    })
});

//删除日记
router.post('/deleteDiary', function(req, res, next) {
    var body  = req.body;
   mongodb4.diary.remove({jianjie:body.jianjie},(err,data)=>{
        if(!err){
            console.log("删除成功");
        }else{
            throw err;
        }
    })
});

//创建一个图片comment记录
router.post('/comment', function(req, res, next) {
    let time = new Date();
    function tr(str){
        if(str.length===1){
            return 0 + str;
        }else{
            return str
        }
    }
    let body  = req.body;
    mongodb.user.find({name:req.userInfo.username},(err,data2)=>{
        if(!err){
            mongodb7.comment.create({src:body.src,id:req.userInfo._id,name:req.userInfo.username,views:body.views,date:tr(time.getFullYear().toString())+"-"+tr((time.getMonth()+1).toString())+"-"+tr(time.getDate().toString())+" "+tr(time.getHours().toString())+":"+tr(time.getMinutes().toString())+":"+tr(time.getSeconds().toString()),uimg:req.userInfo.uimg,Nickname: data2[0].Nickname},(err,data)=>{
                if(!err){
                    //该图片评落数加1
                    mongodb2.image.find({src:body.src},{views:1},(err,date4)=>{
                        if(!err){
                            var x = date4[0].views;
                            mongodb2.image.update({src:body.src},{$set:{views: x + 1}},(err)=>{
                                if(!err){
                                    res.json(req.userInfo);
                                }else{
                                    console.log('views点赞更新失败')
                                }
                            })
                        }else {
                            throw err;
                        }
                    })

                }else{
                    throw err;
                }
            })

        }else{

        }
    })

});

//删除一个图片comment记录
router.post('/commentDown', function(req, res, next) {
    let body  = req.body;
    mongodb7.comment.remove({name:req.userInfo.username,date:body.date},(err,data2)=>{
      if(!err){
          console.log('图片评论删除成功')
          mongodb2.image.find({src:body.src},{views:1},(err,date4)=>{
              if(!err){
                  var x = date4[0].views;
                  mongodb2.image.update({src:body.src},{$set:{views: x - 1}},(err)=>{
                      if(!err){
                          res.json(req.userInfo);
                          console.log('views更新成功')
                      }else{
                          console.log('views点赞更新失败')
                      }
                  })
              }else {
                  throw err;
              }
          })
      }else{
          console.log('删除图片评论出错了')
      }
    })
});

//删除一个视频comment记录
router.post('/videoCommentDown', function(req, res, next) {
    let body  = req.body;
    mongodb11.videocomment.remove({name:req.userInfo.username,date:body.date},(err,data2)=>{
        if(!err){
            mongodb3.video.find({src:body.src},{views:1},(err,date4)=>{
                if(!err){
                    var x = date4[0].views;
                    mongodb3.video.update({src:body.src},{$set:{views: x - 1}},(err)=>{
                        if(!err){
                            res.json(req.userInfo);
                        }else{
                            console.log('views点赞更新失败')
                        }
                    })
                }else {
                    throw err;
                }
            })

        }else{
            console.log('删除图片评论出错了')
        }
    })
});

//删除一个日记comment记录
router.post('/diaryCommentDown', function(req, res, next) {
    let body  = req.body;
    mongodb13.diarycomment.remove({src:body.src,name:req.userInfo.username,date:body.date},(err,data2)=>{
        if(!err){
            console.log('视频评论删除成功')
            mongodb4.diary.find({jianjie:body.title},{views:1},(err,data4)=>{
                if(!err){
                    var x = data4[0].views;
                    mongodb4.diary.update({jianjie:body.title},{$set:{views: x - 1}},(err)=>{
                        if(!err){
                            res.json(req.userInfo);
                        }else{
                            console.log('views点赞更新失败')
                        }
                    })
                }else {
                    throw err;
                }
            })

        }else{
            console.log('删除图片评论出错了')
        }
    })


});

//判断图片评论是不是自己的
router.post('/comment-panduan', function(req, res, next) {
    let body = req.body;
    mongodb7.comment.find({src:body.src,name:req.userInfo.username},(err,data)=>{
        if(!err){
           mongodb7.comment.find({src:body.src},(err,data2)=>{
              if(!err){
                  data.splice(0,0,req.userInfo.username);
                  data.splice(1,0,data2.length);
                  res.json(data)
              }else{

              }
           })
        }else{
            throw err;
        }
    })

});

//判断我有没有点赞这张图片
router.post('/img-goods', function(req, res, next) {
    let body = req.body;
    mongodb9.imggoods.find({src:body.src,name:req.userInfo.username},(err,data)=>{
        if(!err){
           if(data.length!=0){
               res.json({like:true})
           }else{
               res.json({like:false})
           }
        }else{
            throw err;
        }
    })

});

//创建一个视频comment记录
router.post('/videocomment', function(req, res, next) {
    let time = new Date();
    let body  = req.body;
    function tr(str){
        if(str.length===1){
            return 0 + str;
        }else{
            return str
        }
    }
    mongodb.user.find({name:req.userInfo.username},(err,data5)=>{
        if(!err){
            mongodb11.videocomment.create({src:body.src,id:req.userInfo._id,name:req.userInfo.username,views:body.views,date:tr(time.getFullYear().toString())+"-"+tr((time.getMonth()+1).toString())+"-"+tr(time.getDate().toString())+" "+tr(time.getHours().toString())+":"+tr(time.getMinutes().toString())+":"+tr(time.getSeconds().toString()),uimg:req.userInfo.uimg,Nickname:data5[0].Nickname},(err,data)=>{
                if(!err){
                    console.log('插入一条评落成功了');
                    //该图片评落数加1
                    mongodb3.video.find({src:body.src},{views:1},(err,date4)=>{
                        if(!err){
                            var x = date4[0].views;
                            mongodb3.video.update({src:body.src},{$set:{views: x + 1}},(err)=>{
                                if(!err){
                                    res.json(req.userInfo);
                                    console.log('views更新成功')
                                }else{
                                    console.log('views点赞更新失败')
                                }
                            })
                        }else {
                            throw err;
                        }
                    })



                }else{
                    throw err;
                }
            })



        }else{

        }
    })


});

//判断视频评论是不是自己的
router.post('/videocomment-panduan', function(req, res, next) {
    let body = req.body;
    mongodb11.videocomment.find({src:body.src,name:req.userInfo.username},(err,data)=>{
        if(!err){
            mongodb11.videocomment.find({src:body.src},(err,data2)=>{
                if(!err){
                    data.splice(0,0,req.userInfo.username);
                    data.splice(1,0,data2.length);
                    res.json(data)
                }else{

                }
            })

        }else{
            throw err;
        }
    })

});

//创建一个日记comment记录
router.post('/diarycomment', function(req, res, next) {
    let time = new Date();
    let body  = req.body;
    function tr(str){
        if(str.length===1){
            return 0 + str;
        }else{
            return str
        }
    }
    mongodb.user.find({name:req.userInfo.username},(err,data3)=>{
        if(!err){
            mongodb13.diarycomment.create({src:body.src,id:req.userInfo._id,name:req.userInfo.username,views:body.views,date:tr(time.getFullYear().toString())+"-"+tr((time.getMonth()+1).toString())+"-"+tr(time.getDate().toString())+" "+tr(time.getHours().toString())+":"+tr(time.getMinutes().toString())+":"+tr(time.getSeconds().toString()),uimg:req.userInfo.uimg,Nickname:data3[0].Nickname,title:body.title,date2:body.date},(err,data)=>{
                if(!err){
                    console.log('插入一条评落成功了');
                    //该图片评落数加1
                    mongodb4.diary.find({img:body.src},{views:1},(err,date4)=>{
                        if(!err){
                            var x = date4[0].views;
                            mongodb4.diary.update({img:body.src},{$set:{views: x + 1}},(err)=>{
                                if(!err){
                                    res.json(req.userInfo);
                                    console.log('views更新成功')
                                }else{
                                    console.log('views点赞更新失败')
                                }
                            })
                        }else {
                            throw err;
                        }
                    })
                }else{
                    throw err;
                }
            })
        }else{
        }
    })
});

//判断日记评论是不是自己的
router.post('/diarycomment-panduan', function(req, res, next) {
    let body = req.body;
    mongodb13.diarycomment.find({title:body.title,date:body.date,name:req.userInfo.username},(err,data)=>{
        if(!err){
            mongodb13.diarycomment.find({title:body.title,date2:body.date},(err,data2)=>{
                if(!err){
                    data.splice(0,0,req.userInfo.username);
                    data.splice(1,0,data2.length);
                    res.json(data)
                }else{

                }
            })

        }else{
            throw err;
        }
    })

});

module.exports = router;