//1引入模块
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/user');

//2监听各种状态
let db = mongoose.connection;
db.on('error', ()=>{
    console.log("连接失败");
});
db.once('open', function() {
    console.log("连接成功");
});
db.once('close', function() {
    console.log("断开成功");
});

//3创建Schema(模式对象)
let Schema = mongoose.Schema;
let  publicImgSchema = new Schema({
    uid:String,
    uname:String,
    data:Date,
    uimg:{
        type:String,
        default:""
    },
    src:String,
    goods:Number,
    views:{
        type:String,
        default:"false"
    },
    vid:{
        type:String,
        default:""
    },
    vname:{
        type:String,
        default:""
    },
    vcontent:{
        type:String,
        default:""
    },
});


//4创建Model对象
exports.publicImg = mongoose.model("publicImg",publicImgSchema);



