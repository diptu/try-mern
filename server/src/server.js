// server.js

// 1. Dependencies and Environment Configuration
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet'); // Security middleware
const compression = require('compression'); // Performance middleware

// Configuration using environment variables
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

// 2. Advanced Logging & Configuration
const loggerFormat = NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(loggerFormat));

// 3. Essential Production Middleware (Security & Performance)
// Helmet sets various HTTP headers to secure the app
app.use(helmet());
// Compression attempts to compress response bodies for all requests
app.use(compression());

// 4. Router/Endpoint Definition
app.get('/health', (req, res) => {
    // Return a standard health check response
    res.status(200).json({
        status: 'OK',
        message: 'Server is healthy!',
        timestamp: new Date().toISOString()
    });
});

// 5. Catch-all for 404 Errors (Middleware)
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error); // Pass the error to the next error handler middleware
});

// 6. Centralized Error Handling (The final piece of middleware)
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    // Log the error for operational monitoring (critical for prod)
    if (status >= 500) {
        console.error(`[SERVER ERROR] Status: ${status}, Message: ${message}, Stack: ${err.stack}`);
    } else {
        console.warn(`[CLIENT ERROR] Status: ${status}, Message: ${message}`);
    }

    res.status(status).json({
        status: 'Error',
        message: message,
        // Only expose stack trace in non-production environments
        stack: NODE_ENV === 'development' ? err.stack : undefined
    });
});

// 7. Server Initialization
app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});