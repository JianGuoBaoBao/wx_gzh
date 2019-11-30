var express = require('express');
var router = express.Router();
/*首次接入微信，验证url是否畅通*/
//这里的路径设为wx,这里的token必须与微信后台一致
router.get('/',function(req,res,next){
    var token ='token';
    //获取微信服务器发来的参数
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var echostr = req.query.echostr;
    var nonce = req.query.nonce;

    //按字典进行排序
    var oriArray = [nonce,timestamp,token];
    oriArray.sort();
    //sha1加密
    var original = oriArray.join('');
    var jsSHA = require('jssha');//加密模块，自己添加
    var shaObj = new jsSHA("SHA-1",'TEXT');
    shaObj.update(original);
    var scyptoString = shaObj.getHash('HEX');
    console.log(signature);
    console.log(scyptoString);
    //判断签名是否相同
    if(signature == scyptoString){
        console.log('true');
        //验证成功
        res.status(200).send(echostr);
    }else{
        console.log('false');
        res.send('error');
        return false;
    }
    next();
});



/*微信模块*/
const wechat = require('wechat');
router.use('/', wechat('token').text(function (message, req, res, next) {
    /*接收文本时执行的操作*/
        if(message.Content==='tp'){
            res.reply({
                type:'image',
                content: {
                    mediaId:''
            }
            });
        }else if(message.Content==='yy'){
            res.reply({
                title: "",
                description: "",
                musicUrl: "",
                hqMusicUrl: "",
                thumbMediaId: ""
            })
        }
        //图文
        else if(message.Content==='tw') {
            res.reply([
                {
                    title:'',
                    description:'',
                    picurl:'',
                    url:''
                }
            ]);
        }
        //图文音乐
        else if(message.Content==='yy'){
            res.reply({
                    type:'music',
                    content:{
                        title:'',
                        description:'',
                        musicUrl: "",
                        hqMusicUrl: "",
                        thumbMediaId: ""
                    }
                });
        }
        //语音
        else if(message.Content==='YY'){
            res.reply({
                type:'voice',
                content:{
                    mediaId:''
                }
            });
        }
        //视频
        else if(message.Content==='sp'){
            res.reply({
                type:'video',
                content:{
                    title:'',
                    description:'',
                    mediaId:''
                }
            });
        }
        else {
            res.reply(
                '回复tp查看图片\n' +
                '回复YY接收语音\n' +
                '回复tw查看图文\n' +
                '回复yy收听歌曲（未完善）\n' +
                '回复sp查看视频（未完善）\n');
        }
}).image(function (message, req, res, next) {
    // 图片类型
    res.reply({
        type:"image",
        content:{
            mediaId:''
        }
    });
}).voice(function (message, req, res, next) {
    // 语音类型
    res.reply({
            type: "voice",
            content: {
                mediaId: ''
            }
        });
}).video(function (message, req, res, next) {
    // 视频类型
    res.reply(
        {
            type: "video",
            content: {
                title: '',
                description: '',
                mediaId: ''
            }
        }
    );
}).location(function (message, req, res, next) {
    // TODO
}).link(function (message, req, res, next) {
    // TODO
}).event(function (message, req, res, next) {
    // TODO
}).device_text(function (message, req, res, next) {
    // TODO
}).device_event(function (message, req, res, next) {
    // TODO
}).middlewarify());

module.exports = router;
