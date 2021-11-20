const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const blogRoutes = require('./routes/blog')


// creating app
const app = express()

// database setup
mongoose.connect('mongodb://localhost:27017/blog').then(() => console.log("DB Connected"));

// mongoose
// .connect("mongodb://localhost:27017/blog", {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
// .then(() => console.log('DB Connected'));
 
// using middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// routes middleware
app.use('/api', blogRoutes)

// handling cors
if (process.env.NODE_ENV == 'development') {
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}


// routes
app.get("/api", (req, res) => {
    res.json({time: Date().toString()})
})

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})