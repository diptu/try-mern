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

// -------------------------
// 2. App Initialization
// -------------------------
const app = express();

// -------------------------
// 3. Environment Config
// -------------------------
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// -------------------------
// 4. Middlewares
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

// Example Auth Middleware
const isLoggedIn = (req, res, next) => {
    const isUserAuthenticated = true; // Replace with real logic
    if (!isUserAuthenticated) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

// -------------------------
// 5. Routes
// -------------------------
app.get('/health', isLoggedIn, (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is healthy!',
        timestamp: new Date().toISOString(),
    });
});

// -------------------------
// 6. 404 Handler
// -------------------------
app.use((req, res, next) => {
    next(createError(404, 'Resource not found'));
});

// -------------------------
// 7. Global Error Handler
// -------------------------
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

// -------------------------
// 8. Export
// -------------------------
module.exports = { app, PORT, NODE_ENV };
