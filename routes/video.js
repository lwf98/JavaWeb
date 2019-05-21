let express = require('express');
let router = express.Router({});
let mongodb3 = require("../mongose/videomongodb");
let mongodb = require("../mongose/03-mongooseCURD");
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('进入了')
    console.log(req.userInfo.username)
   mongodb3.video.find({uname:req.userInfo.username},(err,data)=>{
       console.log(data);
        if(!err){
        mongodb.user.find({name:req.userInfo.username},(err,data2)=>{
            if(!err){
                res.render('userPage-video',{
                    video:data,
                    user:data2
                });
            }else{
              console.log('个人视频错了')
            }
        })

        }else{
            throw err;
        }
    }).sort({date:-1})


});

module.exports = router;