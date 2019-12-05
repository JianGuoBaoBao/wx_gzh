const request = require('request');
const schedule = require('node-schedule');
const pool = require('./mySqlpool');

const appID ='wx2c0e476b95a9b654';
const appsecret='d34520690a55b94dca302f955fca1f87';
//获取accesstoken的路径
const uri='https://api.weixin.qq.com/cgi-bin/token?' +
    'grant_type=client_credential&appid=APPID&secret=APPSECRET';
const atUri = uri.replace('APPID',appID).replace('APPSECRET',appsecret);


/*获取accesstoken*/
async function getTokenAsync(){
    const{err,res,accessToken} =await new Promise(resolve =>{
        request.get(atUri, (err, res, body)=>{
        const data = JSON.parse(body);
        const accessToken = data.access_token;
        resolve({err,res,accessToken});
     })});
    await console.log('从微信获取的accessToken为：'+accessToken);
    await pool.query('update access_token set access_token =?',[accessToken],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows!=1){
            console.log('**********更新accessToken失败***********');
            return;
        }
        console.log('**********更新accessToken成功***********');
        console.log('当前数据库中的accessToken为：'+accessToken);
    });
}
getTokenAsync();
//在加载时运行一次
const scheduleCronstyle = ()=>{
    schedule.scheduleJob('0 */1 * * *',()=>{//1小时触发一次
        getTokenAsync();
    });
}
scheduleCronstyle();

