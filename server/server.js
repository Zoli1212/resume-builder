const express = require('express')

const app = express()
const dotenv = require('dotenv').config()

const PORT = process.env.NODE_LOCAL_PORT || 6910


app.listen(PORT, () => console.log(`server is listening on port ${PORT} `))
