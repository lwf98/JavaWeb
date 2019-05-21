let express = require('express');
let router = express.Router({});
let mongodb2 = require("../mongose/imgmongodb");
let mongodb = require("../mongose/03-mongooseCURD");
let mongodb4 = require("../mongose/diarymongodb")
/* GET home page. */
router.get('/', function(req, res, next) {
    mongodb2.image.find({},(err,data)=>{
        if(!err){
          mongodb.user.find({_id:req.userInfo._id},(err,data2)=>{
              if(!err){
                  mongodb4.diary.find({},(err,data3)=>{
                      if(!err){
                          res.render('shareArea',{
                              image:data,
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




module.exports = router;