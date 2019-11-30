/*用户openid*/
const userList={
    user_list:[
        {
            openid:'oAHGs5uSsLOD9_TjHNoC7RMrjUjs',
            lang: "zh_CN"
        },{
            openid:'oAHGs5tqO9Bmi6Bh_KDMECTghRmI',
            lang:"zh_CN"
        },
    ]
}
/*模板消息数据*/
const tempData ={
    touser:'oAHGs5uSsLOD9_TjHNoC7RMrjUjs',
    template_id:'L-gunhEVKThFODzIh1OTafkTP9y4aucQw1i21_qQaeM',
    url:'http://www.baidu.com',
    data:{
        first:{
            value:'测试通知',
            color:'#774d16'
        },
        word_1:{
            value:'老实人',
            color:'#770c0e'
        },
        word_2:{
            value:'孤立他',
            color:'#771759'
        },
        word_3:{
            value:'上厕所不带他',
            color:'#770c6a'
        },remark:{
            value:'测试模板消息',
            color:'#452a77'
        }
    }
}
/*图文素材*/
const scData ={
/*    articles: [{
        title: TITLE,
        thumb_media_id: THUMB_MEDIA_ID,
        author: AUTHOR,
        digest: DIGEST,
        show_cover_pic: SHOW_COVER_PIC(0 / 1),
        content: CONTENT,
        content_source_url: CONTENT_SOURCE_URL,
        need_open_comment:1,
        only_fans_can_comment:1
    },//若新增的是多图文素材，则此处应还有几段articles结构
    ]*/
}
exports.tempData = tempData;
exports.userList = userList;
exports.scData = scData;
