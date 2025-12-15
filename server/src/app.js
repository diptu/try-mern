// app.js

// -------------------------
// 1. Dependencies
// -------------------------
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const createError = require('http-errors');
const { xss } = require('express-xss-sanitizer');
const rateLimit = require('express-rate-limit');
const { NODE_ENV } = require('./secret.js')

const userRouter = require('./routes/UserRouter.js');
const SeedRouter = require('./routes/SeedRouter.js');
const { errorResponse } = require('./controllers/ResponseController.js')
// -------------------------
// 1. App Initialization
// -------------------------
const app = express();



// -------------------------
// 2. Middlewares
// -------------------------

// Security & Performance
app.use(helmet());
app.use(compression());

// Logging
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// XSS Sanitization
app.use(xss());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10,                  // limit each IP to 10 requests per window
    message: "Too many requests. Please try again later."
});
app.use(limiter);
app.use('/api/users', userRouter);
app.use('/api/seed', SeedRouter);


// -------------------------
// 3. Routes
// -------------------------
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is healthy!',
        timestamp: new Date().toISOString(),
    });
});

// -------------------------
// 4. 404 Handler
// -------------------------
app.use((req, res, next) => {
    next(createError(404, 'Resource not found'));
});

// -------------------------
// 5. Global Error Handler
// -------------------------
app.use((err, req, res, next) => {
    return errorResponse(res, {
        status: err.statu,
        message: err.message
    })
});

// -------------------------
// 8. Export
// -------------------------
module.exports = app
