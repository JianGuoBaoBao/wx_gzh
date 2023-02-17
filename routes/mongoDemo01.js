const {mongoose, User}   = require('../config/mongoPool');
const express = require('express');
const router = express.Router();

router.get('/demo01',(req,res,next)=> {
    let user = new User({
        uid:1,
        name:"Meepo",
        age:18,
    })
    user.save();
   res.json(user);
});

module.exports = router;