let express = require('express');
let router = express.Router({});
let mongodb = require("../mongose/03-mongooseCURD");
/* GET home page. */
router.get('/', function(req, res, next) {
    mongodb.user.find({name:req.userInfo.username},(err,data3)=>{
        res.render('filePublish-img', { user: data3 });
    })

});

module.exports = router;