let express = require('express');
let router = express.Router({});
let mongodb18 = require("../mongose/imagemessage");

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('message', { title: 'Express' });
});


router.get('/message-liked', function(req, res, next) {
    mongodb18.imagemessage.find({bname:req.userInfo.username},(err,data)=>{
        if(!err){
            res.render('message-liked', { message: data });
        }else{

        }
    })

});


router.get('/message-private', function(req, res, next) {

    res.render('message-private', { title: 'Express' });
});

module.exports = router;