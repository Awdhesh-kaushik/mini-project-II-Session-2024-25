const mongoose = require("mongoose");
require('dotenv').config()
MONG0_URI = process.env.MONG0_URI

function connectDB(){
    mongoose.set('strictQuery', true); 

    mongoose.connect('mongodb://localhost:27017/WanderWheels')
    
    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose