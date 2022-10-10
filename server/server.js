const express = require('express')

const app = express()
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 4000


app.listen(8000, () => console.log(`server is listening on port ${PORT} `))
