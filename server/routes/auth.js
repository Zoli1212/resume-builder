const express = require('express')
const User = require('../models/userModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()
const sendEmail = require('../utils/sendEmail')
const Token = require('../models/tokenModel')


router.post('/register', async (req, res) => {

    const { email, password, name } = req.body

    if(!email || !password){

        res.status(500).json({ success: false, message: 'Password and Email required'})

    }
    
    try{

        
        const existingUser = await User.findOne({ email })

        if(existingUser){

            return res.status(200).json({ success: false, message: 'User Already exists'})
            
        }
        
        
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt)
        req.body.password = encryptedPassword

        const newUser = new User(req.body)

        const result = await newUser.save()
        await sendEmail(result, 'verifyemail')
        res.status(200).send({success: true, message: 'Registration successfull, please verify email'})

    }

    catch(error){
        res.status(400).json({success: false, message: error })
    }

})
router.post('/login', async (req, res) => {

    
    const SECRET_KEY = process.env.JWT_SECRET_KEY
    
    const { email, password } = req.body

   

    if(!email || !password){

        res.status(500).json({ success: false, message: 'Password and Email Required ', data: null})

    }
    

    try{

        const user = await User.findOne({ email })

        if(user){


            const passwordsMatched = await bcrypt.compare(password, user.password)
            
            if(passwordsMatched){

                if(user.isVerified){
                    const dataToBeSentToFrontend = {
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                      };
                      const token = jwt.sign(dataToBeSentToFrontend, process.env.JWT_SECRET, {
                        expiresIn: 60 * 60,
                      });
                      res.status(200).send({
                        success: true,
                        message: "User Login Successfull",
                        data: token,
                      });
                }else{
                    res
                    .status(200)
                    .send({ success: false, message: "Email not verified" });
                }
                
                
             
            }else{
                
                res.status(400).json({ success: false, message: 'Incorrect password ', data: user})

            }

        }else{

            res.status(400).json({success: false, message: 'user does not exist', data: null})
        }


    }

    catch(error){
        res.status(400).json({success: false, message: error })
    }

});


router.post('/verifyemail', async(req, res) => {

    try{

        const tokenData = await Token.findOne({ token: req.body.token })
       
        if(tokenData){
            
            await User.findOneAndUpdate({ _id: tokenData.userid, isVerified: true})
            await Token.findOneAndDelete({ token: req.body.token})
            res.send({ success: true, message: 'Email verified successfully'})
        }else{
            res.send({ success: false, message: 'Invalid token '})
        }


    }catch(error){

        res.status(500).send(error)

    }
})


router.post('/send-reset-password-link', async(req, res) => {

    const { email } = req.body


    try{

        const result = await User.findOne({ email })
       

        await sendEmail(result, 'resetpassword');

        res.send({ success: true, message: 'Password reset link set to your email successfully'})


    }catch(error){

        res.status(500).send(error)

    }
});

router.post("/resetpassword", async (req, res) => {

    const token = req.body.token

    if(!token){

        res.send({ success: false, message: "Invalid token" });

    }
    try {
     
      const tokenData = await Token.findOne({ token: req.body.token });
      if (tokenData) {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.findOneAndUpdate({ _id: tokenData.userid, password: hashedPassword });
        await Token.findOneAndDelete({ token: req.body.token });
        res.send({ success: true, message: "Password reset successfull" });
      } else {
        res.send({ success: false, message: "Invalid token" });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router