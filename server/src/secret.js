// secret.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// -------------------------
// 1. Environment Config
// -------------------------
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const BASE_URL = process.env.BASE_URL || 'localhost';
const DEFAULT_PAGE_SIZE = process.env.DEFAULT_PAGE_SIZE || 10;


// --- Access and Construct the URI ---
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER_NAME = process.env.DB_CLUSTER_NAME;
const DB_NAME = process.env.DB_NAME
const DEFALUT_IMG_PATH = process.env.DEFALUT_IMG_PATH || './src/img/user.png';


// Construct the full URI string
const ATLAS_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER_NAME}/${DB_NAME}` || 'mongodb://localhost:27017';

console.log('Using connection string:', ATLAS_URI);

module.exports = { PORT, NODE_ENV, BASE_URL, ATLAS_URI, DEFALUT_IMG_PATH, DEFAULT_PAGE_SIZE }