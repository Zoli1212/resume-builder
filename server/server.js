const express = require('express')
const colors = require('colors');
const path = require('path')

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
require('dotenv').config()

const app = express()
const connectDB = require('./config/mongodbConnection');

const PORT = process.env.NODE_LOCAL_PORT

connectDB()

app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static())

}


app.listen(PORT, () => console.log(`server is listening on port ${PORT} `))
