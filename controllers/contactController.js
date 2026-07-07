const Contact= require('../models/Contact')
exports.sendMessage=async (req,res)=>{
    try{
const {name,email,message,sendBy,role}=req.body

const newMessage= new Contact({
    name,email,message,sendBy,role
})
await newMessage.save()
res.status(200).json({
      status: 200,
      message: 'Message sent successfully',
      data: newMessage
})
    } catch(err){
        res.status(500).json({
      status: 500,
      message: error.message
    });
    }
}
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 200,
      data: messages
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message
    });
  }
};