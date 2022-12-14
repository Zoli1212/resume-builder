const express = require('express')
const colors = require('colors');
const path = require('path')

const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
require('dotenv').config()

const app = express()
const connectDB = require('./config/mongodbConnection');

const PORT = process.env.PORT || 5000



connectDB()

app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'client', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }


app.listen(PORT, () => console.log(`APP is running on port ${PORT}`));
