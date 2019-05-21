let express = require('express');
let router = express.Router({});
let mongodb = require("../mongose/03-mongooseCURD");
let mongodb2 = require("../mongose/imgmongodb");
let mongodb3 = require("../mongose/videomongodb");
let mongodb6 = require("../mongose/publicImgMongodb");
let mongodb7 = require("../mongose/commentmongodb");
let mongodb8 = require("../mongose/publicDiaryMongodb");
let mongodb4 = require("../mongose/diarymongodb");
let mongodb9 = require("../mongose/imggoods");
let mongodb10 = require("../mongose/videogoods");
let mongodb11 = require("../mongose/videocomment");
let mongodb12 = require("../mongose/diarygoods");
let mongodb13 = require("../mongose/diarycomment");
let mongodb18 = require("../mongose/imagemessage");
let url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
    var obj = req.body;
});


//分享界面点开图片详情路由
router.get('/image', function(req, res, next) {
    let myUrl = url.parse(req.url,true);//讲地址变为对象
    let query = myUrl.query;//地址的提交部分
    let src = query.src;
    mongodb2.image.find({src:src},(err,data)=>{
        if(!err){
           mongodb7.comment.find({src:src},(err,data2)=>{
               if(!err){
                   mongodb.user.find({name:req.userInfo.username},(err,data5)=>{
                       if(!err){

                //点击查看之后liulan量加1
                 mongodb2.image.find({src:src},{liulan: 1},(err,date3)=>{
                     if(!err){
                     var a =  date3[0].liulan
                         mongodb2.image.update({src:src},{$set:{liulan: a + 1}},(err)=>{
                             if(!err){
                                 console.log('浏览量更新成功')
                             }else{
                                 console.log('浏览量更新失败')
                             }
                         })
                     }else {
                         throw err;
                     }
                 }).sort({date:-1})
                  res.render('image',{
                      image:data,
                      comment:data2,
                      user:data5
                  });

                       }else{
                           throw err;
                       }
                   })

               }else {
                   throw err;
               }
           }).sort({date:-1})
        }else{
            throw err;
        }
    })

});


//图片点赞表
router.post('/imggoods', function(req, res, next) {
   var obj = req.body;
   console.log(obj);
   mongodb9.imggoods.find({src:obj.src,name:req.userInfo.username},(err,data)=>{
       if(!err){
           if(data.length!==0){
               console.log('您已经点赞过了');
               mongodb9.imggoods.remove({src:obj.src,name:req.userInfo.username},(err,data2)=>{
                   if(!err){
                       //插入点赞表成功后，在图片表中goods加1
                       mongodb2.image.find({src:obj.src},{goods: 1},(err,date3)=>{
                           if(!err){
                               var a =  date3[0].goods
                               mongodb2.image.update({src:obj.src},{$set:{goods: a - 1}},(err)=>{
                                   if(!err){
                                       console.log('点赞更新成功')
                                   }else{
                                       console.log('点赞更新失败')
                                   }
                               })
                           }else {
                               throw err;
                           }
                       })
                   }else{
                       throw  err;
                   }
               })
           }else {
               //没有就插入
               mongodb9.imggoods.create({src:obj.src,name:req.userInfo.username},(err,data2)=>{
                   if(!err){
                      //插入点赞表成功后，在图片表中goods加1

                       mongodb2.image.find({src:obj.src},{goods: 1},(err,date3)=>{
                           if(!err){
                               var a =  date3[0].goods
                               mongodb2.image.update({src:obj.src},{$set:{goods: a + 1}},(err)=>{
                                   if(!err){
                                       console.log('点赞更新成功')
                                   }else{
                                       console.log('点赞更新失败')
                                   }
                               })
                           }else {
                               throw err;
                           }
                       })
                   }else{
                       throw  err;
                   }
               })
           }
       }else{
           throw err;
       }
   })

    mongodb18.imagemessage.find({src:obj.src,zname:req.userInfo.username},(err,data2)=>{
        if(!err){
            
            if(data2.length == 0){

                let time = new Date();
                function tr(str){
                    if(str.length==1){
                        return 0 + str;
                    }else{
                        return str
                    }
                }
                mongodb18.imagemessage.create({src:obj.src,zname:req.userInfo.username,bname:obj.keys,date:tr(time.getFullYear().toString())+"-"+tr((time.getMonth()+1).toString())+"-"+tr(time.getDate().toString())+" "+tr(time.getHours().toString())+":"+tr(time.getMinutes().toString())+":"+tr(time.getSeconds().toString()),},(err,data)=>{
                    if(!err){
                        console.log('bingo')
                    }else{
                        throw err;
                    }
                })

            }
        }else{

        }
    })






});

//图片点赞判断
router.post('/img-goods', function(req, res, next) {
    var obj = req.body;
    mongodb9.imggoods.find({name:req.userInfo.username},(err,data)=>{
        if(!err){
            data.slice(0,0,data.length);
            res.json(data);
        }else{
            throw err;
        }
    })

});


//视频点赞表
router.post('/videogoods', function(req, res, next) {
    var obj = req.body;
    mongodb10.videogoods.find({src:obj.src,name:req.userInfo.username},(err,data)=>{
        if(!err){
            if(data.length!==0){
                mongodb10.videogoods.remove({src:obj.src,name:req.userInfo.username},(err,data2)=>{
                    if(!err){
                        //再次点赞后，在图片表中goods减1
                        mongodb3.video.find({src:obj.src},{goods: 1},(err,date3)=>{
                            if(!err){
                                var a =  date3[0].goods
                                mongodb3.video.update({src:obj.src},{$set:{goods: a - 1}},(err)=>{
                                    if(!err){
                                        console.log('视频点赞更新成功')
                                    }else{
                                        console.log('视频点赞更新失败')
                                    }
                                })
                            }else {
                                throw err;
                            }
                        })
                    }else{
                        throw  err;
                    }
                })
            }else {
                //没有就插入
                mongodb10.videogoods.create({src:obj.src,name:req.userInfo.username},(err,data2)=>{
                    if(!err){
                        //插入点赞表成功后，在图片表中goods加1
                        mongodb3.video.find({src:obj.src},{goods: 1},(err,date3)=>{
                            if(!err){
                                var a =  date3[0].goods
                                mongodb3.video.update({src:obj.src},{$set:{goods: a + 1}},(err)=>{
                                    if(!err){
                                        console.log('点赞更新成功')
                                    }else{
                                        console.log('点赞更新失败')
                                    }
                                })
                            }else {
                                throw err;
                            }
                        })
                    }else{
                        throw  err;
                    }
                })
            }
        }else{
            throw err;
        }
    })


});


//日记点赞表
router.post('/diarygoods', function(req, res, next) {
    var obj = req.body;
    mongodb12.diarygoods.find({title:obj.title,date:obj.date,name:req.userInfo.username},(err,data)=>{
        if(!err){
            if(data.length!==0){
                mongodb12.diarygoods.remove({title:obj.title,date:obj.date,name:req.userInfo.username},(err,data2)=>{
                    if(!err){
                        //再次点赞后，在图片表中goods减1
                        mongodb4.diary.find({jianjie:obj.title,data:obj.date},{goods: 1},(err,date3)=>{
                            if(!err){
                                var a =  date3[0].goods
                                mongodb4.diary.update({jianjie:obj.title,data:obj.date,},{$set:{goods: a - 1}},(err)=>{
                                    if(!err){
                                        console.log('取消日记点赞更新成功')
                                    }else{
                                        console.log('取消日记点赞更新失败')
                                    }
                                })
                            }else {
                                throw err;
                            }
                        })
                    }else{
                        throw  err;
                    }
                })
            }else {
                //没有就插入
                mongodb12.diarygoods.create({title:obj.title,date:obj.date,name:req.userInfo.username},(err,data2)=>{
                    if(!err){
                        //插入点赞表成功后，在图片表中goods加1
                        mongodb4.diary.find({jianjie:obj.title,data:obj.date},{goods: 1},(err,date3)=>{
                            if(!err){
                                var a =  date3[0].goods
                                mongodb4.diary.update({jianjie:obj.title,data:obj.date},{$set:{goods: a + 1}},(err)=>{
                                    if(!err){
                                        console.log('添加日记点赞更新成功')
                                    }else{
                                        console.log('添加日记点赞更新失败')
                                    }
                                })
                            }else {
                                throw err;
                            }
                        })
                    }else{
                        throw  err;
                    }
                })
            }
        }else{
            throw err;
        }
    })


});





//视频点赞判断
router.post('/video-goods', function(req, res, next) {
    var obj = req.body;
    mongodb10.videogoods.find({name:req.userInfo.username,src:obj.src},(err,data)=>{
        if(!err){
            if(data.length!==0){
                res.json({code:true})
            }else{
                res.json({code:false})
            }
        }else{
            throw err;
        }
    })


});


//日记点赞判断
router.post('/diary-goods', function(req, res, next) {
    var obj = req.body;
    mongodb12.diarygoods.find({name:req.userInfo.username,title:obj.title,date:obj.date},(err,data)=>{
        if(!err){
            if(data.length!==0){
                res.json({code:true})
            }else{
                res.json({code:false})
            }
        }else{
            throw err;
        }
    })


});




//分享界面视频路由
router.get('/share-video', function(req, res, next) {
    mongodb3.video.find({},(err,data)=>{
        if(!err){
            mongodb.user.find({_id:req.userInfo._id},(err,data2)=>{
                if(!err){
                    mongodb4.diary.find({},(err,data3)=>{
                        if(!err){
                            res.render('share-video',{
                                video:data,
                                user:data2,
                                diary:data3
                            });
                        }else{
                            throw err;
                        }

                    })

                }else{
                    throw err;
                }
            })
        }else{
            throw err;
        }
    }).sort({liulan:-1});

});



//分享界面点开视频详情路由
router.get('/video', function(req, res, next) {
    let myUrl = url.parse(req.url,true);//讲地址变为对象
    let query = myUrl.query;//地址的提交部分
    let src = query.src;
    mongodb3.video.find({src:src},(err,data)=>{
        if(!err){
            mongodb11.videocomment.find({src:src},(err,data2)=>{
                if(!err){
                    //点击查看之后liulan量加1
                    mongodb3.video.find({src:src},{liulan: 1},(err,date3)=>{
                        if(!err){
                            var a =  date3[0].liulan
                            mongodb3.video.update({src:src},{$set:{liulan: a + 1}},(err)=>{
                                if(!err){
                                    mongodb.user.find({name:req.userInfo.username},(err,data5)=>{
                                        if(!err){
                                            res.render('watchVideo',{
                                                video:data,
                                                videocomment:data2,
                                                user:data5
                                            });
                                        }else{

                                        }
                                    })

                                }else{
                                    console.log('视频浏览量更新失败')
                                }
                            })
                        }else {
                            throw err;
                        }
                    })
                }else {
                    throw err;
                }
            }).sort({date:-1})

        }else{
            throw err;
        }
    })

});


//分享界面日记路由
router.get('/share-diary', function(req, res, next) {
    mongodb4.diary.find({},(err,data)=>{
        if(!err){
            mongodb.user.find({_id:req.userInfo._id},(err,data2)=>{
                if(!err){
                            res.render('share-article',{
                                diary:data,
                                user:data2,
                            });
                }else{
                    throw err;
                }
            })
        }else{
            throw err;
        }
    }).sort({liulan:-1});

});



//分享界面点开日记详情路由
router.get('/diary', function(req, res, next) {
    let myUrl = url.parse(req.url,true);//讲地址变为对象
    let query = myUrl.query;//地址的提交部分
    let src = query.src;
    mongodb4.diary.find({img:src},(err,data)=>{
        if(!err){
            mongodb13.diarycomment.find({src:src},(err,data2)=>{
                if(!err){
                    //点击查看之后liulan量加1
                    mongodb4.diary.find({img:src},{liulan: 1},(err,date3)=>{
                        if(!err){
                            var a =  date3[0].liulan
                            mongodb4.diary.update({img:src},{$set:{liulan: a + 1}},(err)=>{
                                if(!err){
                                    mongodb.user.find({name:req.userInfo.username},(err,data3)=>{
                                        if(!err){
                                            res.render('watchArticle',{
                                                diary:data,
                                                diarycomment:data2,
                                                user:data3
                                            });
                                        }else{
                                            throw err;
                                        }
                                    })

                                }else{
                                    console.log('日记浏览量更新失败')
                                }
                            })
                        }else {
                            throw err;
                        }
                    })
                }else {
                    throw err;
                }
            }).sort({date:-1})

        }else{
            throw err;
        }
    })

});


module.exports = router;