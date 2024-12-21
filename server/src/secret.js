require('dotenv').config();

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const DB_NAME = process.env.DB_NAME || 'gadgetsHaven';
const DEFAULT_PRODUCT_IMAGE = process.env.DEFAULT_PRODUCT_IMAGE || 'server/public/images/products/product-default.png';


const MONGO_DB_URL = process.env.MONGO_DB_URL || `mongodb://localhost:27017/${DB_NAME}`;



module.exports = {
    SERVER_PORT,
    MONGO_DB_URL,
    DEFAULT_PRODUCT_IMAGE,
}