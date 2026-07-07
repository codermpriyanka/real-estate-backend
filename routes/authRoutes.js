const express= require('express')
const router =express.Router( )
const authController = require('../controllers/authController')
router.post("/signup",authController.signup)
router.post("/login",authController.login)

router.get('/test', (req, res) => {
  res.json({ message: 'Auth route working' });
});
module.exports =router