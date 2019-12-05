/*
建立数据库连接
 */
const mongoose = require('mongoose')
const url = "mongodb://localhost:27017/runoob"
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Successful connection to "+url)
});

/*
建立数据库连接用 mongoose.Schema 插入数据
 */
const Schema = mongoose.Schema //schema 都会映射到一个 MongoDB collection
let user = {
    uid:Number,
    name:String,
    age:Number,
    date:{type:Date,default:Date.now()}
}
let userSchema = new Schema(user)
let User = mongoose.model('User', userSchema) //将schema编译为model构造函数



module.exports = {mongoose,User}