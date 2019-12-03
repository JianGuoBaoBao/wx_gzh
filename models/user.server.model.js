const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    uid:Number,
    username:String,
    createTime:Date,
    lastLogin:Date,
})
mongoose.model("User",UserSchema);