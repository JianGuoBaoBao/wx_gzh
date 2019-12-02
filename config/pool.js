var mysql = require('mysql');
var DATABASE = "wechat";
var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    port:'3306',
    database: DATABASE,
    connectionLimit: 20
});

/*
var person={
    uname:'ceshi2',
    upwd:'123456',
    email:'789392@qq.com',
    phone:'1233444',
    avatar:'www.baidu.com',
    user_name:'测试2',
    gender:3
}

//可以传对象，没有传入的值默认为null
pool.query('update  xz_user set ? where uid=?',[person,5],(err,result)=>{
    if(err)throw err;
    console.log(result);
});
*/



//导出连接
module.exports=pool;
