const productRoute = require('./routers/product_routers')
const express = require('express');
const morgan = require('morgan')
const createError = require('http-errors')
const rateLimit = require('express-rate-limit')
const app = express();
// const xss = require("xss"); 

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 20, // Limit each IP to 100 requests per `window` (here, per 5 minutes).
	    message: 'Too many requests',
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)
// app.use(xss());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products',productRoute);

app.get('/', (req, res)=>{

    res.statusCode = 200;
    res.send('Welcome to home');
});



// client error handling
app.use(( req, res, next) => {    
    next(createError(404, 'Route Not Found')); // check error
  })




  // server error handling
  app.use((err, req, res, next) => {
    // console.error(err.stack)
     return res.status(err.status || 500).json({
        success : false,
        message : err.message
        })
  })

module.exports = app