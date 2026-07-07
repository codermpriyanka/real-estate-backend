const mongoose = require ('mongoose')
const contactSchema= new mongoose.Schema({
    name:{
type:String,
required:true
    },
    email:{
type:String,
required:true
    },
    message:{
type:String,
required:true
    },
    sendBy:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["seller","buyer","admin"],
        required:true
    },
    sentTo:{
type:String,
default:"admin@gmail.com"
    },
    createdAt:{
 type: Date,
    default: Date.now
    }
})

module.exports = mongoose.model('Contact',contactSchema)