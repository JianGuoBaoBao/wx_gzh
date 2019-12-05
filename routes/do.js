const pool = require('../config/mySqlpool');
const request = require('request');
const express = require('express');
const router = express.Router();
const data = require('../config/data');
/*GET*/
function requestGet(url){
    request.get(url,(err,res,body)=>{
        console.log(body);
    })
}
/*POST*/
function requestPost(url,data){
    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: data,
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // 请求成功的处理逻辑
        }
    });
}
/*创建自定义菜单路径*/
/*function createMenu() {
    const mUri = 'https://api.weixin.qq.com/cgi-bin' +
        '/menu/create?' +
        'access_token=ACCESS_TOKEN;'
}*/

/*发送模板消息*/
 router.get('/temp',(req,res,next)=>{
     console.log`********{do/temp}********`;
     pool.query('select * from access_token',(err,result)=>{
         const accessToken =result[0].access_token;
         const mbUri ='https://api.weixin.qq.com/cgi-bin' +
             '/message/template/send?access_token='+accessToken;
         const list = JSON.parse(JSON.stringify(data.tempData));
         console.log({accessToken,mbUri,list});
         requestPost(mbUri,list);
     });
});

/*获取微信ip*/
router.get('/ip',(req,res)=>{
    console.log`********{do/ip}*********`;
    pool.query('select * from access_token',(err,result)=>{
        const accessToken =result[0].access_token;
        const ipUri ='https://api.weixin.qq.com/cgi-bin' +
            '/getcallbackip?access_token='+accessToken;
        console.log({accessToken,ipUri});
        requestGet(ipUri);
    });
})

/*批量获取用户基本信息*/
router.get('/infos',(req,res)=> {
    console.log`********{do/info}*********`;
    pool.query('select * from access_token', (err, result) => {
        const accessToken = result[0].access_token;
        const infosUri = 'https://api.weixin.qq.com/cgi-bin' +
            '/user/info/batchget?access_token=' + accessToken;
        /*JSON.stringify是将对象转为JSON字符串，JSON.pare方法将字符串转为JSON对象*/
        const list = JSON.parse(JSON.stringify(data.userList));
        console.log({accessToken, infosUri,list});
        /*发送post请求*/
        requestPost(infosUri,list);
    });
});
/*新增永久图文素材*/
router.get('/sc',(req,res)=> {
    pool.query('select * from access_token', (err, result) => {
        const accessToken = result[0].access_token;
        const scUri = 'https://api.weixin.qq.com/cgi-bin' +
            '/umaterial/add_news?access_token=' + accessToken;
        /*JSON.stringify是将对象转为JSON字符串，JSON.pare方法将字符串转为JSON对象*/
        const list = JSON.parse(JSON.stringify(data.scData));
        console.log({accessToken, scUri, list});
        /*发送post请求*/
        requestPost(scUri, list);
    });
});


module.exports = router;
