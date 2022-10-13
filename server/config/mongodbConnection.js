const db = require("./db.config.js");
const mongoose = require('mongoose')


const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {
  try {

    const conn = await mongoose.connect(MONGO_URI)
    //const conn = await mongoose.connect(db.url)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
