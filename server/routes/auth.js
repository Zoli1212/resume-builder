const express = require('express')
const User = require('../models/userModel')

const router = express.Router()

router.post('/register', async (req, res) => {

    try{

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

        const user = await User.findOne({ email, password})
        if(user){

            res.status(200).json({ success: true, message: 'User logged in successfully ', data: user})
        }

        res.status(400).json({success: false, message: 'user logging failed', data: null})

    }

    catch(error){
        res.status(400).json({ error })
    }

})

module.exports = router