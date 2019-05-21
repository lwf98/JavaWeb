let express = require('express');
let router = express.Router({});
let mongodb = require("../mongose/03-mongooseCURD");
/* GET home page. */
router.get('/', function(req, res, next) {
    mongodb.user.find({name:req.userInfo.username},(err,data)=>{
        console.log(data);
        res.render('userSet', { user: data });
    })


});

module.exports = router;