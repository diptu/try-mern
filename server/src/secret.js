require('dotenv').config();

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const DB_NAME = process.env.DB_NAME || 'gadgetsHaven';
const DEFAULT_PRODUCT_IMAGE = process.env.DEFAULT_PRODUCT_IMAGE || 'server/public/images/products/product-default.png';
const DEFAULT_USER_IMAGE = process.env.DEFAULT_USER_IMAGE || 'server/public/images/users/user-default.png';


const JWT_ACTIVATION_KEY = process.env.JWT_ACTIVATION_KEY;
const EXPIRES_IN = process.env.EXPIRES_IN;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CLIENT_URL = process.env.CLIENT_URL;

const MONGO_DB_URL = process.env.MONGO_DB_URL || `mongodb://localhost:27017/${DB_NAME}`;



module.exports = {
    SERVER_PORT,
    MONGO_DB_URL,
    DEFAULT_PRODUCT_IMAGE,
    DEFAULT_USER_IMAGE,
    JWT_ACTIVATION_KEY,
    EXPIRES_IN,
    SMTP_USER,
    SMTP_PASS,
    CLIENT_URL,
}