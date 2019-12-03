const mongo = require('../config/mongodb');
const express = require('express');
const router = express.Router();


router.get('/demo',(req,res,next)=>{
    console.log`********{mongo/demo}********`;
    console.log(mongo);
    mongo.collection('site').find({"title" : "MongoDB 教程"},function (err,data) {
        console.log(data);
    })
})



module.exports = router;