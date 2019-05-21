let express = require('express');
let router = express.Router({});
let mongodb = require("../mongose/03-mongooseCURD");

/* GET home page. */
router.get('/', function(req, res, next) {
    mongodb.user.find({},(err,data)=>{
       if(!err){
           res.render('admin-user',{
               user:data
           });

       }else{
           throw err;
       }
    })

});

router.post('/uyz', function(req, res, next) {
           let obj = req.body;
           console.log(obj.uid);
           mongodb.user.remove({name:obj.uid},(err)=>{
               if(!err){
                   console.log("删除成功");
                   res.json(obj);
               }else{
                   console.log("删除失败");
               }
           })


});

module.exports = router;