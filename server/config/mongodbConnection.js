const db = require("./db.config.js");
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    console.log(db.url)
    const conn = await mongoose.connect(db.url)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
console.log(db.url);