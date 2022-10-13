const express = require('express')
const User = require('../models/userModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()
const sendEmail = require('../utils/sendEmail')
const Token = require('../models/tokenModel')


router.post('/register', async (req, res) => {

    const { email, password } = req.body
    
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
        await sendEmail(result, 'verify-email')
        res.status(200).send({success: true, message: 'user successfully registered'})

    }

    catch(error){
        res.status(400).json({success: false, message: error })
    }

})
router.post('/login', async (req, res) => {

    
    const SECRET_KEY = process.env.JWT_SECRET_KEY
    
    const { email, password } = req.body
    

    try{

        const user = await User.findOne({ email })

        console.log(user)
        if(user){


            const passwordsMatched = await bcrypt.compare(password, user.password)

            
            
            
            if(passwordsMatched){
                
                
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
                
                res.status(400).json({ success: false, message: 'Incorrect password ', data: user})

            }

        }else{

            res.status(400).json({success: false, message: 'user logging failed', data: null})
        }


    }

    catch(error){
        res.status(400).json({success: false, message: error })
    }

});


router.post('verify-email', async(req, res) => {

    try{

        if(tokenData){
            
            const tokenData = Token.findOne({ token: req.body.token })
            await User.findOneAndUpdate({ _id: tokenData, emailVerified: true})
            res.send({ success: true, message: 'Email verified successfully'})
        }else{
            res.send({ success: false, message: 'Invalid token '})
        }


    }catch(error){

        res.status(500).send(error)

    }
})

module.exports = router