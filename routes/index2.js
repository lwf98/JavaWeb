let express = require('express');
let router = express.Router({});
let mongodb = require("../mongose/03-mongooseCURD");
let mongodb2 = require("../mongose/imgmongodb");
let mongodb3 = require("../mongose/videomongodb");
let mongodb4 = require("../mongose/diarymongodb");
/* GET home page. */
router.get('/', function(req, res, next) {
        let name = req.userInfo.username;
        console.log(name);
        mongodb.user.find({name:name},(err,data)=>{
            if(!err){
                mongodb2.image.find({},(err,data2)=>{
                    if(!err){
                        mongodb3.video.find({},(err,data3)=>{
                            if(!err){
                                mongodb4.diary.find({},(err,data4)=>{
                                    if(!err){
                                        res.render('index2',{
                                            user:data,
                                            image:data2,
                                            video:data3,
                                            diary:data4
                                        });
                                    }else{
                                        throw data4
                                    }
                                }).sort({liulan:-1}).limit(6)

                            }else{
                                throw  err;
                            }

                        }).sort({liulan:-1}).limit(4)
                    }else{
                        throw err;
                    }
                }).sort({liulan:-1}).limit(6)
            }else{
                console.log('查个人表时出错了');
            }
        })
});






module.exports = router;