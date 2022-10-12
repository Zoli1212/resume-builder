const express = require('express')
const User = require('../models/userModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

const SECRET_KEY = process.env.JWT_SECRET_KEY

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

        await newUser.save()
        res.status(200).send({success: true, message: 'user successfully registered'})

    }

    catch(error){
        res.status(400).json({success: false, message: error })
    }

})
router.post('/login', async (req, res) => {

    
    
    const { email, password } = req.body
   

    try{

        const user = await User.findOne({ email })
        if(user){


            const passwordsMatched = await bcrypt.compare(password, user.password)

        

            if(passwordsMatched){


                const dataToBeSendToFrontend = {
                    _id: user._id,
                    email: user.email,
                    name: user.name
                }

                const token = jwt.sign(dataToBeSendToFrontend, SECRET_KEY, { expires: 60 *60} )

                res.status(200).json({ success: true, message: 'User logged successfully ', data: user})
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

})

module.exports = router