// secret.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// -------------------------
// 1. Environment Config
// -------------------------
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const BASE_URL = process.env.BASE_URL || 'localhost';

module.exports = { PORT, NODE_ENV, BASE_URL }