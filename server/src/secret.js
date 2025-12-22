// secret.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// -------------------------
// 1. Environment Config
// -------------------------
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000/';

const DEFAULT_PAGE_SIZE = process.env.DEFAULT_PAGE_SIZE || 10;

const APP_NAME = process.env.APP_NAME || 'Try-MERN';

// --- Access and Construct the URI ---
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER_NAME = process.env.DB_CLUSTER_NAME;
const DB_NAME = process.env.DB_NAME
const DEFALUT_IMG_PATH = process.env.DEFALUT_IMG_PATH || './src/img/user.png';

const JWT_SECRET = process.env.JWT_SECRET;
const expiresIn = process.env.expiresIn || '15m';
const SMTP_APP_USER = process.env.SMTP_APP_USER || 'diptunazmulalam@gmail.com';
const SMTP_APP_PASSWORD = process.env.SMTP_APP_PASSWORD;







if (!JWT_SECRET) {
    throw new Error("FATAL ERROR: JWT_SECRET is not defined.");
}

// Construct the full URI string
const ATLAS_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER_NAME}/${DB_NAME}` || 'mongodb://localhost:27017';


module.exports = {
    PORT, NODE_ENV, BASE_URL, APP_NAME, CLIENT_URL,
    ATLAS_URI, DEFALUT_IMG_PATH,
    DEFAULT_PAGE_SIZE, JWT_SECRET, expiresIn,
    SMTP_APP_USER, SMTP_APP_PASSWORD
}