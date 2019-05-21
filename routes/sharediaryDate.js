let express = require('express');
let router = express.Router({});
let mongodb = require("../mongose/03-mongooseCURD");
let mongodb4 = require("../mongose/diarymongodb")
/* GET home page. */
router.get('/', function(req, res, next) {

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
    }).sort({data:-1});

});

module.exports = router;