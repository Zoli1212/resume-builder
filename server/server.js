const express = require('express')
const colors = require('colors');
require('dotenv').config()

const app = express()
const connectDB = require('./config/mongodbConnection');

const PORT = process.env.NODE_LOCAL_PORT

connectDB()


app.listen(PORT, () => console.log(`server is listening on port ${PORT} `))
