const express =require('express')
const mongoose =require('mongoose')
const cors = require('cors')
require("dotenv").config()
const authRoutes=require('./routes/authRoutes')
const propertyRoutes=require('./routes/propertyRoutes')
const contactRoutes=require('./routes/contactRoutes')
const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("mongo connected", mongoose.connection.name))
.catch(err=>console.log(err))
app.use("/api/auth",authRoutes)
app.use("/api/property",propertyRoutes)
app.use("/api/contact",contactRoutes)
app.use('/uploads', express.static('uploads'));
app.get("/api/check", (req, res) => {
  res.json({ message: "API working" });
});
// call back function
const PORT = process.env.PORT || 3000;  
app.listen(PORT,()=>{
console.log("Server running in port 3000")
})



