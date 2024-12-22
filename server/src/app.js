const productRoute = require('./routers/product_routers')
const seedRouter = require('./routers/seed_routers')

const express = require('express');
const morgan = require('morgan')
const createError = require('http-errors')
const rateLimit = require('express-rate-limit')
const app = express();
const { xss } = require('express-xss-sanitizer');

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes).
	    message: 'Too many requests',
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)
app.use(xss());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed',seedRouter);
app.use('/api/products',productRoute);

app.get('/api/user', (req, res, next)=>{
  res.status(200).send({message: 'User Profile!'});
});
app.get('/', (req, res)=>{
    res.status(200).send({message: 'welcome Home!'});
 
});

// client error handling
app.use(( req, res, next) => { 
    // http-errors   
    next(createError(404, 'Route Not Found')); // check error
  })

  // server error handling => all errors will be logged here
  app.use((err, req, res, next) => {
     return res.status(err.status || 500).json({
        success : false,
        message : err.message
        })
  })

module.exports = app