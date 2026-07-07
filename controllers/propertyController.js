const Property =require('../models/Property')
exports.addProperty =async(req,res)=>{
    try{
        console.log("Facilities before parse",req.body.facilities)
         if (req.body.facilities) {
            req.body.facilities = JSON.parse(req.body.facilities);
        }
        console.log("Facilities after parse",req.body.facilities)
const{
    name,
    address,
    price,
    facilities,
    photos,
    addedBy,
    addedById,
} =req.body
const property =new Property({
     name,
    address,
    price,
    facilities,
       photos: req.file
        ? req.file.filename
        : '',
    addedBy,
    addedById,
    verifyStatus:"pending"
})
await property.save()
res.status(201).json({
    status:201,
    message:"Property Added Successfully",
    data:property
})
    }catch(err){
        res.status(500).json({
            status:500,
            message:err.message
        })
    }

}
exports.getAllProperties=async(req,res)=>{
try{
const properties =await Property.find();
res.status(200).json({
status:200,
message:"properties fetched successfully",
data:properties,
})
}
catch(err){
    res.status(500).json({
        status:500,
        message:err.message
    })
}
}
//if id-admin@gmail.com -call this API
exports.getAllPropertiesAdmin =async(req,res)=>{
    const properties= await Property.find();
  res.status(200).json({
    status:200,
    data:properties
  })
}
//buyer get only approved
exports.getApprovedProperties =async(req,res)=>{
    const properties=await Property.find({verifyStatus:"Approved"})
    res.status(200).json({
        status:200,
        data:properties
    })
}
exports.adminwillapproveProperty=async(req,res)=>{
    try{
        const {id}=req.params;
        const property=await Property.findByIdAndUpdate(
            id,
            {verifyStatus:"Approved"},
            {new:true}
        )
        if(!property){
            return res.status(404).json({
                status:404,
                message:"Property not found"
           
            })
        }
        res.status(200).json({
            status:200,
            message:"Property Approved successfully"
        })
    }
    catch(err){
        res.status(500).json({
            status:500,
            message:err.message
        })
    }
}
exports.getPropertyById=async(req,res)=>{
    try{
        const {id} =req.params;
        const property= await Property.findById(id)
         if (!property){
        return res.status(404).json({
            status:404,
            message:"Property not found"
        })
    }
    res.status(200).json({
        status:200,
        message:"Property fetched successfully",
        data:property
    })
    } catch(err){
        res.status(500).json({
            status:500,
            message:err.message
        })
    }
   

}
exports.sellerUpdatePropertyById=async(req,res)=>{
    try{
         if (req.body.facilities) {
            req.body.facilities = JSON.parse(req.body.facilities);
        }
const {id} =req.params;
const updatedProperty= await Property.findByIdAndUpdate(id,req.body,
    {new:true,runValidators:true}
)
if(!updatedProperty){
    return res.status(404).json({
        status:404,
        message:"Property Not Found"
    })
}
res.status(200).json({
    status:200,
    message:"Property Updated Successfully",
    data:updatedProperty
})
    }
    catch(err){
        res.status(500).json({
            status:500,
            message:err.message
        })
    }
}
exports.deletePropertyById=async(req,res)=>{
    try{
const {id}=req.params;
const deletedProperty= await Property.findByIdAndDelete(id)
if(!deletedProperty){
    return res.status(404).json({
       status:404,
       message:"Property not found" 
    })
}
res.status(200).json({
    status:200,
    message:"Property deleted Successfully",
})
    }
    catch(err){
        res.status(500).json({
            status:500,
            message:err.message
        })
    }
}
exports.buyStatus=async(req,res)=>{
    try{
const {id}=req.params
const {name,email,mobile,paymentMethod,transactionId,buyerId}=req.body
const property=await Property.findByIdAndUpdate(
    id,
    {propertyBoughtStatus:"bought",
        propertyBoughtBy:name,
        buyerId: buyerId,
        propertyBoughtOn:new Date(),
        buyerDetails:{
            email,mobile,paymentMethod,transactionId
        }

    },
    {new:true}
)
if(!property){
    return res.status(404).json({
        status:404,
        message:"Property Not Found"
    })
}
res.status(200).json({
      status: 200,
      message: "Property purchased successfully",
      data: property
})
    }
    catch (err){
res.status(500).json({
      status: 500,
      message: err.message
    });
    }
}
exports.getMyBoughtProperty=async(req,res)=>{
    console.log("priyanka")
    try{
               const { buyerId } = req.params;
                console.log("buyerId from URL:", buyerId);
                 const properties = await Property.find({
            buyerId: buyerId,
            propertyBoughtStatus: "bought"
        });
         console.log("Matched Properties:", properties);
           res.status(200).json({
            status: 200,
            data: properties
        });
    }
 catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        });
    }
}