// app.js

// -------------------------
// 1. Dependencies
// -------------------------
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const createError = require('http-errors');

const app = express();

// -------------------------
// 2. Environment Config
// -------------------------
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Logging format based on environment
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// -------------------------
// 3. Middleware
// -------------------------
app.use(helmet());        // Security headers
app.use(compression());   // Gzip compression

app.use(express.json()); // JSON body parsing
app.use(express.urlencoded({ extended: true })); // Form data parsing

// Example auth middleware
const isLoggedIn = (req, res, next) => {
    const isUserAuthenticated = true; // Replace with real logic
    if (!isUserAuthenticated) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

// -------------------------
// 4. Routes
// -------------------------
app.get('/health', isLoggedIn, (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is healthy!',
        timestamp: new Date().toISOString(),
    });
});

// -------------------------
// 5. 404 Handler
// -------------------------
app.use((req, res, next) => {
    next(createError(404, 'Resource not found'));
});

// -------------------------
// 6. Error Handler
// -------------------------
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

// Export for use in index.js or tests
module.exports = { app, PORT, NODE_ENV };
