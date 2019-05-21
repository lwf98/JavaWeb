let express = require('express');
let router = express.Router({});
let mongodb2 = require("../mongose/imgmongodb");
/* GET home page. */
router.get('/', function(req, res, next) {
    mongodb.user.find({name:res.userInfo.username},(err,data)=>{
        if(!err){
            console.log(res.userInfo.username);
            res.render('admin-user',{
                user:data
            });
        }else{
            throw err;
        }
    })
       res.end("123");
});

module.exports = router;