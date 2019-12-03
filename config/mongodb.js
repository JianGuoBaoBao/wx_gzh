const mongoose = require('mongoose');
const data = require('../config/data');

module.exports = function () {
    var db = mongoose.connect(data.mongodb,{useNewUrlParser:true},function (err) {
        if (err) {
            console.log("Connection Error:" +err);
        } else {
            console.log("Connection success!");
        }
    }); // 连接数据库
    return db;
};