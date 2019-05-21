let express = require('express');
let router = express.Router({});
let url = require("url")
let mongodb = require("../mongose/03-mongooseCURD");
let mongodb2 = require("../mongose/imgmongodb");
let mongodb3 = require("../mongose/videomongodb");
let mongodb4 = require("../mongose/diarymongodb");
let mongodb14 = require("../mongose/fangwenliang");
/* GET home page. */
router.get('/', function(req, res, next) {
   let obj = url.parse(req.url);
   let name = obj.query;
   console.log(name);
    mongodb14.fangwen.find({name:name},(err,data)=>{
        console.log(typeof data);
        if(data==""){
            mongodb14.fangwen.create({name:name},(err,data2)=>{
                if(!err){
                    console.log('插入访问量成功')
                }else{
                    console.log('插入访问量失败')
                }
            })
        }else{
          console.log('已经存在');
        }
    })

    mongodb.user.find({name:name},(err,data)=>{
        if(!err){
            mongodb2.image.find({name:name},(err,data2)=>{
                if(!err){
                    mongodb3.video.find({uname:name},(err,data3)=>{
                        if(!err){
                            mongodb4.diary.find({name:name},(err,data4)=>{
                                if(!err){
                                    mongodb14.fangwen.find({name:name},{num:1},(err,data5)=>{
                                        if(!err){
                                            var num = data5[0].num;
                                            mongodb14.fangwen.update({name:name},{$set:{num:num + 1}},(err)=>{
                                     if(!err){

                                        mongodb.user.find({name:req.userInfo.username},(err,data6)=>{
                                            if(!err){
                                                res.render('OtherUserPage',{
                                                    user:data,
                                                    image:data2,
                                                    video:data3,
                                                    diary:data4,
                                                    fangwen:data5,
                                                    myself:data6
                                                });
                                            }else{
                                                throw err;
                                            }
                                        })

                                     }else{
                                         console.log('访问量加1出错')
                                     }
                                            })
                                        }else{
                                            console.log('访问量表出错')
                                        }
                                    })


                                }else{
                                    console.log('查日记表时出错')
                                }
                            })
                        }else{
                            console.log('查视频表时出错')
                        }
                    })
                }else{
                    console.log('查图片表时出错')
                }
            })
        }else{
            console.log('查个人表时出错了');
        }
    })

});

module.exports = router;