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
let  imagemessageSchema = new Schema({
    src:String,
    bname:{
        type:String,
        default:''
    },
    zname:String,
    date:String
});


//4创建Model对象
exports.imagemessage = mongoose.model("imagemessage",imagemessageSchema);