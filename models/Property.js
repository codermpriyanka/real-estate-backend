const { verify } = require('jsonwebtoken')
const mongoose = require('mongoose')
const propertySchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
     type:String,
     required:true
    },
    price:{
        type:Number,
        required:true
    },
    facilities:[{
        type:String
    }],
    photos:{
        type:String
    },
    addedBy:{
        type:String,
        ref:'User',
        required:true
    },
    addedById:{
   type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    addedOn:{
        type:Date,
        default:Date.now
    },
    verifyStatus:{
        type:String,
        enum:["pending","Approved"],
        default:"pending"
    },
    propertyBoughtStatus:{
        type:String,
        default:"not_bought"
    },
    
    propertyBoughtBy:String,
    buyerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
    propertyBoughtOn:Date,
    buyerDetails:{
    email:String,
    mobile:String,
    paymentMethod:String,
    transactionId:String
}
})
 
module.exports = mongoose.model('Property',propertySchema)