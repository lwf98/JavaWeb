let express = require('express');
let router = express.Router({});
let mongodb = require("../mongose/03-mongooseCURD");
let mongodb3 = require("../mongose/videomongodb");
let mongodb4 = require("../mongose/diarymongodb");
/* GET home page. */
router.get('/', function(req, res, next) {
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
    }).sort({date:-1});

});

module.exports = router;