let express = require('express');
let router = express.Router({});
let mongodb2 = require("../mongose/imgmongodb");
let mongodb = require("../mongose/03-mongooseCURD");
/* GET home page. */
//私有个人区图片路由
router.get('/', function(req, res, next) {
    mongodb2.image.find({name:req.userInfo.username},(err,data)=>{
        if(!err){
            mongodb.user.find({name:req.userInfo.username},(err,data2)=>{
                res.render('userPage-img',{
                    image:data,
                    user:data2
                });
            })
        }else{
            throw err;
        }
    }).sort({date:-1})


});


module.exports = router;