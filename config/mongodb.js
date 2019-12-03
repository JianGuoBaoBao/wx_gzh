const mongoose  = require('mongodb')
const url = 'mongodb://localhost:27017/runoob'
mongoose.connect(url)

const db = mongoose.connection
db.on('error',console.error.bind(console,'connection error:'))
db.once('open',function () {
    console.log("Successful connection to"+ url);
})
module.exports = db
