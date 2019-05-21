
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
let  userSchema = new Schema({
    name:String,
    Nickname:{
        type:String,
        default:'时光小印'
    },
    password:String,
    email:String,
    isAdmin:{
        type:Boolean,
        default:false
    },
    qianming:{
        type:String,
        default:"您暂时还未发表签名哦"
    },
    sex:{
        type:String,
        default:""
    },
    birth:{
        type:Date,
        default:new Date()
    },
    phone:{
        type:String,
        default:"您暂时还未修改电话"
    },
    weibo:{
        type:String,
        default:"您暂时还保存微博"
    },
    uimg:{
        type:String,
        default:"../images/cat.jpg"
    },
    Bgimg:{
        type:String,
        default:"../images/cat.jpg"
    },
    goods:{
        type:Number,
        default:0
    }
});


//4创建Model对象
exports.user = mongoose.model("user",userSchema);




/*
//5插入文档
user.create({
    name:"谢霆锋",
    password:40,
    email:"1990哈哈哈哈"
},(err)=>{
    if(!err){
        console.log("插入成功");
    }else{
        throw err;
    }
})




//增
personModel.create([
    {name:"谢霆锋", age:40, chat:"1990哈哈哈哈"},
    {name:"顾胜", age:24, chat:"顾胜真帅"},
    {name:"胡春雨", age:22, chat:"你是个好人"},
    {name:"张三", age:33, chat:"1990哈哈哈哈"}
],(err)=>{
    if(!err){
        console.log("插入成功");
    }else{
        throw err;
    }
})


//查/!*
personModel.find({name:"谢霆锋"},(err,data)=>{
    if(!err){
        console.log("查询成功");
        console.log(data);
    }else {
        throw  err;
    }
})


//改
personModel.update({name:"谢霆锋"},{$set:{age:20}},{multi:true},(err)=>{
    if (!err){
        console.log("修改成功");
    } else{
        throw err;
    }
});


//删
personModel.remove({name:"谢霆锋"},(err)=>{
    if(!err){
        console.log("删除成功");
    }else{
        throw  err;
    }
})*/
