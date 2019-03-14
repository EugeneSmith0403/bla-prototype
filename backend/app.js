const express = require('express');
const bodyParser = require('body-parser')
const multer = require('multer')
const db = require('./db')
const mongoose = require('mongoose')
const port = process.env.port
const app = express()
const limiter = require('express-limiter')(app, mongoose)
const userRoutes = require('./api/routes/user')
const tripRoutes = require('./api/routes/trip')
const bookingRoutes = require('./api/routes/booking')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

limiter({
  total: 150,
  expire: 1000 * 60 * 60
})

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*')
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
});

app.use((req, res, next)=> {
  next()
})

app.use('/user', userRoutes)
app.use('/trip', tripRoutes)

app.use('/booking', bookingRoutes)



app.listen(port,() => {
  console.log('server starting on portt 3000')
})
