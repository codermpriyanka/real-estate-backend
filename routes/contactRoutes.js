const express = require('express')
const router =express.Router();
const contctController =require('../controllers/contactController');
const { route } = require('./authRoutes');
router.post("/send-message",contctController.sendMessage)
router.get("/get-message",contctController.getAllMessages)
module.exports=router