let express = require('express');
let router = express.Router({});
let mongodb = require("../mongose/03-mongooseCURD");
let responseData;
router.use(function (req,res,next) {
    responseData = {
        code:0,
        message:"",
        userInfo:null
    }
    next();
})


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login1', { title: 'Express' });
});

router.post('/lyz', function(req, res, next) {
    let obj = req.body;
    mongodb.user.findOne({name:obj.username,password:obj.password},(err,data)=>{
        if(!err){
            if(data){
                responseData.code=1;
                responseData.message="成功";
               responseData.userInfo = {
                    _id:data.id,
                    username:data.username,
                    uimg:data.uimg,
                }

                req.cookies.set('userInfo',JSON.stringify({
                    _id:data.id,
                    username:data.name,
                    uimg:data.uimg,

                }));
                res.json(responseData);
            }else {
                responseData.code=0;
                responseData.message="不成功";
                res.json(responseData);
            }
        }else{
            throw err;
        }
    })
});

module.exports = router;