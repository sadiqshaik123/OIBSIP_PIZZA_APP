const mongoose = require("mongoose");
var mongoURL = 'your_mongodb_link'
mongoose.set('strictQuery', false);
mongoose.connect(mongoURL,{useUnifiedTopology:true, useNewUrlParser:true})

var db=mongoose.connection

db.on('connected',()=>{
    console.log("Mongo DB connection successful");
})

db.on('error',()=>{
    console.log('Mongo DB Connetion failed');
})

module.exports =mongoose
