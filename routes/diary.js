let express = require('express');
let app = express();
let router = express.Router({});
let mongodb4 = require("../mongose/diarymongodb");
let mongodb5 = require("../mongose/dtumongodb");
let mongodb = require("../mongose/03-mongooseCURD");
let formidable = require('formidable');
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
/* GET home page. */
router.get('/', function(req, res, next) {
    mongodb4.diary.find({name:req.userInfo.username},(err,data)=>{
        if(!err){
            mongodb.user.find({name:req.userInfo.username},(err,data3)=>{
                res.render('userPage-article', { diary: data,user : data3 });
            })
        }else{
            throw err;
        }
    }).sort({data:-1})
});

//上传日记
router.post('/ryz', function(req, res, next) {
    var time = new Date();
    function tr(str){
        if(str.length==1){
            return 0 + str;
        }else{
            return str
        }
    }
    var form = new formidable.IncomingForm();
    form.uploadDir = "../public/images";
    form.keepExtensions = true;
    form.multiples = false;
    form.parse(req, function (err, fields, files) {
        mongodb.user.find({name:req.userInfo.username},(err,data3)=>{
            if(!err){
                mongodb4.diary.create({id: req.userInfo._id,name:req.userInfo.username, data: tr(time.getFullYear().toString())+"-"+tr((time.getMonth()+1).toString())+"-"+tr(time.getDate().toString())+" "+tr(time.getHours().toString())+":"+tr(time.getMinutes().toString())+":"+tr(time.getSeconds().toString()), jianjie: fields.jianjie, content: fields.content,img: files.img.path.replace("../public",""),uimg:req.userInfo.uimg,Nickname:data3[0].Nickname}, (err) => {
                    if (!err) {
                        console.log("diary插入成功");
                    } else {
                        throw err;
                    }
                });
            }else{
                console.log('上传日记出错了');
            }
        })



    });
    res.redirect("/diary");
});


//删除日记
router.post('/deleteDiary', function(req, res, next) {
    var body = req.body;
    console.log(body);
    mongodb4.diary.remove({img:body.img},(err)=>{
        if(!err){
            console.log("删除成功");
        }else{
            throw err;
        }
    })
});

module.exports = router;