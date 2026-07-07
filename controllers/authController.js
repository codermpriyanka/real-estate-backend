const User =require('../models/User')
const jwt = require("jsonwebtoken");
const bcrypt =require("bcryptjs")
//signup API
exports.signup =async(req,res)=>{
    try{
        const {role,firstName,lastName,email,password}=req.body;
        const userExist= await User.findOne({email})
        if(userExist){
            return res.status(400).json({
                status:400,
                message:"User Already Exists"
            })
        }
             const hashedPassword = await bcrypt.hash(password, 10);    

             const newUser =new User({
                role,
                firstName,
                lastName,
                email,
                password:hashedPassword
             })
             await newUser.save()
             res.status(200).json({
                status:200,
                message:"User Registered Successfully"
             })
    } 
    catch(err){
        res.status(500).json({
            status:500,
            message:"Internal Server Error"
        })
    }
}
//login API
exports.login=async(req,res)=>{
     console.log("========== LOGIN API HIT ==========");
    console.log("Request Body:", req.body);
    try{
 const{email,password}=req.body
 const user= await User.findOne({email})
 if(!user){
    return res.status(404).json({
        status:404,
        message:"User not found"
    })
 }

 const isMatch =await bcrypt.compare(
    password,
    user.password
 )
 if(!isMatch){
    return res.status(401).json({
        status:401,
        message:"Invalid Password"
    })
 }
//generate jwt token
 const token= jwt.sign(
    {
        userId:user._id,
        email:user.email,
        role:user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"1d"
    }
 )

 res.status(200).json({
    status:200,
    message:"Login Successful",
    token:token,
    user:{
        id:user._id,
        role:user.role,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email
    }

 })
    }
    catch(err){
        console.log(err ,"error login api")
        res.status(500).json({
            status:500,
            message:"Internal Server Error"
        })
    }
}